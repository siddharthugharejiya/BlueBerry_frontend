import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login_action } from '../Redux/action';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';


function Login() {
    const dispatch = useDispatch();
    const nav = useNavigate()
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login_action(state, nav));
    };

    return (
        <>
            <Nav />


            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-blue-50 px-4">
                <div className="bg-white shadow-lg rounded-3xl max-w-xl w-full p-10">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-extrabold text-purple-700">Blueberry Login</h2>
                        <p className="text-sm text-gray-500 mt-2">Welcome back to the juiciest platform 🍇</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                placeholder="you@blueberry.com"
                                className="w-full mt-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full mt-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition-all duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-500 mt-6">
                        Don't have an account?
                        <Link to="/register" className="text-purple-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;
