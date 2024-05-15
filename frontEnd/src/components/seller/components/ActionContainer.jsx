import { Routes, Route } from "react-router-dom";
import Profile from "../components/Profile";
import AddItem from "./AddItem";
import SellerOrders from "../SellerOrders";
export default function ActionContainer() {
  const baseUrl='sellerDashboard';
  return (
    <div className="action-Container">
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/addItem" element={<AddItem/>} />
        <Route path="/items" element={<SellerOrders/>}/>
      </Routes>
    </div>
  );
}
