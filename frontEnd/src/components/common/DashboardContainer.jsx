import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import CreateSellerAccount from '../seller/CreateSellerAccount';
import SellerDashboard from '../seller/SellerDashboard';
import Products from '../pages/Products';
export default function (){
    const router= createBrowserRouter([
        {
        path:"/",
        element:<Products/>
        },     
        {
            path:"/createSellerAccount",
            element:<CreateSellerAccount/>
        },
        {
            path:"/sellerDashboard/*",
            element:<SellerDashboard/>,
        }
    ])
    return(
        <div className="dashboard-container">
            <RouterProvider router={router}></RouterProvider>
        </div>
    )
}
