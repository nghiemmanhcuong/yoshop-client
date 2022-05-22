import {FiSearch} from 'react-icons/fi';
import {VscChromeClose} from 'react-icons/vsc';
import {Link, useNavigate} from 'react-router-dom';
import {useRef, useState} from 'react';

import {menuNav} from '../asset/data/constants.js';

const MobileMenu = () => {
    const navigate = useNavigate();
    const mobileMenu = useRef(null);

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleCloseMobileMenu = () => {
        if (mobileMenu.current != null) {
            mobileMenu.current.classList.remove('show');
        }
    };

    const handleSearch = () => {
        handleCloseMobileMenu();
        navigate(`/search/${searchKeyword}`);
    }

    return (
        <div className='mobile-menu' ref={mobileMenu}>
            <form className='mobile-menu_form'>
                <input
                    className='mobile-menu_form_input'
                    type='text'
                    placeholder='Tìm kiếm sản phẩm...'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className='mobile-menu_form_btn' onClick={() => handleSearch()}>
                    <FiSearch size={20} />
                </button>
            </form>
            <div className='mobile-menu_suggest'>
                <h5 className='mobile-menu_suggest_title'>Gợi ý cho bạn:</h5>
                <ul className='mobile-menu_suggest_list'>
                    {menuNav.map((item, index) => (
                        <li
                            className='mobile-menu_suggest_item'
                            key={index}
                            onClick={() => handleCloseMobileMenu()}
                        >
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                    <li className='mobile-menu_suggest_item'>
                        <a href='https://www.instagram.com/8yo.official/' target='_blank'>
                            INSTAGRAM 8YO
                        </a>
                    </li>
                    <li className='mobile-menu_suggest_item'>
                        <a href='https://www.facebook.com/8yo.studio' target='_blank'>
                            FANPAGE 8YO
                        </a>
                    </li>
                </ul>
            </div>
            <div className='mobile-menu_close' onClick={() => handleCloseMobileMenu()}>
                <VscChromeClose size={20} />
            </div>
        </div>
    );
};

export default MobileMenu;
