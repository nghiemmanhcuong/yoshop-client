import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {FaRegDotCircle} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

import Helmet from '../components/Helmet';

import {useStore} from '../store';
import {logoutAction} from '../store/actions.js';

const Account = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const [purchasedProduct, setPurchasedProduct] = useState([]);

    useEffect(() => {
        if (state.user == null) {
            navigate('/');
        }
    }, [state.user]);

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem('USER');
        dispatch(logoutAction());
        navigate('/');
    };

    return (
        <Helmet title='Tài khoản của tôi'>
            <div className='account-page'>
                <div className='container'>
                    <div className='account-page_header'>
                        <h1 className='account-page_header_title'>Tài khoản của bạn</h1>
                        <div className='account-page_header_hr'></div>
                    </div>
                    <div className='account-page_container'>
                        <div className='account-page_left'>
                            <h3 className='account-page_left_title'>TÀI KHOẢN</h3>
                            <ul className='account-page_left_list'>
                                <li className='account-page_left_item'>
                                    <Link to='/account'>
                                        <FaRegDotCircle size={8} /> Thông tin tài khoản
                                    </Link>
                                </li>
                                {!state.user.access || state.user.access != 'admin' ? (
                                    <li className='account-page_left_item'>
                                        <Link to='/account/addresses'>
                                            <FaRegDotCircle size={8} /> Danh sách địa chỉ
                                        </Link>
                                    </li>
                                ) : null}
                                {state.user.access && state.user.access == 'admin' && (
                                    <li className='account-page_left_item'>
                                        <a href='http://yoshop.cf/admin' target='_blank'>
                                            <FaRegDotCircle size={8} /> Vào trang quản trị
                                        </a>
                                    </li>
                                )}
                                <li className='account-page_left_item'>
                                    <Link to='/account/change-password'>
                                        <FaRegDotCircle size={8} /> Đổi mật khẩu
                                    </Link>
                                </li>
                                <li
                                    className='account-page_left_item'
                                    onClick={() => handleLogout()}
                                >
                                    <FaRegDotCircle size={8} /> Đăng xuất
                                </li>
                            </ul>
                        </div>
                        <div className='account-page_right'>
                            <div className='account-page_right_user'>
                                <h3 className='account-page_right_title'>THÔNG TIN TÀI KHOẢN</h3>
                                <div className='account-page_right_info'>
                                    <h5>
                                        {state.user != null &&
                                            state.user.surname + ' ' + state.user.name}
                                    </h5>
                                    <p>{state.user != null && state.user.email}</p>
                                    {!state.user.access || state.user.access != 'admin' ? (
                                        <Link to='/account/addresses'>Xem địa chỉ</Link>
                                    ) : null}
                                </div>
                            </div>
                            {!state.user.access || state.user.access != 'admin' ? (
                                <div className='account-page_right_product'>
                                    {purchasedProduct.length > 0 ? (
                                        <div></div>
                                    ) : (
                                        <div className='account-page_right_product_empty'>
                                            <div className='account-page_right_product_empty_wap'>
                                                <p>Bạn chưa đặt mua sản phẩm.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Account;
