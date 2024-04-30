import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import DashboardContainer from '../common/DashboardContainer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
export default function Home() {
  return (
    <div className="homePage">
      <Navbar />
      <ToastContainer/>
      <DashboardContainer/>
      <Footer />
    </div>
  );
}
