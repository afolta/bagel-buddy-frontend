export function RestaurantLookup(props) {
  return (
    <div id="restaurant-lookup">
      <h1>Bagel Shops</h1>
      {props.restaurants.map((restaurant) => (
        <div key={restaurant.place_id} className="restaurant">
          <h2>{restaurant.name}</h2>
          <p>Address: {restaurant.address}</p>
          <p>Review: {restaurant.rating}</p>
          <button className="btn btn-secondary" onClick={() => props.onSelectRestaurant(restaurant)}>
            Reviews
          </button>
        </div>
      ))}
    </div>
  );
}
