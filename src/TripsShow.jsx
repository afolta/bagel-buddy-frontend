import axios from "axios";

const handleCreateTrip = (event) => {
  event.preventDefault();
  let params = new FormData(event.target);
  console.log(params);

  params.append("restaurant_id", 1);
  params.append("place_id", localStorage.getItem("place_id"));

  axios
    .post("http://localhost:3000/trips", params, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    })
    .then((window.location.href = "/"));
};

const handleClick = (trip) => {
  console.log(trip);
  handleDestroyTrip(trip);
};

const handleDestroyTrip = (trip) => {
  console.log(trip);
  axios.delete("http://localhost:3000/trips/" + trip.id).then((window.location.href = "/"));
};

export function TripsShow(props) {
  return (
    <div>
      {props.trips.map((trip) => (
        <div key={trip.id} className="trips">
          <div className="restaurant-border">
            <p>Date: {trip.friendly_date}</p>
            <p>{trip.notes}</p>
            <button className="btn btn-danger mt-3" onClick={() => handleClick(trip)}>
              Delete Note
            </button>
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
