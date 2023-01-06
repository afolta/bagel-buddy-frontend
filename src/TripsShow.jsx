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
    </div>
  );
}
