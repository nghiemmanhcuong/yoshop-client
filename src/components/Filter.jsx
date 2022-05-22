import PropTypes from 'prop-types';
import {FiFilter} from 'react-icons/fi';
import {GoChevronDown, GoCheck} from 'react-icons/go';
import {GiCheckMark} from 'react-icons/gi';

import {productColors, productSizes} from '../asset/data/constants.js';

import Grid from './Grid';

const Filter = (props) => {
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

    return (
        <div className='filter'>
            <div className='filter_title'>
                <FiFilter size={20} />
                <span>BỘ LỌC</span>
            </div>
            <div className='filter_list'>
                <div className='filter_list_item'>
                    <div className='filter_list_item_header'>
                        <span>Màu sắc</span>
                        <GoChevronDown size={16} />
                    </div>
                    <div className='filter_list_item_body'>
                        <Grid col={5} gap={10}>
                            {productColors.map((item, index) => (
                                <div
                                    key={index}
                                    className={`filter_list_item_body_item ${
                                        checkFilter(item.name, 'color') ? 'checked' : ''
                                    } bg-${item.color}`}
                                    onClick={() => props.onSetFilter(item.name, 'color')}
                                >
                                    {checkFilter(item.name, 'color') ? <GiCheckMark /> : null}
                                </div>
                            ))}
                        </Grid>
                    </div>
                </div>
                <div className='filter_list_item'>
                    <div className='filter_list_item_header'>
                        <span>Kích thước</span>
                        <GoChevronDown size={16} />
                    </div>
                    <div className='filter_list_item_body'>
                        {productSizes.map((item, index) => (
                            <div
                                key={index}
                                className='filter_list_item_body_size'
                                onClick={() => props.onSetFilter(item, 'size')}
                            >
                                <div
                                    className={`filter_list_item_body_size_check ${
                                        checkFilter(item, 'size') ? 'checked' : ''
                                    }`}
                                >
                                    {checkFilter(item, 'size') ? <GoCheck /> : null}
                                </div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

Filter.propTypes = {};

export default Filter;
