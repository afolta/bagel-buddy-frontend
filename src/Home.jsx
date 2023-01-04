import axios from "axios";
import { useState, useEffect } from "react";
import { LogoutLink } from "./Logout";
import { UserShow } from "./UserShow";
import { RestaurantLookup } from "./RestaurantLookup";
import mapboxgl from "mapbox-gl";

export function Home() {
  const [user, setUser] = useState({});
  const [restaurants, setRestaurants] = useState([]);

  const handleUserShow = () => {
    const userId = localStorage.getItem("user_id");

    axios.get(`http://localhost:3000/users/${userId}`).then((response) => {
      console.log(response.data);
      setUser(response.data);

      handleResaurantLookup(response.data);
    });
  };

  const handleResaurantLookup = (bagelLover) => {
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
          style: "mapbox://styles/mapbox/light-v10", // style URL
          center: [bagelLover.longitude, bagelLover.latitude], // starting position
          zoom: 12, // starting zoom
        });

        response.data.forEach((place) => {
          let popup = new mapboxgl.Popup({ offset: 30 }).setHTML(
            `<h2>${place.name}</h3>
            <p>Address: ${place.address}</p>`
          );
          let marker = new mapboxgl.Marker().setLngLat([place.longitude, place.latitude]).setPopup(popup).addTo(map);
        });
      })
      .catch((error) => {
        //setErrors(error.response.data.errors ? error.response.data.errors : ["Must Login!"]);
      });
  };

  useEffect(handleUserShow, []);

  return (
    <div>
      <LogoutLink />
      <h1>Welcome to Bagel Buddy!</h1>
      <UserShow user={user} />
      <div id="map"></div>
      <RestaurantLookup restaurants={restaurants} user={user} />
    </div>
  );
}
