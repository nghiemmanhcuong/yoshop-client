import {useRef, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {AiOutlineHome} from 'react-icons/ai';
import {FiPhoneCall} from 'react-icons/fi';
import {GoMail, GoChevronDown} from 'react-icons/go';
import {IoChevronDownOutline} from 'react-icons/io5';
import {FaUserTie} from 'react-icons/fa';
import {useLocation, useNavigate} from 'react-router-dom';

import logo from '../asset/images/logo.png';
import {useStore} from '../store';
import categoryApi from '../api/categoryApi.js';
import clickOutsiteRef from '../utils/clickOutsiteRef.js';

import Auth from './Auth';
import CartComponent from './CartComponent';

const Header = () => {
    const [state] = useStore();
    const location = useLocation();
    const navigate = useNavigate();

    const header = useRef(null);
    const loginShowBtn = useRef(null);
    const loginAuth = useRef(null);
    const cart = useRef(null);
    const cartShowBtn = useRef(null);
    const menuRefContent = useRef(null);
    const menuRefShow = useRef(null);
    const showSubMenuBtn = useRef(null);
    const subMenu = useRef(null);
    const openMobileMenuBtn = useRef(null);

    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    clickOutsiteRef(menuRefContent, menuRefShow);
    clickOutsiteRef(loginAuth, loginShowBtn);
    clickOutsiteRef(cart, cartShowBtn);

    if (showSubMenuBtn.current != null) {
        showSubMenuBtn.current.onclick = () => {
            subMenu.current.classList.toggle('show');
        };
    }

    useEffect(() => {
        const fecthCategories = async () => {
            try {
                const response = await categoryApi.getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get categories product!', error);
            }
        };

        fecthCategories();
    }, []);

    useEffect(() => {
        if (menuRefContent.current != null) {
            menuRefContent.current.classList.remove('show');
            loginAuth.current.classList.remove('show');
            cart.current.classList.remove('show');
        }
    }, [location]);

    if (menuRefContent.current != null) {
        openMobileMenuBtn.current.onclick = () => {
            const mobileMenu = Array.from(document.getElementsByClassName('mobile-menu'));
            mobileMenu[0].classList.add('show');
        };
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            if (header.current != null) {
                header.current.classList.add('fixed');
            }
        } else {
            if (header.current != null) {
                header.current.classList.remove('fixed');
            }
        }
    });

    return (
        <div className='header'>
            <div className='header_wrapper' ref={header}>
                <div className='container'>
                    <div className='header_container'>
                        <div className='header_left'>
                            <div className='header_menu'>
                                <div className='header_menu_icon' ref={menuRefShow}>
                                    <i className='bi bi-list'></i>
                                </div>
                                <span className='header_menu_text'>MENU</span>
                                <div className='menu' ref={menuRefContent}>
                                    <div className='menu_icon'>
                                        <Link to='/'>
                                            <AiOutlineHome size={28} />
                                        </Link>
                                    </div>
                                    <ul className='menu_list'>
                                        <li className='menu_list_item'>
                                            <Link to='/'>TRANG CHỦ</Link>
                                        </li>
                                        <li className='menu_list_item'>
                                            <div ref={showSubMenuBtn}>
                                                SẢN PHẨM
                                                <GoChevronDown size={16} />
                                            </div>
                                            <ul className='sub_menu' ref={subMenu}>
                                                <li className='sub_menu_item'>
                                                    <Link to='collections/all'>
                                                        Xem tất cả "<span>Sản Phẩm</span>"
                                                    </Link>
                                                </li>
                                                {categories.length > 0
                                                    ? categories.map((category) => (
                                                          <li
                                                              className='sub_menu_item'
                                                              key={category.id}
                                                          >
                                                              <Link
                                                                  to={`collections/${category.slug}`}
                                                              >
                                                                  {category.name}
                                                              </Link>
                                                          </li>
                                                      ))
                                                    : null}
                                            </ul>
                                        </li>
                                        <li className='menu_list_item'>
                                            <Link to='/pages/bang-size'>BẢNG SIZE</Link>
                                        </li>
                                        <li className='menu_list_item'>
                                            <Link to='/pages/gioi-thieu'>GIỚI THIỆU 8YO</Link>
                                        </li>
                                        <li className='menu_list_item'>
                                            <Link to='/blogs'>BÀI VIẾT</Link>
                                        </li>
                                        <li className='menu_list_item'>
                                            <Link to='/contact'>LIÊN HỆ</Link>
                                        </li>
                                    </ul>
                                    <div className='menu_help'>
                                        <p className='menu_help_title'>BẠN CẦN HỖ TRỢ</p>
                                        <div className='menu_help_item'>
                                            <a href='tel:0987954221'>
                                                <FiPhoneCall />
                                                0987954221
                                            </a>
                                        </div>
                                        <div className='menu_help_item'>
                                            <a href='mailto:8yo.studio@gmail.com'>
                                                <GoMail />
                                                8yo.studio@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className='menu_sub'></div>
                                </div>
                            </div>
                            <div className='header_logo'>
                                <Link to='/'>
                                    <img className='header_logo_img' src={logo} alt='logo' />
                                </Link>
                            </div>
                        </div>
                        <div className='header_search'>
                            <input
                                type='text'
                                className='header_search_input'
                                placeholder='Tìm kiếm sản phẩm...'
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <button
                                className='header_search_btn'
                                onClick={() => navigate(`/search/${searchKeyword}`)}
                            >
                                <i className='bi bi-search'></i>
                            </button>
                        </div>
                        <div className='header_user'>
                            <div
                                className='header_user_block header_user_block_mobile-menu-open'
                                ref={openMobileMenuBtn}
                            >
                                <i className='bi bi-search'></i>
                            </div>
                            <div className={`header_user_block ${state.user != null ? 'is_user'  : ''}`}>
                                <div className='header_user_block_item' ref={loginShowBtn}>
                                    {state.user == null ? (
                                        <i className='bi bi-person header_user_block_icon'></i>
                                    ) : (
                                        <FaUserTie size={23}/>
                                    )}
                                    <span className='header_user_block_text'>
                                        {state.user == null ? (
                                            'Tài khoản'
                                        ) : (
                                            <div className='header_user_block_text_name'>
                                                {state.user.name}
                                                <IoChevronDownOutline />
                                            </div>
                                        )}
                                    </span>
                                </div>
                                <div className='header_user_auth' ref={loginAuth}>
                                    <Auth />
                                </div>
                            </div>
                            <div className='header_user_block'>
                                <div className='header_user_block_item' ref={cartShowBtn}>
                                    <i className='bi bi-cart2 header_user_block_icon'></i>
                                    <span className='header_user_block_text'>Giỏ hàng</span>
                                    <div className='header_user_block_num'>
                                        {state.cartProducts.length}
                                    </div>
                                </div>
                                <div className='header_user_cart' ref={cart}>
                                    <CartComponent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
