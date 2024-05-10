import { Routes, Route } from "react-router-dom";
import Profile from "../components/Profile";
import AddItem from "./AddItem";
export default function ActionContainer() {
  const baseUrl='sellerDashboard';
  return (
    <div className="action-Container">
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/addItem" element={<AddItem/>} />
      </Routes>
    </div>
  );
}
