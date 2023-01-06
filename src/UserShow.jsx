import { useEffect } from "react";

export function UserShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateLocation(props.user.id, params);
    event.target.reset();
    //window.location.reload(false);
  };

  return (
    <div id="users-show">
      <h2>Bagel Lover Info</h2>
      <div key={props.user.id} className="users">
        <p>{props.user.name}</p>
      </div>
      <h2>Edit Location</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-primary mt-3" type="submit">
          Update Address
        </button>
      </form>
    </div>
  );
}
