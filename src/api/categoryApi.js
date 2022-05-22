import axiosClient from './axiosClient.js';

const categoryApi = {
    getAllCategories: () => {
        const url = 'categories/get-all.php';
        return axiosClient.get(url);
    },

    getCategoryBySlug: (params) => {
        const url = 'categories/get-by-slug.php';
        return axiosClient.get(url,{params});
    }
}

export default categoryApi;