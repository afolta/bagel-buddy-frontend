export function RestaurantLookup(props) {
  return (
    <div id="restaurant-lookup">
      <h1>All Restaurants</h1>
      {props.restaurants.map((restaurant) => (
        <div key={restaurant.place_id} className="restaurant">
          <h2>{restaurant.name}</h2>
          <p>Address: {restaurant.address}</p>
          <p>Review: {restaurant.rating}</p>
          {/* <button className="btn btn-primary" onClick={() => props.onSelectRecipe(recipe)}>
            More Info
          </button> */}
        </div>
      ))}
    </div>
  );
}
