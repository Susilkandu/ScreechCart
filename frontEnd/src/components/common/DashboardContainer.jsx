import {Routes,Route} from 'react-router-dom';
import CreateSellerAccount from '../seller/CreateSellerAccount';
import SellerDashboard from '../seller/SellerDashboard';
import LoginSellerAccount from '../seller/LoginSellerAccount';
export default function (){
    return(
        <div className="dashboard-container">
            <Routes>
            <Route path="/createSellerAccount" element={<CreateSellerAccount/>}></Route>
            <Route path="/loginSellerAccount" element={<LoginSellerAccount/>}></Route>
            <Route path="/sellerDashboard/*" element={<SellerDashboard/>}></Route>
            </Routes>
        </div>
    )
}
