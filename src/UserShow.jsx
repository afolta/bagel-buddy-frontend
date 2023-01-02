export function UserShow(props) {
  return (
    <div id="users-show">
      <h2>Bagel Lover Info</h2>
      <div key={props.user.id} className="users">
        <p>Name: {props.user.name}</p>
        <p>Address: {props.user.address}</p>
      </div>
    </div>
  );
}
