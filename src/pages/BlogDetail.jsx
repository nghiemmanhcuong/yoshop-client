import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import {AiFillClockCircle} from 'react-icons/ai';
import parse from 'html-react-parser';

import Loading from '../components/Loading';

import blogApi from '../api/blogApi.js';

const imgUrl = process.env.REACT_APP_IMG_URL;

const BlogDetail = () => {
    const params = useParams();
    const slug = params.slug;

    const [blog, setBlog] = useState({});
    const [newBlogs, setNewBlogs] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await blogApi.getBlogBySlug({slug: slug});
                if (response.success) {
                    setBlog(response.data);
                }
            } catch (error) {
                console.log('Feiled to fetch api get blog detail!', error);
            }
        };
        fetchBlog();
    }, [slug]);

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
        <div className='blog-detail'>
            <div className='container'>
                <div className='blog-detail_container'>
                    {Object.entries(blog).length > 0 ? (
                        <div className='blog-detail_wrapper'>
                            <h1 className='blog-detail_title'>{blog.title}</h1>
                            <div className='blog-detail_info'>
                                <div className='blog-detail_info_author'>
                                    <FaUser />
                                    <span>{blog.author}</span>
                                </div>
                                <div className='blog-detail_info_created-at'>
                                    <AiFillClockCircle />
                                    <span>{blog.created_at}</span>
                                </div>
                            </div>
                            <p className='blog-detail_desc'>{blog.description}</p>
                            <div
                                className='blog-detail_content'
                                dangerouslySetInnerHTML={{
                                    __html: parse(blog.content ? blog.content : ''),
                                }}
                            ></div>
                        </div>
                    ) : (
                        <Loading />
                    )}

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

export default BlogDetail;
