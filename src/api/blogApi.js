import axiosClient from './axiosClient.js';

const blogApi = {
    getAllBlogs: (params) => {
        const url = 'blogs/get-all.php';
        return axiosClient.get(url,{params});
    },

    getNewBlogs: (params) => {
        const url = 'blogs/get-new-blogs.php';
        return axiosClient.get(url,{params});
    },

    getBlogBySlug: (params) => {
        const url = 'blogs/detail.php';
        return axiosClient.get(url,{params});
    }
}

export default blogApi;