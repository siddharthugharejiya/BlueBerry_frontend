import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from '../Componets/Home'
import Register from '../Componets/Register'
import Login from '../Componets/Login'
import AdminPanel from '../Componets/AdminPanel'
import Product_add from '../Componets/Product_add'
import Cart from '../Componets/Cart'
import SinglePage from '../Componets/SinglePage'
import PayPalCheckout from '../Componets/Paymentgetway'
import { PrivateRoute } from '../Componets/PrivateRoute'
import { Chatbot } from '../Componets/ChatBot'
import Loader from '../Componets/Loader'

function MainRouter() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Simulate route loading (1 second delay, adjust as needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 800ms delay

    return () => clearTimeout(timer);
  }, [location.pathname]); // every time route changes

  return (
    <div>
      {loading && <Loader />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product' element={<Product_add />} />
        <Route
          path='/single/:id'
          element={
            <PrivateRoute>
              <SinglePage />
            </PrivateRoute>
          }
        />
        <Route path='/payment' element={<PayPalCheckout />} />
        <Route path='/chat' element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
