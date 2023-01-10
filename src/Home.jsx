import axios from "axios";
import { useState, useEffect } from "react";
import { UserShow } from "./UserShow";
import { RestaurantLookup } from "./RestaurantLookup";
import mapboxgl from "mapbox-gl";
import { Modal } from "./Modal";
import { ReviewsShow } from "./ReviewsShow";
import { TripsShow } from "./TripsShow";

export function Home() {
  const [user, setUser] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState({});
  const [currentReviews, setCurrentReviews] = useState({});
  const [currentTrips, setCurrentTrips] = useState({});
  const [isReviewShowModalVisible, setIsReviewShowModalVisible] = useState(false);
  const [isTripShowModalVisible, setIsTripShowModalVisible] = useState(false);

  const handleUserShow = () => {
    const userId = localStorage.getItem("user_id");

    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);

        handleRestaurantLookup(response.data);
      })
      .catch((error) => {});
  };

  const handleUpdateLocation = (id, params) => {
    axios
      .patch("http://localhost:3000/users/" + id, params)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        window.location.reload(false);
      })
      .catch((error) => {});
  };

  const handleShowRestaurant = (restaurant) => {
    setCurrentRestaurant(restaurant);
    console.log(restaurant);

    axios
      .post("http://localhost:3000/reviews", {
        place_id: restaurant.place_id,
      })
      .then((response) => {
        console.log(response.data);
        setCurrentReviews(response.data);
        setIsReviewShowModalVisible(true);
      })
      .catch((error) => {});
  };

  const handleShowWebsite = (restaurant) => {
    setCurrentRestaurant(restaurant);

    axios
      .post("http://localhost:3000/reviews", {
        place_id: restaurant.place_id,
      })
      .then((response) => {
        setCurrentReviews(response.data);
        setCurrentReviews(response.data);
        console.log(response.data[0]);
        window.open(`${response.data[0].website}`, "_blank");
      })
      .catch((error) => {});
  };

  const handleRestaurantLookup = (bagelLover) => {
    console.log(bagelLover);
    axios
      .post("http://localhost:3000/restaurants-lookup", {
        latitude: bagelLover.latitude,
        longitude: bagelLover.longitude,
      })
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data);

        mapboxgl.accessToken =
          "pk.eyJ1IjoiZm9sdGFhcyIsImEiOiJjajBiNTRwZXEwMnVlMndvMjZnMWYyZzkxIn0.wMplMNqPeI1kNVVfR9RvVg";
        const map = new mapboxgl.Map({
          container: "map", // container ID
          style: "mapbox://styles/mapbox/streets-v11", // style URL
          center: [bagelLover.longitude, bagelLover.latitude], // starting position
          zoom: 13, // starting zoom
        });

        response.data.forEach((place) => {
          let restaurantPopup = new mapboxgl.Popup({ offset: 30 }).setHTML(
            `<h2>${place.name}</h3>
            <p>Address: ${place.address}</p>
            <p>Distance: ${place.distance}</p>`
          );

          let userPopup = new mapboxgl.Popup({ offset: 30 }).setHTML(
            `<h2>${bagelLover.name}</h3>
            <p>Address: ${bagelLover.address}</p>`
          );

          const el = document.createElement("div");
          el.className = "marker";

          let restaurantMarker = new mapboxgl.Marker(el)
            .setLngLat([place.longitude, place.latitude])
            .setPopup(restaurantPopup);
          restaurantMarker.addTo(map);

          const userElement = document.createElement("div");
          userElement.className = "user-marker";

          let userMarker = new mapboxgl.Marker(userElement)
            .setLngLat([bagelLover.longitude, bagelLover.latitude])
            .setPopup(userPopup);
          userMarker.addTo(map);
        });
      })
      .catch((error) => {});
  };

  useEffect(handleUserShow, []);

  const handleHideRestaurant = () => {
    setIsReviewShowModalVisible(false);
  };

  const handleShowTrips = (restaurant) => {
    setCurrentRestaurant(restaurant);
    console.log(restaurant);
    localStorage.setItem("place_id", restaurant.place_id);

    axios
      .get(`http://localhost:3000/trips/${restaurant.place_id}`)
      .then((response) => {
        console.log(response.data);
        setCurrentTrips(response.data);
        setIsTripShowModalVisible(true);
        setCurrentRestaurant(restaurant);
      })
      .catch((error) => {});
  };

  const handleHideTrip = () => {
    setIsTripShowModalVisible(false);
  };

  return (
    <div className="home-page">
      <h1 id="title">
        {" "}
        Welc
        <img src="/src/assets/bagel.png" alt="" className="logo" />
        me to Bagel Buddy!
      </h1>
      <div id="users-show">
        <UserShow user={user} onUpdateLocation={handleUpdateLocation} />
      </div>
      <div id="map"></div>
      <div id="restaurant-lookup">
        <RestaurantLookup
          restaurants={restaurants}
          user={user}
          onSelectRestaurant={handleShowRestaurant}
          onSelectWebsite={handleShowWebsite}
          onSelectTrip={handleShowTrips}
        />
      </div>
      <Modal show={isReviewShowModalVisible} onClose={handleHideRestaurant}>
        <ReviewsShow reviews={currentReviews} />
      </Modal>
      <Modal show={isTripShowModalVisible} onClose={handleHideTrip}>
        <TripsShow trips={currentTrips} restaurant={currentRestaurant} />
      </Modal>
    </div>
  );
}
