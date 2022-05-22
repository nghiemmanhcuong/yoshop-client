import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {AiOutlineSortAscending} from 'react-icons/ai';
import {GoChevronDown} from 'react-icons/go';
import {GiCheckMark} from 'react-icons/gi';
import {FiFilter} from 'react-icons/fi';
import {VscChromeClose} from 'react-icons/vsc';

import Breadcrumb from '../components/Breadcrumb';
import Filter from '../components/Filter';
import ProductsComponent from '../components/ProductsComponent';
import Pagination from '../components/Pagination';
import Helmet from '../components/Helmet';
import FilterSortMobile from '../components/FilterSortMobile';

import productApi from '../api/productApi.js';
import categoryApi from '../api/categoryApi.js';
import {sortList} from '../asset/data/constants.js';

const Collections = () => {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [sortIndex, setSortIndex] = useState(5);
    const [filterColors, setFilterColors] = useState([]);
    const [filterSizes, setFilterSizes] = useState([]);
    const [pages, setPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);

    // set title
    useEffect(() => {
        if (params.slug == 'all') {
            setTitle('Tất cả sản phẩm');
        } else {
            setTitle(category.name);
        }

        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [params.slug, currPage]);

    // get products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (params.slug == 'all') {
                    const response = await productApi.getAllProduct({
                        limit: 24,
                        colors: filterColors,
                        sizes: filterSizes,
                        sort: sortList[sortIndex].value,
                        page: currPage,
                    });
                    setProducts(response.data);
                    setPages(response.pages);
                } else {
                    const response = await productApi.getProductsByCategory({
                        category_slug: params.slug,
                        limit: 24,
                        colors: filterColors,
                        sizes: filterSizes,
                        sort: sortList[sortIndex].value,
                        page: currPage,
                    });
                    setProducts(response.data);
                    setPages(response.pages);
                }
            } catch (error) {
                console.log('Feiled to fetch api get all product!', error);
            }
        };
        fetchProducts();
    }, [params.slug, filterColors, filterSizes, sortIndex, currPage]);

    // get category by slug
    useEffect(() => {
        const fecthCategory = async () => {
            try {
                if (params.slug != 'all') {
                    const response = await categoryApi.getCategoryBySlug({slug: params.slug});
                    setCategory(response);
                    setTitle(response.name);
                }
            } catch (error) {
                console.log('Feiled to fetch api get category!', error);
            }
        };
        fecthCategory();
    }, [params.slug]);

    // set filter list
    const setFilterList = (value, type) => {
        switch (type) {
            case 'color':
                const colorIndex = filterColors.findIndex((color) => color === value);

                if (colorIndex != -1) {
                    const colorArr = filterColors.filter((color) => {
                        return color != value;
                    });
                    setFilterColors(colorArr);
                } else {
                    setFilterColors([...filterColors, value]);
                }
                break;
            case 'size':
                const sizeIndex = filterSizes.findIndex((size) => size === value);

                if (sizeIndex != -1) {
                    const sizeArr = filterSizes.filter((size) => {
                        return size != value;
                    });
                    setFilterSizes(sizeArr);
                } else {
                    setFilterSizes([...filterSizes, value]);
                }
                break;

            default:
                break;
        }
    };

    // handle Show Filter Sort Mobile
    const handleShowFilterSortMobile = () => {
        const filterSortMobile = Array.from(document.getElementsByClassName('filter-sort-mobile'));
        if (filterSortMobile && filterSortMobile.length > 0) {
            filterSortMobile[0].classList.add('show');
        }
    };

    // hande empty filter list
    const emptyFilterList = () => {
        setFilterSizes([]);
        setFilterColors([]);
    };

    return (
        <Helmet title={title ? title : ''}>
            <div className='collections'>
                <div className='container'>
                    <Breadcrumb title={title ? title : ''} />
                    <div className='collections_container'>
                        <div className='collections_header'>
                            <h1 className='collections_header_title'>{title}</h1>
                            <div className='collections_header_sort'>
                                <div className='collections_header_sort_header'>
                                    <div className='collections_header_sort_header_text'>
                                        <AiOutlineSortAscending size={17} />
                                        <span>Sắp xếp</span>
                                    </div>
                                    <div className='collections_header_sort_header_icon'>
                                        <GoChevronDown size={17} />
                                    </div>
                                </div>
                                <ul className='collections_header_sort_body'>
                                    {sortList.map((item, index) => (
                                        <li
                                            className='collections_header_sort_body_item'
                                            key={index}
                                            data-value={item.value}
                                            onClick={() => setSortIndex(index)}
                                        >
                                            {sortIndex == index ? <GiCheckMark size={12} /> : null}
                                            <span>{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div
                                className='collections_header_sort_mb'
                                onClick={() => handleShowFilterSortMobile()}
                            >
                                <span>Bộ lọc</span>
                                <FiFilter size={15} />
                            </div>
                        </div>
                        <div className='collections_filter'>
                            <Filter
                                onSetFilter={setFilterList}
                                filterColors={filterColors}
                                filterSizes={filterSizes}
                            />
                        </div>
                        <div className='collections_filter-list'>
                            {filterColors.length > 0 && (
                                <div className='collections_filter-list_item'>
                                    <p className='collections_filter-list_title'>Màu sắc:</p>
                                    <ul>
                                        {filterColors.map((color, index) => (
                                            <li key={index}>
                                                {index != 0 && ','}
                                                {color}
                                            </li>
                                        ))}
                                    </ul>
                                    <div
                                        className='collections_filter-list_delete'
                                        onClick={() => setFilterColors([])}
                                    >
                                        <VscChromeClose />
                                    </div>
                                </div>
                            )}
                            {filterSizes.length > 0 && (
                                <div className='collections_filter-list_item'>
                                    <p className='collections_filter-list_title'>Kích thước:</p>
                                    <ul>
                                        {filterSizes.map((size, index) => (
                                            <li key={index}>
                                                {index != 0 && ','}
                                                {size}
                                            </li>
                                        ))}
                                    </ul>
                                    <div
                                        className='collections_filter-list_delete'
                                        onClick={() => setFilterSizes([])}
                                    >
                                        <VscChromeClose size={14} />
                                    </div>
                                </div>
                            )}
                            {filterSizes.length > 0 && filterColors.length > 0 && (
                                <div
                                    className='collections_filter-list_delete-all'
                                    onClick={() => emptyFilterList()}
                                >
                                    Xoá hết
                                </div>
                            )}
                        </div>
                        <div className='collections_products'>
                            {products != null && products.length > 0 ? (
                                <ProductsComponent data={products} />
                            ) : (
                                <div>Không tìm thấy sản phẩm nào phù hợp</div>
                            )}
                        </div>
                    </div>
                    {products != null && products.length > 0 ? (
                        <Pagination
                            pages={pages}
                            currPage={currPage}
                            onSetCurrentPage={setCurrPage}
                        />
                    ) : null}
                </div>
                <FilterSortMobile
                    onSetFilter={setFilterList}
                    onSetSortIndex={setSortIndex}
                    filterColors={filterColors}
                    filterSizes={filterSizes}
                    sortIndex={sortIndex}
                    onEmptyFilterList={emptyFilterList}
                />
            </div>
        </Helmet>
    );
};

export default Collections;
