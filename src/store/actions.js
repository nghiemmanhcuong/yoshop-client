export const addProductToCartAction = (payload) => {
    return {
        type: 'ADD_TO_CART',
        payload: payload,
    }
}

export const updateProductCartAction = () => {
    return {
        type: 'UPDATE_PRODUCT_CART',
        payload: null,
    }
}

export const updateProductQuantity = (payload) => {
    return {
        type: 'UPDATE_PRODUCT_QUANTITY',
        payload: payload,
    }
}

export const setEmptyCartAction = () => {
    return {
        type: 'SET_EMPTY_CART',
    }
}

export const setUserAction = (payload) => {
    return {
        type: 'SET_USER',
        payload: payload
    }
}

export const logoutAction = () => {
    return {
        type: 'LOGOUT'
    }
}

export const addAddressAction = (payload) => {
    return {
        type: 'ADD_ADDRESS',
        payload: payload
    }
}