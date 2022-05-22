import {Link} from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb';
import Helmet from '../components/Helmet';

import {useStore} from '../store';
import {updateProductCartAction,updateProductQuantity} from '../store/actions.js';
import numberWithComas from '../utils/numberWithComas';
import handleTotalPrice from '../utils/handleTotalPrice';

const imgUrl = process.env.REACT_APP_IMG_URL;

const Cart = () => {
    const [state, dispatch] = useStore();

    const total = handleTotalPrice(state.cartProducts);

    // delete product in cart
    const deleteCartProduct = (index) => {
        const newProductCart = state.cartProducts;
        newProductCart.splice(index, 1);
        localStorage.setItem('CART_PRODUCTS', JSON.stringify(newProductCart));
        dispatch(updateProductCartAction());
    };

    // update quantity product in cart
    const handleUpdateQuantity = (index,type) => {
        const newProductCart  = JSON.parse(localStorage.getItem('CART_PRODUCTS'));
        if(type == '+'){
            newProductCart[index].quantity++;
        }

        if(type == '-'){
            if(newProductCart[index].quantity <= 1){
                newProductCart[index].quantity = 1;
            }else {
                newProductCart[index].quantity--;
            }
        }
        localStorage.setItem('CART_PRODUCTS', JSON.stringify(newProductCart));
        dispatch(updateProductQuantity(newProductCart));
    }

    return (
        <Helmet title='Giỏ Hàng'>
            <div className='cart'>
                <div className='container'>
                    <Breadcrumb title={`Giỏ hàng(${state.cartProducts.length})`} />
                    <div className='cart_container'>
                        <div className='cart_body'>
                            <h1 className='cart_body_title'>Giỏ hàng của bạn</h1>
                            <div className='cart_body_content'>
                                {state.cartProducts.length > 0 ? (
                                    <div className='cart_body_product'>
                                        <div className='cart_body_product_text'>
                                            Bạn đang có{' '}
                                            <span>{state.cartProducts.length} sản phẩm</span> trong
                                            giỏ hàng
                                        </div>
                                        <div className='cart_body_product_list'>
                                            {state.cartProducts.map((product, index) => (
                                                <div className='cart_body_product_item' key={index}>
                                                    <div className='cart_body_product_item_img'>
                                                        <Link to={`/products/${product.productSlug}`}>
                                                            <img
                                                                src={imgUrl + product.productImg}
                                                                alt='product cart image'
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className='cart_body_product_item_info'>
                                                        <h5 className='cart_body_product_item_name'>
                                                            <Link to={`/products/${product.productSlug}`}>
                                                                {product.productName}
                                                            </Link>
                                                        </h5>
                                                        <p className='cart_body_product_item_size'>
                                                            {product.size}
                                                        </p>
                                                        <div className='cart_body_product_item_price'>
                                                            <div className='cart_body_product_item_price_new'>
                                                                {numberWithComas(
                                                                    product.productPrice,
                                                                )}
                                                                <sup>đ</sup>
                                                            </div>
                                                            {product.productOldPrice > 0 ? (
                                                                <div className='cart_body_product_item_price_old'>
                                                                    {numberWithComas(
                                                                        product.productOldPrice,
                                                                    )}
                                                                    <sup>đ</sup>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className='cart_body_product_item_quantity'>
                                                        <div className='cart_body_product_item_quantity_price'>
                                                            {numberWithComas(product.productPrice)}
                                                            <sup>đ</sup>
                                                        </div>
                                                        <div className='cart_body_product_item_quantity_change'>
                                                            <button onClick={ () => handleUpdateQuantity(index,'-')}>
                                                                -
                                                            </button>
                                                            <p>{product.quantity}</p>
                                                            <button onClick={ () => handleUpdateQuantity(index,'+')}>
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='cart_body_product_item_delete'
                                                        onClick={() => deleteCartProduct(index)}
                                                    >
                                                        Xoá
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='cart_body_content_empty'>
                                        Giỏ hàng của bạn đang trống
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='cart_sitebar'>
                            <div className='cart_sitebar_content'>
                                <h3 className='cart_sitebar_title'>Thông tin đơn hàng</h3>
                                <div className='cart_sitebar_total'>
                                    <p className='cart_sitebar_total_text'>Tổng tiền:</p>
                                    <div className='cart_sitebar_total_price'>
                                        {numberWithComas(total)}
                                        <sup>đ</sup>
                                    </div>
                                </div>
                                <ul className='cart_sitebar_info'>
                                    <li className='cart_sitebar_info_item'>
                                        <div className='cart_sitebar_info_item_dot'></div>
                                        <p className='cart_sitebar_info_item_text'>
                                            Phí vận chuyển sẽ được tính ở trang thanh toán.
                                        </p>
                                    </li>
                                    <li className='cart_sitebar_info_item'>
                                        <div className='cart_sitebar_info_item_dot'></div>
                                        <p className='cart_sitebar_info_item_text'>
                                            Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                                        </p>
                                    </li>
                                </ul>
                                {state.cartProducts.length == 0 && (
                                    <div className='cart_sitebar_warning'>
                                        Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để thanh toán.
                                    </div>
                                )}
                                <Link
                                    to='/checkouts'
                                    className={`cart_sitebar_btn ${
                                        state.cartProducts.length > 0 ? 'active' : ''
                                    }`}
                                >
                                    THANH TOÁN
                                </Link>
                            </div>
                            <div className='cart_sitebar_policy'>
                                <h5 className='cart_sitebar_policy_title'>Chính sách mua hàng</h5>
                                <p className='cart_sitebar_policy_desc'>
                                    Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá trị
                                    tối thiểu <span>0₫</span> trở lên.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Cart;
