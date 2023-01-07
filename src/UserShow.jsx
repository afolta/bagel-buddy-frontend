import { useEffect } from "react";

export function UserShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateLocation(props.user.id, params);
    event.target.reset();
  };

  return (
    <div id="users-show">
      <div key={props.user.id} className="users"></div>
      <h2 className="user-title">
        {props.user.name}'s Location{" "}
        <img src="/src/assets/map-location-dot-solid.svg" alt="" className="user-location" />
      </h2>
      <form onSubmit={handleSubmit}>
        <div id="user-border">
          <div>
            Address: <input defaultValue={props.user.address} name="address" className="form-control" type="text" />
          </div>
          <div>
            City: <input defaultValue={props.user.city} name="city" className="form-control" type="text" />
          </div>
          <div>
            State: <input defaultValue={props.user.state} name="state" className="form-control" type="text" />
          </div>
          <div>
            Zip: <input defaultValue={props.user.zip} name="zip" className="form-control" type="text" />
          </div>
          <br></br>
          <button class="btn btn-success" type="submit">
            Update Address
          </button>
        </div>
      </form>
    </div>
  );
}
