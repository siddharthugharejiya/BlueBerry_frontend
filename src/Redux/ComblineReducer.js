import { combineReducers } from "redux";
import { Cart_Add_reducer, cartReducer, Product_filter_reducer, Product_posted, Product_reducer, singlepag_reducer } from "./reducer";
import Product_Edite_Product_reducer from "./reducer";


export const RootReducer = combineReducers({

    Products: Product_reducer,
    Product_upload: Product_posted,
    Product_Edite_getting: Product_Edite_Product_reducer,
    Product_Filtered: Product_filter_reducer,
    cart_Adding_product: Cart_Add_reducer,
    cart_get_items: cartReducer,
    singelpage_combine: singlepag_reducer


})