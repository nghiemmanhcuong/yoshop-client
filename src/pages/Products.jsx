import {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {TiMinus, TiPlus} from 'react-icons/ti';
import parse from 'html-react-parser';

import ProductsComponent from '../components/ProductsComponent';
import Breadcrumb from '../components/Breadcrumb';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';

import {useStore} from '../store';
import {addProductToCartAction} from '../store/actions.js';
import productApi from '../api/productApi.js';
import numberWithComas from '../utils/numberWithComas.js';
import deliverly1 from '../asset/images/product_deliverly_1.png';
import deliverly2 from '../asset/images/product_deliverly_2_ico.png';
import deliverly3 from '../asset/images/product_deliverly_3.png';
import {colors} from '../asset/data/constants.js';

const imgUrl = process.env.REACT_APP_IMG_URL;

const Products = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const slug = params.slug;
    const [state, dispatch] = useStore();

    const errorMsg = useRef(null);
    const successMsg = useRef(null);

    const [product, setProduct] = useState({});
    const [productComments, setProductComments] = useState([]);
    const [productRelated, setProductRelated] = useState([]);
    const [productImgs, setProductImgs] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState({});
    const [chooseSize, setChooseSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [mainImg, setMainImg] = useState('');
    const [commentTitle, setCommentTitle] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [errorAddComment, setErrorAddComment] = useState('');
    const [successAddComment, setSuccessAddComment] = useState('');

    // effect actions
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.getProductDetail({slug: slug});
                if (response.success) {
                    setProduct(response.data);
                    setProductImgs(JSON.parse(response.data.images));
                    setMainImg(JSON.parse(response.data.images)[0]);
                    setProductSizes(JSON.parse(response.data.sizes));
                    setChooseSize(JSON.parse(response.data.sizes)[0]);
                    setTitle(response.data.name);
                    setCategory({
                        name: response.data.category_name,
                        slug: response.data.category_slug,
                    });
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.log('Feiled to fetch api get product!', error);
            }
        };

        fetchProduct();
        setErrorAddComment('');
        setSuccessAddComment('');
    }, [slug]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await productApi.getProductRelated({
                    category_id: Number(product.category_id),
                });
                if (response.success) {
                    setProductRelated(response.data);
                }
            } catch (error) {
                console.log('Feiled to fetch api get product!', error);
            }
        };

        const fecthProductComments = async () => {
            try {
                const response = await productApi.getProductComments({product_id: product.id});
                if (response.success) {
                    setProductComments(response.data);
                } else {
                    setProductComments([]);
                }
            } catch (error) {
                console.log('Feiled to fetch api get product comments!', error);
            }
        };
        fetchRelatedProducts();
        fecthProductComments();
    }, [product, slug]);

    // function handle

    // add to cart
    const addToCart = () => {
        const cartHeader = Array.from(document.getElementsByClassName('header_user_cart'));

        const cartItem = {
            productId: product.id,
            productName: product.name,
            productPrice: product.newPrice,
            productOldPrice: product.oldPrice,
            productImg: productImgs[0],
            productSlug: slug,
            size: chooseSize,
            quantity: quantity,
        };

        if (localStorage.getItem('CART_PRODUCTS')) {
            const cartProducts = JSON.parse(localStorage.getItem('CART_PRODUCTS'));

            const cartProductIndex = cartProducts.findIndex(
                (item) => item.productName == cartItem.productName && item.size == cartItem.size,
            );

            if (cartProductIndex > -1) {
                cartProducts[cartProductIndex].quantity += cartItem.quantity;
                localStorage.setItem('CART_PRODUCTS', JSON.stringify(cartProducts));
                dispatch(addProductToCartAction(cartProducts));
            } else {
                localStorage.setItem('CART_PRODUCTS', JSON.stringify([...cartProducts, cartItem]));
                dispatch(addProductToCartAction([...cartProducts, cartItem]));
            }
        } else {
            localStorage.setItem('CART_PRODUCTS', JSON.stringify([cartItem]));
            dispatch(addProductToCartAction([cartItem]));
        }

        if (cartHeader[0]) {
            cartHeader[0].classList.add('show');
        }
    };

    // handle add comment
    const handleAddcomment = async () => {
        if (!commentTitle || !commentContent) {
            setErrorAddComment('Vui lòng nhập đủ thông tin');
            if (errorMsg.current != null) {
                errorMsg.current.style.display = 'block';
            }
        } else {
            try {
                const commentData = {
                    userId: Number(state.user.userId),
                    productId: Number(product.id),
                    title: commentTitle,
                    content: commentContent,
                };
                const response = await productApi.addComment(commentData);
                if (response.success) {
                    setErrorAddComment('');
                    setSuccessAddComment(response.message);
                    if (successMsg.current != null) {
                        successMsg.current.style.display = 'block';
                    }
                } else {
                    setSuccessAddComment('');
                    setErrorAddComment(response.message);
                    if (errorMsg.current != null) {
                        errorMsg.current.style.display = 'block';
                    }
                }
            } catch (error) {
                console.log('Feiled to add comment api!', error);
            }
        }
    };

    // handle quantity
    const calculateQuantity = (opt) => {
        if (opt === '-') {
            setQuantity(quantity <= 1 ? 1 : quantity - 1);
        }

        if (opt == '+') {
            setQuantity(quantity + 1);
        }
    };

    // handle close message
    const handleCloseMsg = (e) => {
        e.target.parentElement.style.display = 'none';
    };

    return (
        <Helmet title={title}>
            <main className='products'>
                <div className='container'>
                    <Breadcrumb title={title} category={category} />
                    <section className='products_container'>
                        <div className='products_images'>
                            {mainImg ? (
                                <img
                                    className='products_images_main'
                                    src={imgUrl + mainImg}
                                    alt='product image'
                                />
                            ) : null}
                            {productImgs.length > 0 ? (
                                <div className='products_images_list'>
                                    {productImgs.map((item, index) => (
                                        <div
                                            className={`products_images_list_item ${
                                                item == mainImg ? 'active' : ''
                                            }`}
                                            key={index}
                                        >
                                            <img
                                                src={imgUrl + item}
                                                alt='product image'
                                                onClick={() => setMainImg(item)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        {Object.entries(product).length > 0 ? (
                            <div className='products_info'>
                                <h1 className='products_info_name'>{product.name}</h1>
                                <p className='products_info_status'>
                                    Tình trạng:{' '}
                                    <span>
                                        {product.status == 1 || Number(product.quantity) == 0
                                            ? 'Còn hàng'
                                            : 'Hết hàng'}
                                    </span>
                                </p>
                                <div className='products_info_price'>
                                    {product.oldPrice && product.oldPrice != 0 ? (
                                        <div className='products_info_price_old'>
                                            {numberWithComas(product.oldPrice)} <sup>đ</sup>
                                        </div>
                                    ) : null}
                                    {product.newPrice ? (
                                        <div className='products_info_price_new'>
                                            {numberWithComas(product.newPrice)} <sup>đ</sup>
                                        </div>
                                    ) : null}
                                </div>
                                <div className='products_info_size'>
                                    <span>Kích thước:</span>
                                    <div className='products_info_size_list'>
                                        {productSizes.length > 0
                                            ? productSizes.map((item, index) => (
                                                  <div
                                                      className={`products_info_size_list_item ${
                                                          item == chooseSize ? 'active' : ''
                                                      }`}
                                                      key={index}
                                                      onClick={() => setChooseSize(item)}
                                                  >
                                                      {item}
                                                      <svg
                                                          className='ico-check'
                                                          xmlns='http://www.w3.org/2000/svg'
                                                          width='15'
                                                          height='15'
                                                          viewBox='0 0 20 20'
                                                      >
                                                          <g fill='none' fillRule='evenodd'>
                                                              <g>
                                                                  <g>
                                                                      <g>
                                                                          <g>
                                                                              <g>
                                                                                  <g>
                                                                                      <g>
                                                                                          <path
                                                                                              fill='#252a2b'
                                                                                              d='M0 0h16c2.21 0 4 1.79 4 4v16L0 0z'
                                                                                              transform='translate(-804 -366) translate(180 144) translate(484 114) translate(16 80) translate(0 28) translate(124)'
                                                                                          ></path>
                                                                                          <g fill='#FFF'>
                                                                                              <path
                                                                                                  d='M4.654 7.571L8.88 3.176c.22-.228.582-.235.81-.016.229.22.236.582.017.81L5.04 8.825c-.108.113-.258.176-.413.176-.176 0-.33-.076-.438-.203L2.136 6.37c-.205-.241-.175-.603.067-.808.242-.204.603-.174.808.068L4.654 7.57z'
                                                                                                  transform='translate(-804 -366) translate(180 144) translate(484 114) translate(16 80) translate(0 28) translate(124) translate(7.5)'
                                                                                              ></path>
                                                                                          </g>
                                                                                      </g>
                                                                                  </g>
                                                                              </g>
                                                                          </g>
                                                                      </g>
                                                                  </g>
                                                              </g>
                                                          </g>
                                                      </svg>
                                                  </div>
                                              ))
                                            : null}
                                    </div>
                                </div>
                                <div className='products_info_order'>
                                    <div className='products_info_order_quantity'>
                                        <button
                                            className='products_info_order_quantity_btn'
                                            onClick={() => calculateQuantity('-')}
                                        >
                                            <TiMinus />
                                        </button>
                                        <div className='products_info_order_quantity_number'>
                                            {quantity}
                                        </div>
                                        <button
                                            className='products_info_order_quantity_btn'
                                            onClick={() => calculateQuantity('+')}
                                        >
                                            <TiPlus />
                                        </button>
                                    </div>
                                    <div className='products_info_order_buy'>
                                        <button
                                            className={`products_info_order_buy_btn ${
                                                product.status != 1 ? 'disabled' : ''
                                            }`}
                                            onClick={addToCart}
                                        >
                                            {product.status == 1
                                                ? 'Thêm vào giỏ'
                                                : 'Sản phẩm tạm thời hết hàng'}
                                        </button>
                                    </div>
                                </div>
                                <div className='products_info_desc'>
                                    <h5 className='products_info_desc_title'>
                                        THÔNG TIN SẢN PHẨM:
                                    </h5>
                                    <p
                                        className='products_info_desc_content'
                                        dangerouslySetInnerHTML={{
                                            __html: parse(
                                                product.description ? product.description : '',
                                            ),
                                        }}
                                    ></p>
                                </div>
                                <div className='products_info_deliverly'>
                                    <h5 className='products_info_deliverly_title'>
                                        CÓ THỂ BẠN CHƯA BIẾT:
                                    </h5>
                                    <div className='products_info_deliverly_list'>
                                        <div className='products_info_deliverly_list_item'>
                                            <img
                                                className='products_info_deliverly_list_item_icon'
                                                src={deliverly1}
                                                alt='product deliverly icon'
                                            />
                                            <p className='products_info_deliverly_list_item_text'>
                                                Cam kết 100% chính hãng Local Brand 8YO
                                            </p>
                                        </div>
                                        <div className='products_info_deliverly_list_item'>
                                            <img
                                                className='products_info_deliverly_list_item_icon'
                                                src={deliverly2}
                                                alt='product deliverly icon'
                                            />
                                            <p className='products_info_deliverly_list_item_text'>
                                                Giao hàng dự kiến:
                                                <span>Từ 3-5 ngày từ lúc đặt hàng</span>
                                            </p>
                                        </div>
                                        <div className='products_info_deliverly_list_item'>
                                            <img
                                                className='products_info_deliverly_list_item_icon'
                                                src={deliverly3}
                                                alt='product deliverly icon'
                                            />
                                            <p className='products_info_deliverly_list_item_text'>
                                                Nhận đơn online 24/7
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </section>
                    <section className='products_comment section'>
                        <h3 className='products_comment_title'>Bình luận bài viết</h3>
                        <div className='products_comment_container'>
                            {state.user != null ? (
                                <div className='products_comment_form'>
                                    <h5 className='products_comment_body_title'>Viết bình luận</h5>
                                    {errorAddComment != '' && (
                                        <div className='account_form_error' ref={errorMsg}>
                                            {errorAddComment}
                                            <div
                                                className='account_form_error_icon'
                                                onClick={(e) => handleCloseMsg(e)}
                                            >
                                                X
                                            </div>
                                        </div>
                                    )}
                                    {successAddComment != '' && (
                                        <div className='account_form_success' ref={successMsg}>
                                            {successAddComment}
                                            <div
                                                className='account_form_error_icon'
                                                onClick={(e) => handleCloseMsg(e)}
                                            >
                                                X
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        className='products_comment_form_input'
                                        type='text'
                                        placeholder='Tiêu đề'
                                        value={commentTitle}
                                        onChange={(e) => setCommentTitle(e.target.value)}
                                    />
                                    <textarea
                                        className='products_comment_form_input'
                                        cols='30'
                                        rows='3'
                                        placeholder='Nội dung bình luận'
                                        onChange={(e) => setCommentContent(e.target.value)}
                                    ></textarea>
                                    <div
                                        className='products_comment_form_btn'
                                        onClick={() => handleAddcomment()}
                                    >
                                        <button>Gửi bình luận</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='products_comment_form_not-user'>
                                    Vui lòng đăng nhập để bình luận về sản phẩm
                                    <Link to='/account/login'>Đăng nhập</Link>
                                </div>
                            )}

                            <div className='products_comment_list'>
                                <h5 className='products_comment_body_title'>Tất cả bình luận</h5>
                                {productComments.length > 0 ? (
                                    <div className='products_comment_list_wap'>
                                        {productComments.map((comment, index) => (
                                            <div className='products_comment_item'>
                                                <div className='products_comment_item_info'>
                                                    <div
                                                        className={`products_comment_item_avatar bg-${
                                                            index <= colors.length
                                                                ? colors[index]
                                                                : 'yellow'
                                                        }`}
                                                    >
                                                        {comment.userName[0]}
                                                    </div>
                                                    <p className='products_comment_item_name'>
                                                        {comment.userName}
                                                    </p>
                                                </div>
                                                <div className='products_comment_item_content'>
                                                    <h5 className='products_comment_item_title'>
                                                        {comment.title}
                                                    </h5>
                                                    <p className='products_comment_item_desc'>
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='products_comment_list_empty'>
                                        Chưa có bình luận nào cho sản phẩm này!!!
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                    <section className='products_related section'>
                        <h3 className='products_related_title'>Có thể bạn xẽ thích</h3>
                        <div className='products_related_container'>
                            {productRelated.length > 0 ? (
                                <ProductsComponent data={productRelated} />
                            ) : (
                                <Loading />
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </Helmet>
    );
};

export default Products;
