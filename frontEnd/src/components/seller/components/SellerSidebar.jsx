import { Link, useMatches} from "react-router-dom";
export default function SellerSidebar() {
  const baseUrl = '/sellerDashboard';
    const match= useMatches();
  return (
    <div className="seller-sidebar">
      <div className="Profile">
        <Link to={`${baseUrl}/profile`}>
          <img
            src="https://th.bing.com/th/id/OIP.518KBNuR-t3O8zdFqIrR5gHaHa?pid=ImgDet&w=202&h=202&c=7"
            alt="Profile"
          />
        </Link>
      </div>
      <ul className="navigation">
      <li><Link to={`${baseUrl}/dashboard`}>Dashboard</Link></li>
      <li><Link to={`${baseUrl}/addItem`}>Add Item</Link></li>
      <li><Link to={`${baseUrl}/Items`}>Items</Link></li>
      <li><Link to={`${baseUrl}/showOrders`}>show Orders</Link></li>
      </ul>
    </div>
  );
}
