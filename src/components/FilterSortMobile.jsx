import PropTypes from 'prop-types';
import {useRef} from 'react';
import {FiFilter} from 'react-icons/fi';
import {VscChromeClose} from 'react-icons/vsc';
import {GiCheckMark} from 'react-icons/gi';
import {GoCheck} from 'react-icons/go';
import {memo} from 'react';

import Grid from './Grid';

import {sortList} from '../asset/data/constants.js';
import {productColors, productSizes} from '../asset/data/constants.js';

const FilterSortMobile = (props) => {
    const filterSortMobile = useRef(null);

    const checkFilter = (value, type) => {
        switch (type) {
            case 'color':
                const checkColor = props.filterColors.findIndex((e) => e == value);
                if (checkColor == -1) {
                    return false;
                }
                return true;
                break;
            case 'size':
                const checkSize = props.filterSizes.findIndex((e) => e == value);
                if (checkSize == -1) {
                    return false;
                }
                return true;
                break;

            default:
                break;
        }
    };

    // close Filter Sort Mobile
    const closeFilterSortMobile = () => {
        if (filterSortMobile.current != null) {
            filterSortMobile.current.classList.remove('show');
        }
    };

    // handle cancel filter list
    const cancelFilterList = () => {
        props.onEmptyFilterList();
        closeFilterSortMobile();
    }

    return (
        <div className='filter-sort-mobile' ref={filterSortMobile}>
            <div className='filter-sort-mobile_header'>
                <div className='filter-sort-mobile_header_title'>
                    <FiFilter size={22} />
                    <span>BỘ LỌC</span>
                </div>
                <div
                    className='filter-sort-mobile_header_close'
                    onClick={() => closeFilterSortMobile()}
                >
                    <VscChromeClose size={22} />
                </div>
            </div>
            <div className='filter-sort-mobile_body'>
                <div className='filter-sort-mobile_sort'>
                    <h5 className='filter-sort-mobile_title'>Sắp xếp</h5>
                    <ul className='filter-sort-mobile_sort_list'>
                        {sortList.map((item, index) => (
                            <li
                                className='filter-sort-mobile_sort_item'
                                key={index}
                                onClick={() => props.onSetSortIndex(index)}
                            >
                                <div
                                    className={`filter-sort-mobile_sort_item_icon ${
                                        props.sortIndex == index ? 'active' : ''
                                    }`}
                                >
                                    {props.sortIndex == index ? <GoCheck size={15} /> : null}
                                </div>
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='filter-sort-mobile_color'>
                    <h5 className='filter-sort-mobile_title'>Màu sắc</h5>
                    <ul className='filter-sort-mobile_color_list'>
                        {productColors.map((item, index) => (
                            <li
                                className={`filter-sort-mobile_color_item ${
                                    checkFilter(item.name, 'color') ? 'active' : ''
                                } bg-${item.color}`}
                                key={index}
                                onClick={() => props.onSetFilter(item.name, 'color')}
                            >
                                {checkFilter(item.name, 'color') ? <GiCheckMark size={15} /> : null}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='filter-sort-mobile_size'>
                    <h5 className='filter-sort-mobile_title'>Kích thước</h5>
                    <ul className='filter-sort-mobile_size_list'>
                        {productSizes.map((item, index) => (
                            <li
                                className='filter-sort-mobile_size_item'
                                key={index}
                                onClick={() => props.onSetFilter(item, 'size')}
                            >
                                <div
                                    className={`filter-sort-mobile_size_item_icon ${
                                        checkFilter(item, 'size') ? 'active' : ''
                                    }`}
                                >
                                    {checkFilter(item, 'size') ? <GoCheck size={15} /> : null}
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='filter-sort-mobile_btn'>
                    <Grid col={2} gap={10}>
                        <button
                            className='filter-sort-mobile_btn_item'
                            onClick={() => cancelFilterList()}
                        >
                            HUỶ LỌC
                        </button>
                        <button
                            className='filter-sort-mobile_btn_item'
                            onClick={() => closeFilterSortMobile()}
                        >
                            ÁP DỤNG
                        </button>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

FilterSortMobile.propTypes = {
    onSetFilter:PropTypes.func,
    onSetSortIndex:PropTypes.func,
    filterColors:PropTypes.array,
    filterSizes:PropTypes.array,
    sortIndex:PropTypes.number,
    onEmptyFilterList:PropTypes.func,
};

export default memo(FilterSortMobile);
