import axiosClient from './axiosClient.js';

const productApi = {
    getAllProduct: (params) => {
        const url = 'products/get-all.php';
        return axiosClient.post(url,params);
    },

    getNewProducts: (params) => {
        const url = 'products/new-product.php';
        return axiosClient.get(url,{params});
    },

    getPoularProducts: (params) => {
        const url = 'products/popular-product.php';
        return axiosClient.get(url,{params});
    },

    getProductsByCategory: (params) => {
        const url = 'products/collections.php';
        return axiosClient.post(url,params);
    },

    getProductDetail : (params) => {
        const url = 'products/get-detail.php';
        return axiosClient.get(url,{params});
    },

    getProductByKeyWord : (params) => {
        const url = 'products/search.php';
        return axiosClient.get(url,{params});
    },

    getProductRelated: (params) => {
        const url = 'products/related.php';
        return axiosClient.get(url,{params});
    },

    addComment : (params) => {
        const url = 'products/add-comment.php';
        return axiosClient.post(url,params);
    },

    getProductComments : (params) => {
        const url = 'products/get-comments.php';
        return axiosClient.get(url,{params});
    }
}

export default productApi;