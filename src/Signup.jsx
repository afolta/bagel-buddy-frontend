import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input className="form-control" name="name" type="text" />
        </div>
        <div>
          Email: <input className="form-control" name="email" type="email" />
        </div>
        <div>
          Address: <input className="form-control" name="address" type="address" />
        </div>
        <div>
          City: <input className="form-control" name="city" type="text" />
        </div>
        <div>
          State: <input className="form-control" name="state" type="state" />
        </div>
        <div>
          Zip Code: <input className="form-control" name="zip" type="zipcode" />
        </div>
        <div>
          Password: <input className="form-control" name="password" type="password" />
        </div>
        <div>
          Password confirmation: <input className="form-control" name="password_confirmation" type="password" />
        </div>
        <button className="mt-3 btn btn-primary" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
