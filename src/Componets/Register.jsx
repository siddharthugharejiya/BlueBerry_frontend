import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register_action } from '../Redux/action';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';

function Register() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        key: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register_action(state, nav));
    };

    return (
        <>
            <Nav />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-blue-50 px-4">
                <div className="bg-white shadow-lg rounded-3xl max-w-xl w-full p-10">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-extrabold text-purple-700">Blueberry Sign Up</h2>
                        <p className="text-sm text-gray-500 mt-2">Join the juiciest platform on the internet 🍇</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="username"
                                value={state.username}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="John Blueberry"
                                className="w-full mt-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                autoComplete="off"
                                required
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
                                required
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="••••••••"
                                className="w-full mt-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Select Role</label>
                            <div className="flex space-x-6 flex-wrap">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        checked={state.role === 'admin'}
                                        required
                                        onChange={handleChange}
                                        className="accent-purple-500"
                                    />
                                    <span className="text-gray-700">Admin</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={state.role === 'user'}
                                        onChange={handleChange}
                                        required
                                        className="accent-purple-500"
                                    />
                                    <span className="text-gray-700">User</span>
                                </label>
                            </div>

                            {state.role === "admin" && (
                                <div className="mt-4">
                                    <label className="block text-gray-700 font-medium">Secret Key</label>
                                    <input
                                        type="text"
                                        name="key"
                                        value={state.key}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        placeholder="key..?"
                                        className="w-full mt-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition-all duration-300"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-500 mt-6">
                        Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;
