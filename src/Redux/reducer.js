import { GET, Posted } from "./actionType"

const Product = {
    data: []
}

export const Product_reducer = (state = Product, { type, payload }) => {
    switch (type) {
        case GET:
            return {
                ...state,
                data: payload
            }
        default: return state
    }

}
const p_e_g = {
    data: []
}
export const Product_Editing_Posted = (state = p_e_g, { type, payload }) => {
    switch (type) {
        case "Posted_Product":
            return {
                ...state,
                data: payload

            }
        default: return state
    }
}

const e_g = {
    data: []
}
export const Product_posted = (state = e_g, { type, payload }) => {
    switch (type) {
        case "Edite_Pro":
            return {
                ...state,
                data: payload

            }
        default: return state
    }
}


// const e_e_g = {
//     data: []
// }
// export const Product_Editing_Edited = (state = e_e_g, { type, payload }) => {
//     switch (type) {
//         case "Edite_Pro":
//             return {
//                 ...state,
//                 data: payload

//             }
//         default: return state
//     }
// }

const e_g_g = {
    data: []
}
const Product_Edite_Product_reducer = (state = e_g_g, { type, payload }) => {
    switch (type) {
        case "GETTING_PRODUCT":
            return {
                data: payload
            }
        default: return state
    }

}
export default Product_Edite_Product_reducer

const product_filter = {
    data: []
}

export const Product_filter_reducer = (state = product_filter, { type, payload }) => {
    switch (type) {
        case "FILTER_PRODUCTS_BY_CATEGORY":
            return {
                ...state,
                data: payload
            }
        default: return state
    }
}


const Cart_added = {
    quantity: 0,
    product: []
}

export const Cart_Add_reducer = (state = Cart_added, { type, payload }) => {
    switch (type) {
        case "Cart_ADD":
            return {
                ...state,
                quantity: payload,
                product: payload
            }
        default: return state
    }
}

const initialState = {
    cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Cart_Get":
            return {
                ...state,
                cartItems: action.payload,
            };

        default:
            return state;
    }
};

const singlepageinistaial = {
    data: []
}
export const singlepag_reducer = (state = singlepageinistaial, { type, payload }) => {
    switch (type) {
        case "single":
            return {
                ...state,
                data: payload
            }
        default: return state
    }
}