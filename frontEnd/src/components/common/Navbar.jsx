import { Link } from "react-router-dom";
export default function () {
  return (
    <div className="navbar">
      <div className="searchGroup">
        <input
          className="searchBar"
          type="text"
          placeholder="Find your Product"
        />
        <span className="material-symbols-outlined search-btn">search</span>
      </div>
      <ul className="navGroup">
        <li>Login User</li>
        <li>
          <Link to="/CreateSellerAccount">Become Seller</Link>
        </li>
        <li>
          <Link to="/loginSellerAccount">Login Seller</Link>
        </li>
        <li>Login User</li>
      </ul>
    </div>
  );
}
