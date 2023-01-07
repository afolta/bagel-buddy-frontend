import axios from "axios";
import { Home } from "./Home";

const handleCreateTrip = (event) => {
  event.preventDefault();
  const params = new FormData(event.target);
  console.log(params);
  const config = {
    user_id: localStorage.getItem("user_id"),
    restaurant_id: 1,
    place_id: localStorage.getItem("place_id"),
  };

  axios.post("http://localhost:3000/trips", params, config).then((window.location.href = "/"));
};

export function TripsShow(props) {
  return (
    <div>
      {props.trips.map((trip) => (
        <div key={trip.id} className="trips">
          <div className="restaurant-border">
            <p>Date: {trip.friendly_date}</p>
            <p>{trip.notes}</p>
          </div>
        </div>
      ))}
      <form onSubmit={handleCreateTrip}>
        <div>
          Add Notes: <input name="notes" className="form-control" type="text" />
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Create Note
        </button>
      </form>
    </div>
  );
}
