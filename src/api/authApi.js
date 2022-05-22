import axiosClient from "./axiosClient";

const authApi = {
    register: (params) => {
        const url = 'auth/register.php';
        return axiosClient.post(url,params);
    },

    login: (params) => {
        const url = 'auth/login.php';
        return axiosClient.post(url,params);
    },

    addAddress: (params) => {
        const url = 'auth/add-address.php';
        return axiosClient.post(url,params);
    },

    getAddresses: (params) => {
        const url = 'auth/get-addresses.php';
        return axiosClient.get(url,{params});
    },

    deleteAddresses: (params) => {
        const url = 'auth/delete-address.php';
        return axiosClient.delete(url,{params});
    },

    changePassword: (params) => {
        const url = 'auth/change-password.php';
        return axiosClient.post(url,params);
    },

    sendContact: (params) => {
        const url = 'auth/send-contact.php';
        return axiosClient.post(url,params);
    }
}

export default authApi;