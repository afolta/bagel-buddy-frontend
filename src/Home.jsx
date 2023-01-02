import axios from "axios";
import { useState, useEffect } from "react";
import { UserShow } from "./UserShow";
import { RestaurantLookup } from "./RestaurantLookup";

export function Home() {
  const [currentLatitude, setCurrentLatitude] = useState([]);
  const [currentLongitude, setCurrentLongitude] = useState([]);
  const [user, setUser] = useState([]);

  const handleUserShow = () => {
    axios.get("http://localhost:3000/users/2").then((response) => {
      console.log(response.data);
      setUser(response.data);
      setCurrentLatitude(response.data.latitude);
      setCurrentLongitude(response.data.longitude);
    });
  };

  useEffect(handleUserShow, []);

  return (
    <div>
      <h1>Welcome to Bagel Buddy!</h1>
      <UserShow user={user} currentLatitude={currentLatitude} currentLongitude={currentLongitude} />
      <RestaurantLookup currentLatitude={currentLatitude} currentLongitude={currentLongitude} />
    </div>
  );
}
