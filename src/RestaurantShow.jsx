export function RestaurantShow(props) {
  return (
    <div>
      <h2>{props.restaurant.name}</h2>
      <p>website: {props.restaurant.website}</p>
      <p>phone number: {props.restaurant.phone_number}</p>
      {/* {props.restaurants.map((restaurant) => (
        <div key={restaurant.place_id}>
          <h2>{restaurant.name}</h2>
          <p>Review: {restaurant.rating}</p>
        </div>
      ))} */}
    </div>
  );
}
