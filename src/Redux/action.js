import axios from "axios"
import { GET, Posted } from "./actionType"
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

// register
export const register_action = (state, nav) => async (dispatch) => {
    try {
        await axios.post("https://blueberry-backend-1.onrender.com/signup", state);
        toast.success("Registration successful! You can now log in.");
        nav("/login");
    } catch (error) {
        toast.error("Registration failed.");
        console.error("Registration error:", error);
    }
};

// login
export const login_action = (state, nav) => async (dispatch) => {
    try {
        const res = await axios.post("https://blueberry-backend-1.onrender.com/login", state);
        const token = res.data.token || res.data.Token;
        const decoded = jwtDecode(token);
        localStorage.setItem("Token", token);
        localStorage.setItem("Login", "true");
        localStorage.setItem("UserRole", decoded.userRole);

        toast.success(res.data.message);

        if (decoded.userRole === "admin") nav("/admin");
        else if (decoded.userRole === "user") nav("/");

    } catch (error) {
        if (error.response?.status === 401) {
            toast.error(error.response.data.message || "Invalid credentials");
        } else {
            toast.error("Login failed.");
            console.error("Login error:", error);
        }
    }
};

// Product Get
export const Product = () => async (dispatch) => {
    try {
        const res = await axios.get("https://blueberry-backend-1.onrender.com/product");
        // console.log(res);

        dispatch({ type: GET, payload: res.data });
        // toast.success("Products fetched successfully.");
    } catch (err) {
        // toast.error("Error fetching products.");
        console.error("Error fetching product:", err);
    }
};

// Product Post
export const product_add_action = (state) => async (dispatch) => {
    try {
        const token = localStorage.getItem("Token");
        const res = await axios.post("https://blueberry-backend-1.onrender.com/add", state, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        dispatch({ type: "Posted_Product", payload: res.data })
        toast.success("Product added successfully.");
    } catch (err) {
        toast.error("Error adding product.");
        console.error("Error adding product:", err);
    }
};

// Product Delete
export const Product_del = (id) => async (dispatch) => {
    try {
        const res = await axios.post(`https://blueberry-backend-1.onrender.com/del/${id}`, {}, {
            headers: { "Content-Type": "application/json" }
        });
        toast.success("Product deleted successfully.");
        // console.log(res.data);
    } catch (err) {
        toast.error("Error deleting product.");
        console.error("Delete error:", err);
    }
};

// Product Edit Get
export const Product_edite_get = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`https://blueberry-backend-1.onrender.com/edite/${id}`);
        dispatch({ type: "GETTING_PRODUCT", payload: res.data });
        toast.success("Product data fetched for editing.");
    } catch (err) {
        toast.error("Error fetching product for editing.");
        console.error("Edit get error:", err);
    }
};

// Product Edit Post
export const product_edite_action = (id, state) => async (dispatch) => {
    try {
        const res = await axios.post(`https://blueberry-backend-1.onrender.com/edite/${id}`, state, {
            headers: { "Content-Type": "application/json" }
        });
        dispatch({ type: "Edite_Pro", payload: res.data.message });
        toast.success("Product edited successfully.");
    } catch (err) {
        toast.error("Error editing product.");
        console.error("Edit post error:", err);
    }
};

// Product Filter
export const Producer_Filter_Action = (category) => async (dispatch) => {
    try {
        const response = await fetch(`https://blueberry-backend-1.onrender.com/product${category === "All" ? "" : `?category=${category}`}`)

        const result = await response.json();

        dispatch({
            type: "FILTER_PRODUCTS_BY_CATEGORY",
            payload: result.success && result.data ? result.data : []
        });

    } catch (error) {
        console.error("Filter error:", error)
    }
}

// Add to Cart
export const Cart_action = (product, quantity) => async (dispatch) => {
    try {
        const Token = localStorage.getItem("Token");
        const response = await fetch("https://blueberry-backend-1.onrender.com/cart", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Product: product, quantity })
        });

        const res = await response.json();
        dispatch({ type: "Cart_ADD", payload: res });
        toast.success("Item added to cart.");
    } catch (err) {
        // toast.error("Error adding to cart.");
        console.error("Cart error:", err);
    }
};

// Get Cart
export const cart_get_Acation = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("Token");
        const response = await fetch("https://blueberry-backend-1.onrender.com/cart_get", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const res = await response.json();
        console.log(res);

        if (response.ok) {
            dispatch({ type: "Cart_Get", payload: res.data });
            // toast.success("Cart fetched successfully.");
            // } else {
            //     // toast.error("Cart fetch failed.");
        }
    } catch (error) {
        // toast.error("Error fetching cart.");
        console.error("Cart get error:", error);
    }
}

// Get Single Product
export const single_action = (id) => async (dispatch) => {
    try {
        const res = await fetch(`https://blueberry-backend-1.onrender.com/single/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        dispatch({ type: "single", payload: data });
        // toast.success("Product details loaded.");
    } catch (err) {
        // toast.error("Failed to load product detail.");
        console.error("Single action error:", err);
    }
};

export const remove_action = (id) => async (dispatch) => {
    try {
        const res = await fetch(`https://blueberry-backend-1.onrender.com/remo/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        dispatch({ type: "REMOVE_FROM_CART", payload: id })
        toast.success("Product removed from cart.");
    } catch (err) {
        toast.error("Failed to remove product.");
        console.error("Remove action error:", err);
    }
};
