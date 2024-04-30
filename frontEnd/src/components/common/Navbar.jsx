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
        <a href="/CreateSellerAccount"><li>Become Seller</li></a>
        <a href="/"><li>New Account</li></a>
        <li>Login User</li>
      </ul>
    </div>
  );
}
