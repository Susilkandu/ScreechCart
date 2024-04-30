import ActionContainer from "./components/ActionContainer";
import SellerSideBar from "./components/SellerSidebar";
export default function SellerDashboard() {
  return (
    <div className="sellerDashboard">
      <center><nav>Navigation Menu Like Profile</nav></center>
      <SellerSideBar/>
      <ActionContainer/>
    </div>
  );
}
