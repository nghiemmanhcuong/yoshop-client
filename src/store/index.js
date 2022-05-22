import {createContext, useReducer, useContext, useEffect} from 'react';
import reducer, {initialState} from './reducer';

import authApi from '../api/authApi.js';
import {addAddressAction} from './actions.js';

export const Context = createContext();

export const useStore = () => {
    const [state, dispatch,getUserAddresses] = useContext(Context);
    return [state, dispatch,getUserAddresses];
};

export default function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getUserAddresses = async (userId) => {
        try {
            const response = await authApi.getAddresses({userId});
            if (response.success) {
                dispatch(addAddressAction(response.user_addresses));
            }else {
                dispatch(addAddressAction([]));
            }
        } catch (error) {
            console.log('Feiled to fetch api get user addresses!', error);
        }
    };   

    return (
        <Context.Provider value={[state, dispatch,getUserAddresses]}>
            {props.children}
        </Context.Provider>
    );
}
