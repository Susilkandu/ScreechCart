import { Routes, Route } from "react-router-dom";
import Profile from "../components/Profile";
export default function ActionContainer() {
  const baseUrl='sellerDashboard';
  return (
    <div className="action-Container">
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
