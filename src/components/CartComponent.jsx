import {Link} from 'react-router-dom';
import {memo} from 'react';
import {BsCart2} from 'react-icons/bs';
import {IoCloseOutline} from 'react-icons/io5';

import {useStore} from '../store';
import {updateProductCartAction,updateProductQuantity} from '../store/actions.js';
import numberWithComas from '../utils/numberWithComas.js';
import handleTotalPrice from '../utils/handleTotalPrice';

const imgUrl = process.env.REACT_APP_IMG_URL;

const CartComponent = (props) => {
    const [state,dispatch] = useStore();

    const totalPrice = handleTotalPrice(state.cartProducts);

    // delete product in cart
    const deleteCartProduct = (index) => {
        const newProductCart = state.cartProducts
        newProductCart.splice(index, 1);
        localStorage.setItem('CART_PRODUCTS', JSON.stringify(newProductCart));
        dispatch(updateProductCartAction(index));
    }

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
        <div className='cart-component'>
            <h3 className='cart-component_title'>GIỎ HÀNG</h3>
            <div className='cart-component_body'>
                {state.cartProducts.length > 0 ? (
                    <div className='cart-component_body_product'>
                        {state.cartProducts.map((product, index) => (
                            <div className='cart-component_body_product_item' key={index}>
                                <div className='cart-component_body_product_item_img'>
                                    <Link to={`/products/${product.productSlug}`}>
                                        <img src={imgUrl + product.productImg} alt='product cart img' />
                                    </Link>
                                </div>
                                <div className='cart-component_body_product_item_info'>
                                    <Link to={`/products/${product.productSlug}`}>
                                        <h5>{product.productName}</h5>
                                    </Link>
                                    <p>{product.size}</p>
                                    <div className='cart-component_body_product_item_order'>
                                        <div className='cart-component_body_product_item_quantity'>
                                            <button onClick={() => handleUpdateQuantity(index,'-')}>
                                                <i className="bi bi-dash"></i>
                                            </button>
                                            <div className='cart-component_body_product_item_quantity_number'>
                                                {product.quantity}
                                            </div>
                                            <button onClick={() => handleUpdateQuantity(index,'+')}>
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                        <div className='cart-component_body_product_item_price'>
                                            {numberWithComas(product.productPrice)} <sup>đ</sup>
                                        </div>
                                        <div className='cart-component_body_product_item_delete' onClick={() => deleteCartProduct(index)}>
                                            <IoCloseOutline size={18}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <BsCart2 size={42} />
                        <div className='cart-component_body_text'>Hiện chưa có sản phẩm</div>
                    </>
                )}
            </div>
            <div className='cart-component_footer'>
                <div className='cart-component_footer_total'>
                    <div className='cart-component_footer_total_text'>TỔNG TIỀN:</div>
                    <div className='cart-component_footer_total_price'>
                        {numberWithComas(totalPrice)}
                        <sup>đ</sup>
                    </div>
                </div>
                <div className='cart-component_footer_button'>
                    <Link to='/cart'>XEM GIỎ HÀNH</Link>
                </div>
            </div>
        </div>
    );
};

CartComponent.propTypes = {};

export default memo(CartComponent);
