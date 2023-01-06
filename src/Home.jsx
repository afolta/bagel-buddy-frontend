import axios from "axios";
import { useState, useEffect } from "react";
import { UserShow } from "./UserShow";
import { RestaurantLookup } from "./RestaurantLookup";
import mapboxgl from "mapbox-gl";
import { Modal } from "./Modal";
import { ReviewsShow } from "./ReviewsShow";

export function Home() {
  const [user, setUser] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState({});
  const [currentReviews, setCurrentReviews] = useState({});
  const [isReviewShowModalVisible, setIsReviewShowModalVisible] = useState(false);

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
        console.log(currentReviews);
        setIsReviewShowModalVisible(true);
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
          zoom: 12, // starting zoom
        });

        response.data.forEach((place) => {
          let popup = new mapboxgl.Popup({ offset: 30 }).setHTML(
            `<h2>${place.name}</h3>
            <p>Address: ${place.address}</p>
            <p>Distance: ${place.distance}</p>`
          );

          const el = document.createElement("div");
          el.className = "marker";

          let marker = new mapboxgl.Marker(el).setLngLat([place.longitude, place.latitude]).setPopup(popup);

          marker.addTo(map);
        });
      })
      .catch((error) => {});
  };

  useEffect(handleUserShow, []);

  const handleHideRestaurant = () => {
    setIsReviewShowModalVisible(false);
  };

  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif",
  };

  return (
    <div>
      <img src="/src/assets/bagel.png" alt="" className="logo" />
      <h1 id="title"> Welcome to Bagel Buddy!</h1>
      <UserShow user={user} onUpdateLocation={handleUpdateLocation} />
      <div id="map"></div>
      <RestaurantLookup restaurants={restaurants} user={user} onSelectRestaurant={handleShowRestaurant} />
      <Modal show={isReviewShowModalVisible} onClose={handleHideRestaurant}>
        <ReviewsShow reviews={currentReviews} />
      </Modal>
    </div>
  );
}
