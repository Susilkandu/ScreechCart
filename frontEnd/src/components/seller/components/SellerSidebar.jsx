import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setProfileDetails } from "../../../reduxStore/seller/sellerSlice";
import { fetchProfile } from "../../../assets/api/seller/sellerProfileApi";
import { useEffect } from "react";

export default function SellerSidebar() {
  const baseUrl = "/sellerDashboard";
  const dispatch = useDispatch();

  const fetchProfileHandler = async () => {
    const response = await fetchProfile();
    if (response.ackbool == 1) {
      dispatch(setProfileDetails(response));
    }
  };

  return (
    <div className="seller-sidebar">
      <div className="profile" onClick={fetchProfileHandler}>
        <Link to={`${baseUrl}/profile`} className="profile">
          <img
            src="https://th.bing.com/th/id/OIP.518KBNuR-t3O8zdFqIrR5gHaHa?pid=ImgDet&w=202&h=202&c=7"
            alt="Profile"
            className="profile"
          />
        </Link>
      </div>
      <div className="navigation">
        <div>
          <Link to={`${baseUrl}/dashboard`} title="Dashboard">
            <span className="material-symbols-outlined">dashboard</span>
          </Link>
        </div>
        <div>
          <Link to={`${baseUrl}/addItem`} title="Add New Product">
            <span className="material-symbols-outlined">add_circle</span>
          </Link>
        </div>
        <div>
          <Link to={`${baseUrl}/Items`} title="Product list">
            <span className="material-symbols-outlined">inventory_2</span>
          </Link>
        </div>
        <div>
          <Link to={`${baseUrl}/showOrders`} title="Show Order">
            <span className="material-symbols-outlined">orders</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
