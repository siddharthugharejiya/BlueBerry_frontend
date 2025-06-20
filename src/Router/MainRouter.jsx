


import { Route, Routes } from 'react-router-dom'
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
// import Chatbot from '../Componets/ChatBot'


function MainRouter() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin' element={<AdminPanel />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/product' element={<Product_add />}></Route>
        <Route path='/single/:id'
          element={
            <PrivateRoute>
              <SinglePage />
            </PrivateRoute>
          }
        ></Route>
        <Route path='/payment' element={<PayPalCheckout />}></Route>
        <Route path='/chat' element={<Chatbot />}></Route>


      </Routes>
    </div >
  )
}

export default MainRouter
