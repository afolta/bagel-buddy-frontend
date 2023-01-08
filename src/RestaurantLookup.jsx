export function RestaurantLookup(props) {
  return (
    <div id="restaurant-lookup">
      <h1 className="restaurants-title">
        Bagel Shops <img src="/src/assets/shop-solid.svg" alt="" />
      </h1>
      <div className="item-container">
        {props.restaurants.map((restaurant) => (
          <div className="card">
            <div key={restaurant.place_id}>
              <h2>{restaurant.name}</h2>
              <p>Address: {restaurant.address}</p>
              <p>Distance: {restaurant.distance} miles</p>
              <p>Review: {restaurant.rating}</p>
              <button id="reviews" className="btn btn-secondary" onClick={() => props.onSelectRestaurant(restaurant)}>
                <img src="/src/assets/message-draw.svg" alt="" />
                Reviews
              </button>
              <button id="website" class="btn btn-outline-dark" onClick={() => props.onSelectWebsite(restaurant)}>
                <img src="/src/assets/link-solid.svg" alt="" />
                Website
              </button>
              <button id="notes" class="btn btn-info" onClick={() => props.onSelectTrip(restaurant)}>
                <img className="notes-icon" src="/src/assets/note-sticky-regular.svg" alt="" />
                Notes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
