import {BsSearch} from 'react-icons/bs';
import {GoArrowSmallLeft} from 'react-icons/go';
import {useState, useEffect,useRef} from 'react';
import {useNavigate,useParams} from 'react-router-dom';

import Helmet from '../components/Helmet';
import ProductsComponent from '../components/ProductsComponent';

import productApi from '../api/productApi.js';

const Search = () => {
    const navigate = useNavigate();
    const params = useParams();

    const  searchBtnRef = useRef(null);
    const [keywordInput, setKeywordInput] = useState('');
    const [resultProducts, setResultProducts] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await productApi.getProductByKeyWord({keyword: params.keyword ? params.keyword : ''});
                if (response.success) {
                    setResultProducts(response.data);
                }
            } catch (error) {
                console.log('Feiled to fetch api get product!', error);
            }
        };
        getProduct();
    }, [params]);

    const handleBack = () => {
        navigate('/search');
        setResultProducts([]);
    }

    return (
        <Helmet title='Tìm kiếm'>
            <div className='search'>
                <div className='container'>
                    <div className='search_header'>
                        <h1 className='search_header_title'>Tìm kiếm</h1>
                        {resultProducts.length > 0 && (
                            <p className='search_header_text'>
                                Có <span>{resultProducts.length} sản phẩm</span> cho tìm kiếm
                            </p>
                        )}
                        <div className='search_header_hr'></div>
                    </div>
                    <div className='search_product'>
                        {resultProducts.length > 0 ? (
                            <div className='search_product_container'>
                                <div className='search_product_text'>
                                    <div className='search_product_text_back' onClick={() => handleBack()}>
                                        <GoArrowSmallLeft />
                                        Trở về
                                    </div>
                                    Kết quả tìm kiếm cho <span>"{params.keyword ? params.keyword : ''}"</span>.
                                </div>
                                <ProductsComponent data={resultProducts} />
                            </div>
                        ) : (
                            <div className='search_product_empty'>
                                <h5 className='search_product_empty_title'>
                                    Không tìm thấy nội dung bạn yêu cầu
                                </h5>
                                <p className='search_product_empty_desc'>
                                    Không tìm thấy <span>"{params.keyword ? params.keyword : ''}"</span>. Vui lòng kiểm tra chính tả, sử
                                    dụng các từ tổng quát hơn và thử lại!
                                </p>
                            </div>
                        )}
                    </div>
                    <div className='search_empty'>
                        {resultProducts.length == 0 && (
                            <div className='search_empty_form'>
                                <input
                                    className='search_empty_form_input'
                                    type='text'
                                    placeholder='Tìm kiếm'
                                    value={keywordInput}
                                    onChange={(e) => setKeywordInput(e.target.value)}
                                />
                                <div
                                    className='search_empty_form_btn'
                                    onClick={() => navigate(`/search/${keywordInput}`)}
                                    ref={searchBtnRef}
                                >
                                    <BsSearch size={20} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Search;
