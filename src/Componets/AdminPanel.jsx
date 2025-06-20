import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, Product_del, Product_edite_get } from '../Redux/action';
import { useLocation, useNavigate } from 'react-router-dom';
import Product_add from './Product_add';
import { FaGlobe } from "react-icons/fa";
import { FiHome, FiBox, FiPlusCircle, FiShoppingBag } from 'react-icons/fi';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminPanel = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [state, setstate] = useState("Desh")

  const handleClick = (e) => {
    setstate(e);
  };
  const products = useSelector(state => state.Products.data.data || []);
  const handleDelete = (el) => {
    dispatch(Product_del(el)).then(() => {
      dispatch(Product())
    })
  }

  const nav = useNavigate();
  const handleEdite = (el) => {
    dispatch(Product_edite_get(el)).then(() => {
      dispatch(Product())
      setstate("add");
    });
  };

  useLayoutEffect(() => {
    dispatch(Product())
  }, [dispatch, Product_edite_get(),])

  useEffect(() => {
    if (location.state?.reload) {
      dispatch(Product());
    }
  }, [location.state, dispatch])

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 2023',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['Electronics', 'Clothing', 'Home', 'Food', 'Other'],
    datasets: [
      {
        label: 'Revenue by Category',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(79, 70, 229, 0.8)',
          'rgba(67, 56, 202, 0.8)',
          'rgba(55, 48, 163, 0.8)',
          'rgba(49, 46, 129, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <aside className="w-full lg:w-64 bg-indigo-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8 flex items-center">
          <FiShoppingBag className="mr-2" />
          Admin Panel
        </h1>
        <div className="space-y-2">
          <button onClick={() => handleClick("Desh")} className={`flex items-center w-full p-3 rounded-lg ${state === "Desh" ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
            <FiHome className="mr-3" /> Dashboard
          </button>
          <button onClick={() => handleClick("prod")} className={`flex items-center w-full p-3 rounded-lg ${state === "prod" ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
            <FiBox className="mr-3" /> Products
          </button>
          <button onClick={() => handleClick("add")} className={`flex items-center w-full p-3 rounded-lg ${state === "add" ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
            <FiPlusCircle className="mr-3" /> Add Product
          </button>
          <button onClick={() => nav("/")} className={`flex items-center w-full p-3 rounded-lg ${state === "website" ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
            <FaGlobe className="mr-3 text-lg " /> Website
          </button>
        </div>
      </aside>

      <div className="flex-1 p-4 sm:p-6">
        {state === "Desh" && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Total Products</h3>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{products.length}</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Monthly Sales</h3>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">$12,345</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                <h3 className="text-gray-500">New Customers</h3>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">124</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                <Line data={salesData} />
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
                <Pie data={revenueData} />
              </div>
            </div>
          </div>
        )}

        {state === "prod" && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 ">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Product Management</h1>
              <button onClick={() => handleClick("add")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((el) => (
                <div key={el.id} className="px-2">
                  <div className="relative group w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden shadow-md border hover:shadow-lg transition-all duration-300">
                    <div className="h-[240px] w-full relative overflow-hidden">
                      <span className="absolute z-10 top-3 left-2 group-hover:hidden" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
                        {el.tag}
                      </span>
                      <div className="relative h-full w-full overflow-hidden group">
                        <img src={el.image[0]} alt={el.name} className="absolute z-10 h-full w-full object-cover transform transition-all duration-700 group-hover:-translate-x-full" />
                        <img src={el.image[1]} alt={`${el.name} back`} className="absolute z-0 h-full w-full object-cover transform translate-x-full scale-100 transition-all duration-700 group-hover:translate-x-0 group-hover:scale-110" />
                        <div className="absolute z-20 top-0 left-[-75%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 transition-all duration-700 group-hover:left-[100%] pointer-events-none" />
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2" onClick={() => handleSinglePage(el._id)}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold truncate">{el.name}</h3>
                        <div className="text-yellow-500 text-sm">{"★".repeat(Math.floor(el.rating || 0))}</div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{el.des}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-800 font-bold">
                          ${el.price}
                          {el.strike && (
                            <span className="text-sm text-gray-400 ms-2 line-through">${el.strike}</span>
                          )}
                        </span>
                        <span className="text-sm text-gray-500">{el.weight}</span>
                      </div>
                    </div>

                    <div className="flex px-4 pb-4 gap-2">
                      <button onClick={() => handleDelete(el._id)} className="w-full py-1.5 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors">
                        Delete
                      </button>
                      <button onClick={() => handleEdite(el._id)} className="w-full py-1.5 text-sm bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {state === "add" && (
          <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
            <Product_add />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
