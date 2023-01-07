import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";
import { UserShow } from "./UserShow";
import { RestaurantLookup } from "./RestaurantLookup";
import { Signup } from "./Signup";
import { Login } from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurant-lookup" element={<RestaurantLookup />} />
          <Route path="/user" element={<UserShow />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
