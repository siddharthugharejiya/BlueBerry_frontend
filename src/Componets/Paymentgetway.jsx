import React from "react";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { cart_get_Acation,Cart_action, remove_action } from "../Redux/action";



const PayPalCheckout = () => {
    // 1. Redux से cart items लो
    const cartItems = useSelector(state => state.cart_get_items.cartItems || []);
    console.log(cartItems);


    // 2. Total amount calculate करो (Safe calculation)
    const totalAmount = cartItems.reduce((sum, item) => {
        const price = Number(item?.price);
        const quantity = Number(item?.quantity);

        if (!isNaN(price) && !isNaN(quantity)) {
            return sum + price * quantity;
        }
        return sum;
    }, 0);


    // Debug logs (फिर भी screen white हो तो console देखो)
    console.log("cartItems:", cartItems);
    console.log("totalAmount:", totalAmount);

    return (
        <PayPalScriptProvider options={{ "client-id": "AWEBpoKx-YP5HE9H5zLQPk_8zxhwSspmDX6clmWlO6eoqMs2myKFEDrZNhueAFMvmiF5WbDhF1d8r7aM" }}>
            <div className="p-4 border rounded-md w-[300px] mx-auto mt-10 shadow-lg bg-white">
                <h2 className="mb-4 text-lg font-semibold text-center">Pay with PayPal</h2>

                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: "100.00", // ✅ जरूरी है — इसे dynamic भी बना सकते हो
                                    currency_code: "USD" // ✅ currency भी ज़रूरी है
                                }
                            }]
                        });
                    }}

                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            alert(`Transaction completed by ${details.payer.name.given_name}`);
                            console.log("Transaction details:", details);

                            // Optional: clear cart or send to backend here
                        });
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalCheckout;
