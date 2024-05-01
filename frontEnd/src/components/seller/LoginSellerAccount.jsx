import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LoginSellerAccount() {
    const navigate=useNavigate();
    useEffect(() => {
        if(localStorage.getItem('sToken')){
            navigate('/sellerDashboard');
            }
    }, [])
    
  return (
    <div>LoginSellerAccount</div>
  )
}
