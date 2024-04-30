import { Routes, Route } from "react-router-dom";
import Profile from "../components/Profile";
export default function ActionContainer() {
  return (
    <div className="action-Container">
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
