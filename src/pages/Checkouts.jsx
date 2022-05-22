import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {FiChevronRight} from 'react-icons/fi';
import {IoMdArrowDropdown} from 'react-icons/io';
import {BiUser} from 'react-icons/bi';
import {useNavigate} from 'react-router-dom';

import Grid from '../components/Grid';
import Helmet from '../components/Helmet';

import {useStore} from '../store';
import {setEmptyCartAction, logoutAction} from '../store/actions.js';
import numberWithComas from '../utils/numberWithComas.js';
import handleTotalPrice from '../utils/handleTotalPrice';
import checkoutsApi from '../api/checkoutsApi.js';

const imgUrl = process.env.REACT_APP_IMG_URL;

const Checkouts = () => {
    const navigate = useNavigate();
    const [state, dispatch, getUserAddresses] = useStore();

    const [userClientAddress, setUserClientAddress] = useState({});
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const totalPrice = handleTotalPrice(state.cartProducts);

    useEffect(() => {
        if (state.user != null) {
            getUserAddresses(Number(state.user.userId));
            setCustomerEmail(state.user.email);
        }
    }, []);

    useEffect(() => {
        if (Object.entries(userClientAddress).length !== 0) {
            setCustomerName(userClientAddress.surname + ' ' + userClientAddress.name);
            setCustomerPhone(userClientAddress.phone);
            setCustomerAddress(userClientAddress.address);
        } else {
            setCustomerName('');
            setCustomerPhone('');
            setCustomerAddress('');
        }
    }, [userClientAddress]);

    // handle Checkouts
    const handleCheckouts = async () => {
        if (!customerName || !customerPhone || !customerEmail || !customerAddress) {
            setError('Vui lòng nhập đủ thông tin');
        } else {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customerEmail)) {
                if (/((09|03|07|08|05)+([0-9]{8})\b)/g.test(customerPhone)) {
                    const cartProducts = [];
                    const userInfo = {
                        customerName,
                        customerEmail,
                        customerPhone,
                        customerAddress,
                        message,
                        totalPrice,
                        paymentMethod: 'Thanh toán khi nhận hàng',
                        transportFee: 30000,
                        discount: 0,
                    };

                    state.cartProducts.forEach((item) => {
                        const cartProductItem = {
                            productId: Number(item.productId),
                            quantity: item.quantity,
                            size: item.size,
                        };
                        cartProducts.push(cartProductItem);
                    });

                    try {
                        const data = {userInfo, cartProducts};
                        const response = await checkoutsApi.handleCheckouts(data);
                        if (response.success) {
                            localStorage.removeItem('CART_PRODUCTS');
                            dispatch(setEmptyCartAction());
                            navigate('/checkouts/success');
                        } else {
                            setError(response.message);
                        }
                    } catch (error) {
                        console.log('Feiled to handle api checkouts!', error);
                    }
                } else {
                    setError('Số điện thoại không hợp lệ cui lòng kiểm tra lại');
                }
            } else {
                setError('Email không hợp lệ cui lòng kiểm tra lại');
            }
        }
    };

    // handle Choose User Address
    const handleChooseUserAddress = (e) => {
        setUserClientAddress(JSON.parse(e.target.options[e.target.selectedIndex].value));
    };

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem('USER');
        dispatch(logoutAction());
        navigate('/checkouts');
    };

    return (
        <Helmet title='Thanh toán đơn hàng'>
            <div className='checkouts'>
                <div className='container'>
                    <div className='checkouts_container'>
                        <div className='checkouts_left'>
                            <h1 className='checkouts_left_title'>
                                <Link to='/'>8YO Studio</Link>
                            </h1>
                            <div className='checkouts_left_breadcrumb'>
                                <div className='checkouts_left_breadcrumb_item'>
                                    <Link to='/cart'>Giỏ Hàng</Link>
                                </div>
                                <div className='checkouts_left_breadcrumb_icon'>
                                    <FiChevronRight />
                                </div>
                                <div className='checkouts_left_breadcrumb_item'>
                                    Thông tin giao hàng
                                </div>
                            </div>
                            <h3 className='checkouts_left_text'>Thông tin giao hàng</h3>
                            {state.user != null ? (
                                <div className='checkouts_left_user'>
                                    <div className='checkouts_left_user_icon'>
                                        <BiUser size={18} />
                                    </div>
                                    <div className='checkouts_left_user_info'>
                                        <p>
                                            {state.user.surname + ' ' + state.user.name}{' '}
                                            <span>({state.user.email})</span>
                                        </p>
                                        <button onClick={() => handleLogout()}>Đăng xuất</button>
                                    </div>
                                </div>
                            ) : (
                                <p className='checkouts_left_login'>
                                    Bạn đã có tài khoản? <Link to='/account/login'>Đăng nhập</Link>
                                </p>
                            )}
                            {error != '' && <div className='account_form_error'>{error}</div>}
                            <form className='checkouts_left_form'>
                                {state.user != null &&
                                    state.user.addresses != undefined &&
                                    state.user.addresses.length > 0 && (
                                        <div className='select'>
                                            <div className='select_icon'>
                                                <IoMdArrowDropdown size={22} />
                                            </div>
                                            <select
                                                className='checkouts_left_form_input'
                                                onChange={(e) => handleChooseUserAddress(e)}
                                            >
                                                <option value='{}'>
                                                    Địa chỉ đã lưu (Nhấn để chọn)
                                                </option>
                                                {state.user.addresses.map((item, index) => (
                                                    <option
                                                        value={JSON.stringify(item)}
                                                        key={index}
                                                    >{`${item.phone}, ${item.address}, ${item.province}, ${item.contry}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                <input
                                    className='checkouts_left_form_input'
                                    type='text'
                                    placeholder='Họ và tên'
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                                <Grid col={2} xsCol={1} gap={10}>
                                    <input
                                        className='checkouts_left_form_input'
                                        type='text'
                                        placeholder='Email'
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                    />
                                    <input
                                        className='checkouts_left_form_input'
                                        type='text'
                                        placeholder='Số điện thoại'
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                    />
                                </Grid>
                                <input
                                    className='checkouts_left_form_input'
                                    type='text'
                                    placeholder='Địa chỉ'
                                    value={customerAddress}
                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                />
                                <textarea
                                    className='checkouts_left_form_input'
                                    placeholder='Thông tin thêm'
                                    cols='30'
                                    rows='3'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </form>
                            <h3 className='checkouts_left_text'>Phương thức vận chuyển</h3>
                            <div className='checkouts_left_checkbox' htmlFor='feeship'>
                                <div className='checkouts_left_checkbox_group'>
                                    <div className='checkouts_left_checkbox_circle'></div>
                                    <p>Ship tận nơi</p>
                                </div>
                                <div className='checkouts_left_checkbox_price'>
                                    30,000<sup>đ</sup>
                                </div>
                            </div>
                            <h3 className='checkouts_left_text'>Phương thức thanh toán</h3>
                            <div className='checkouts_left_checkbox' htmlFor='payment-method'>
                                <div className='checkouts_left_checkbox_group'>
                                    <div className='checkouts_left_checkbox_circle'></div>
                                    <div className='checkouts_left_checkbox_img'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='40'
                                            height='40'
                                            viewBox='0 0 40 40'
                                            fill='none'
                                        >
                                            <path
                                                d='M4 0.5H36C37.933 0.5 39.5 2.067 39.5 4V36C39.5 37.933 37.933 39.5 36 39.5H4C2.067 39.5 0.5 37.933 0.5 36V4C0.5 2.067 2.067 0.5 4 0.5Z'
                                                fill='white'
                                                stroke='#D9D9D9'
                                            />
                                            <path
                                                d='M10.197 9C9.55078 9 9.01738 9.53275 9.01738 10.1791V28.5044C9.01738 29.1507 9.55078 29.6835 10.197 29.6835H28.5213C29.1675 29.6835 29.7009 29.1507 29.7009 28.5044V10.1791C29.7009 9.53275 29.1675 9 28.5213 9H10.197Z'
                                                fill='#E4A862'
                                            />
                                            <path
                                                d='M12.9869 22.0051L26.0131 22.0051C26.1393 22.0051 26.2416 22.1074 26.2416 22.2335L26.2416 29.5263C26.2416 29.6525 26.1393 29.7548 26.0131 29.7548L12.9869 29.7548C12.8607 29.7548 12.7584 29.6525 12.7584 29.5263L12.7584 22.2336C12.7584 22.1073 12.8607 22.0051 12.9869 22.0051Z'
                                                fill='#1C92D3'
                                            />
                                            <path
                                                d='M25.1506 27.818C24.7456 27.9388 24.4257 28.2587 24.3048 28.6638C24.2886 28.7181 24.2397 28.7561 24.1829 28.7561L14.8171 28.7561C14.7603 28.7561 14.7114 28.7181 14.6952 28.6638C14.5744 28.2588 14.2545 27.9388 13.8494 27.818C13.795 27.8018 13.7571 27.7528 13.757 27.6961L13.757 24.0638C13.757 24.007 13.795 23.9581 13.8494 23.9419C14.2545 23.8211 14.5743 23.5012 14.6952 23.0961C14.7114 23.0417 14.7603 23.0038 14.817 23.0038L24.183 23.0038C24.2397 23.0038 24.2887 23.0417 24.3049 23.0961C24.4257 23.5011 24.7456 23.821 25.1506 23.9418C25.205 23.958 25.2429 24.007 25.2429 24.0637L25.2429 27.6961C25.2429 27.7528 25.205 27.8018 25.1506 27.818Z'
                                                fill='#40C0F2'
                                            />
                                            <path
                                                d='M19.5 23.9613C18.5859 23.9613 17.8449 24.7023 17.8449 25.6164C17.8449 26.5305 18.5859 27.2716 19.5 27.2716C20.4141 27.2716 21.1552 26.5305 21.1552 25.6164C21.1552 24.7023 20.4141 23.9613 19.5 23.9613Z'
                                                fill='#1C92D3'
                                            />
                                            <path
                                                d='M15.7832 9V13.9837C15.7832 14.0784 15.8211 14.1693 15.8883 14.236L16.9554 15.3058C17.0946 15.4456 17.3209 15.4456 17.4601 15.3058L18.2775 14.4884L19.0924 15.3058C19.2315 15.4456 19.4578 15.4456 19.597 15.3058L20.4118 14.4884L21.2293 15.3058C21.3685 15.4456 21.5948 15.4456 21.7339 15.3058L22.8011 14.236C22.8682 14.1693 22.9061 14.0784 22.9062 13.9837V9H15.7832Z'
                                                fill='#FFDFB9'
                                            />
                                            <path
                                                d='M27.961 25.0229L23.9707 25.0229C23.5109 25.0229 23.1381 25.2002 23.1381 25.66C23.0505 26.4724 24.7342 27.4343 25.9892 27.4343C26.5976 27.4343 27.2887 27.4343 27.6697 27.4341C27.8561 27.4341 28.0347 27.508 28.1682 27.6415L28.175 27.6483C28.3951 27.8685 28.4398 28.3395 28.2839 28.6089L26.6909 29.7455H26.0364L25.0182 29.7455L20.2182 29.7455C20.743 30.4027 23.2621 31.7334 23.4627 31.9887C23.6858 32.2726 24.0156 32.3752 24.375 32.4092L27.6651 32.7974C28.1394 32.8422 28.6158 32.74 29.0302 32.5049C29.9583 31.9784 31.6677 31.1148 32.4477 30.8716L35.1295 30.8716L35.1295 26.2286L33.8382 26.2286C33.5955 26.2286 33.3568 26.1673 33.1442 26.0503L31.3417 25.1559C30.7728 24.8776 30.1358 24.7687 29.5067 24.8422L27.961 25.0229Z'
                                                fill='#FCD7C3'
                                            />
                                            <path
                                                d='M29.5067 24.8423L27.961 25.0229L23.9708 25.0229C23.5109 25.0229 23.1382 25.2002 23.1382 25.66C23.1059 25.9586 23.3131 26.2774 23.6504 26.5613C24.1443 26.977 24.7761 27.1929 25.4217 27.1929L27.961 27.1929L29.5067 27.0122C30.1358 26.9387 30.7727 27.0476 31.3417 27.3259L33.1442 28.2203C33.3568 28.3373 33.5955 28.3987 33.8382 28.3987L35.1295 28.3987L35.1295 26.2287L33.8382 26.2287C33.5955 26.2287 33.3568 26.1673 33.1442 26.0503L31.3417 25.1559C30.7727 24.8776 30.1357 24.7688 29.5067 24.8423Z'
                                                fill='#FFCDAC'
                                            />
                                            <path
                                                d='M36.2489 25.8624L36.2489 31.2362C36.2489 31.4354 36.0874 31.5968 35.8883 31.5968L34.9426 31.5968C34.7434 31.5968 34.582 31.4354 34.582 31.2362L34.582 25.8623C34.582 25.6632 34.7434 25.5017 34.9426 25.5017L35.8883 25.5018C36.0874 25.5017 36.2489 25.6632 36.2489 25.8624Z'
                                                fill='#464C50'
                                            />
                                            <path
                                                d='M34.582 25.8624L34.582 27.685L36.2489 27.685L36.2489 25.8624C36.2489 25.6632 36.0875 25.5018 35.8883 25.5018L34.9427 25.5018C34.7435 25.5018 34.582 25.6632 34.582 25.8624Z'
                                                fill='#33393A'
                                            />
                                        </svg>
                                    </div>
                                    <p>Thanh toán khi giao hàng (COD)</p>
                                </div>
                            </div>
                            <div className='checkouts_left_footer'>
                                <Link to='/cart'>Giỏ hàng</Link>
                                <div
                                    className={`checkouts_left_footer_btn ${
                                        state.cartProducts && state.cartProducts.length > 0
                                            ? ''
                                            : 'disabled'
                                    }`}
                                    onClick={() => handleCheckouts()}
                                >
                                    <button>Hoàn tất đơn hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className='checkouts_right'>
                            <h3 className='checkouts_right_title'>Sản phẩm trong giỏ</h3>
                            <div className='checkouts_right_product'>
                                {state.cartProducts && state.cartProducts.length > 0 ? (
                                    state.cartProducts.map((product, index) => (
                                        <div className='checkouts_right_product_item' key={index}>
                                            <div className='checkouts_right_product_img'>
                                                <img
                                                    src={imgUrl + product.productImg}
                                                    alt='product image'
                                                />
                                                <div className='checkouts_right_product_quantity'>
                                                    {product.quantity}
                                                </div>
                                            </div>
                                            <div className='checkouts_right_product_info'>
                                                <h5>{product.productName}</h5>
                                                <p>{product.size}</p>
                                            </div>
                                            <div className='checkouts_right_product_price'>
                                                {numberWithComas(product.productPrice)}
                                                <sup>đ</sup>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>chưa có sản phẩm nào trong giỏ hàng</div>
                                )}
                            </div>
                            <div className='checkouts_right_discount'>
                                <input
                                    className='checkouts_right_discount_input'
                                    type='text'
                                    placeholder='Mã giảm giá'
                                />
                                <button className='checkouts_right_discount_btn'>Sử dụng</button>
                            </div>
                            <div className='checkouts_right_price'>
                                <div className='checkouts_right_price_box'>
                                    <p>Tạm tính</p>
                                    <div className='checkouts_right_price_box_number'>
                                        {numberWithComas(totalPrice)}
                                        <sup>đ</sup>
                                    </div>
                                </div>
                                <div className='checkouts_right_price_box'>
                                    <p>Phí vận chuyển</p>
                                    <div className='checkouts_right_price_box_number'>
                                        30,000<sup>đ</sup>
                                    </div>
                                </div>
                            </div>
                            <div className='checkouts_right_total'>
                                <p>Tổng cộng</p>
                                <div className='checkouts_right_total_number'>
                                    <span>VND</span>
                                    {numberWithComas(totalPrice + 30000)}
                                    <sup>đ</sup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Checkouts;
