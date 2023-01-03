import axios from "axios";
import { useState, useEffect } from "react";
import { UserShow } from "./UserShow";
import { RestaurantLookup } from "./RestaurantLookup";

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
      })
      .catch((error) => {
        //setErrors(error.response.data.errors ? error.response.data.errors : ["Must Login!"]);
      });
  };

  useEffect(handleUserShow, []);

  return (
    <div>
      <h1>Welcome to Bagel Buddy!</h1>
      <UserShow user={user} />
      <RestaurantLookup restaurants={restaurants} user={user} />
    </div>
  );
}
