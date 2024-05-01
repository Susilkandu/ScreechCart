import ActionContainer from "./components/ActionContainer";
import SellerSideBar from "./components/SellerSidebar";
export default function SellerDashboard() {
  return (
    <div className="sellerDashboard">
      <SellerSideBar/>
      <ActionContainer/>
    </div>
  );
}
