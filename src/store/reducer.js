export const initialState = {
    cartProducts: JSON.parse(localStorage.getItem('CART_PRODUCTS'))
        ? JSON.parse(localStorage.getItem('CART_PRODUCTS'))
        : [],
    user: JSON.parse(localStorage.getItem('USER')) 
        ? JSON.parse(localStorage.getItem('USER')) 
        : null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartProducts: action.payload,
            };

        case 'UPDATE_PRODUCT_CART':
            return {
                ...state,
            };

        case 'UPDATE_PRODUCT_QUANTITY':
            return {
                ...state,
                cartProducts: action.payload,
            };

        case 'SET_EMPTY_CART':
            return {
                ...state,
                cartProducts: [],
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };

        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };

        case 'ADD_ADDRESS':
            return {
                ...state,
                user: {...state.user,addresses: action.payload},
            };

        default:
            return state;
    }
};

export default reducer;
