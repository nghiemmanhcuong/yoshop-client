import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {FiChevronsLeft, FiChevronsRight} from 'react-icons/fi';

const Pagination = (props) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        for (let i = 1; i <= props.pages; i++) {
            pages.push(i);
        }
        setPages(Array.from(new Set(pages)));
    }, [props.pages]);

    return (
        <nav className='pagination'>
            <ul className='pagination_list'>
                <li className={`pagination_list_item ${props.currPage == 1 ? 'disabled' : ''}`}>
                    <FiChevronsLeft />
                </li>
                {pages.map((page) => (
                    <li
                        className={`pagination_list_item ${page == props.currPage ? 'active' : ''}`}
                        key={page}
                        onClick={() => props.onSetCurrentPage(page)}
                    >
                        {page}
                    </li>
                ))}
                <li
                    className={`pagination_list_item ${
                        props.currPage == props.pages ? 'disabled' : ''
                    }`}
                >
                    <FiChevronsRight />
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    pages: PropTypes.number.isRequired,
    currPage: PropTypes.number.isRequired,
    onSetCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
