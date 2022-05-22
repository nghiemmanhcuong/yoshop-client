import {useState, useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import {AiFillClockCircle} from 'react-icons/ai';
import {Link} from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

import blogApi from '../api/blogApi.js';

const imgUrl = process.env.REACT_APP_IMG_URL;

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlogs, setNewBlogs] = useState([]);
    const [pages, setPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        const fecthAllBlogs = async () => {
            try {
                const response = await blogApi.getAllBlogs({limit: 8, page: currPage});
                if (response.success) {
                    setBlogs(response.data);
                    setPages(response.pages);
                }
            } catch (error) {
                console.log('Feiled to fetch api get all blogs!', error);
            }
        };
        fecthAllBlogs();
    }, [currPage]);

    useEffect(() => {
        const fecthNewBlogs = async () => {
            try {
                const response = await blogApi.getNewBlogs({limit: 10});
                if (response.success) {
                    setNewBlogs(response.data);
                }
            } catch (error) {
                console.log('Feiled to fetch api get new blogs!', error);
            }
        };
        fecthNewBlogs();
    }, []);

    return (
        <div className='blogs'>
            <div className='container'>
                <Breadcrumb title='Bài viết' />
                <div className='blogs_container'>
                    <div className='blogs_list'>
                        <div className='blogs_list_wap'>
                            {blogs.length > 0 ? (
                                blogs.map((blog, index) => (
                                    <div className='blogs_item' key={index}>
                                        <div className='blogs_item_image'>
                                            <Link to={`/blog/${blog.slug}`}>
                                                <img src={imgUrl + blog.image} alt='' />
                                            </Link>
                                        </div>
                                        <div className='blogs_item_info'>
                                            <Link to={`/blog/${blog.slug}`}>
                                                <h5>{blog.title}</h5>
                                            </Link>
                                            <div className='blogs_item_sub'>
                                                <div className='blogs_item_sub_content'>
                                                    <FaUser />
                                                    <span>{blog.author}</span>
                                                </div>
                                                <div className='blogs_item_sub_content'>
                                                    <AiFillClockCircle />
                                                    <span>{blog.createdAt}</span>
                                                </div>
                                            </div>
                                            <p className='blogs_item_description'>
                                                {blog.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Loading />
                            )}
                        </div>
                        {blogs.length > 0 ? (
                            <Pagination
                                pages={pages}
                                currPage={currPage}
                                onSetCurrentPage={setCurrPage}
                            />
                        ) : null}
                    </div>
                    <div className='blog_sitebar'>
                        <h3 className='blog_sitebar_title'>Bài viết mới nhất</h3>
                        {newBlogs.length > 0 ? (
                            newBlogs.map((blog, index) => (
                                <div className='blog_sitebar_item' key={index}>
                                    <div className='blog_sitebar_item_image'>
                                        <Link to={`/blog/${blog.slug}`}>
                                            <img src={imgUrl + blog.image} alt='' />
                                        </Link>
                                    </div>
                                    <div className='blog_sitebar_item_info'>
                                        <h5 className='blog_sitebar_item_title'>{blog.title}</h5>
                                        <div className='blog_sitebar_item_author'>
                                            <FaUser size={12} />
                                            <span>{blog.author}</span>
                                        </div>
                                        <div className='blog_sitebar_item_created-at'>
                                            <AiFillClockCircle size={12} />
                                            <span>{blog.createdAt}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Loading />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
