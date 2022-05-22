import {useState, useEffect} from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';

import SizeChart from '../components/SizeChart';
import Introduction from '../components/Introduction';
import ReturnPolicy from '../components/ReturnPolicy';
import SecurityPolicy from '../components/SecurityPolicy';
import Rules from '../components/Rules';
import pageImg from '../asset/images/page-img.jpeg';
import Breadcrumb from '../components/Breadcrumb';
import Helmet from '../components/Helmet';

import {menuService} from '../asset/data/constants.js';

const Pages = () => {
    let Body;
    const navigate = useNavigate();
    const page = useParams();
    const [title, setTitle] = useState('');

    // handle page title
    useEffect(() => {
        if (page.page == 'bang-size') {
            setTitle('Bảng size');
        } else if (page.page == 'gioi-thieu') {
            setTitle('Giới thiệu');
        } else if (page.page == 'chinh-sach-doi-tra') {
            setTitle('Chính sách đổi trả');
        } else if (page.page == 'chinh-sach-bao-mat') {
            setTitle('Chính sách bảo mật');
        } else if (page.page == 'dieu-khoan-dich-vu') {
            setTitle('Điều khoản dịch vụ');
        } else {
            navigate('/404');
        }
    }, [page.page]);

    // handle body page
    if (page.page == 'bang-size') {
        Body = () => {
            return <SizeChart />;
        };
    } else if (page.page == 'gioi-thieu') {
        Body = () => {
            return <Introduction />;
        };
    } else if (page.page == 'chinh-sach-doi-tra') {
        Body = () => {
            return <ReturnPolicy />;
        };
    } else if (page.page == 'chinh-sach-bao-mat') {
        Body = () => {
            return <SecurityPolicy />;
        };
    } else if (page.page == 'dieu-khoan-dich-vu') {
        Body = () => {
            return <Rules />;
        };
    }else {
        Body = () => {
            return <></>;
        };
    }

    return (
        <Helmet title={title}>
            <div className='page'>
                <div className='container'>
                    <Breadcrumb title={title} />
                    <div className='page_container'>
                        <div className='page_body'>
                            <Body />
                        </div>
                        <aside className='page_sitebar'>
                            <div className='page_sitebar_container'>
                                <h3 className='page_sitebar_title'>Danh mục page</h3>
                                <ul className='page_sitebar_list'>
                                    {menuService.map((item, index) => (
                                        <li className='page_sitebar_list_item' key={index}>
                                            <Link to={item.path}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <picture className='page_sitebar_img'>
                                <Link to='/'>
                                    <img src={pageImg} alt='page sitebar image' />
                                </Link>
                            </picture>
                        </aside>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Pages;
