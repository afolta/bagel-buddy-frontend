import axios from "axios";
import { useState } from "react";

export function RestaurantLookup() {
  const [errors, setErrors] = useState([]);

  const handleResaurantLookup = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/restaurants-lookup", params)
      .then((response) => {
        console.log(response.data);
        //window.location.href = "/";
      })
      .catch((error) => {
        setErrors(error.response.data.errors ? error.response.data.errors : ["Must Login!"]);
      });
  };

  return (
    <div id="restaurant-lookup">
      <h1>New Lookup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleResaurantLookup}>
        <div>
          Latitude: <input name="latitude" className="form-control" type="text" />
        </div>
        <div>
          Longitude: <input name="longitude" className="form-control" type="text" />
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          New Lookup
        </button>
      </form>
    </div>
  );
}
