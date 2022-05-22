import axiosClient from './axiosClient.js';

const checkoutsApi = {
    handleCheckouts: (params) => {
        const url = '/checkouts/index.php';
        return axiosClient.post(url, params);
    },
};

export default checkoutsApi;
