import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  return (
    <a className="nav-link" href="#" onClick={handleClick}>
      Logout <img className="logout-link" src="/src/assets/arrow-right-from-bracket-solid.svg" alt="" />
    </a>
  );
}
