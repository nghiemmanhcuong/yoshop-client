import Grid from './Grid';
import {Link, useLocation} from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai';

import {menuNav} from '../asset/data/constants.js';

const Navigation = () => {
    const {pathname} = useLocation();
    const activeNav = menuNav.findIndex((e) => e.path === pathname);

    return (
        <div className='navigation'>
            <div className='container'>
                <div className='navigation_container'>
                    <div className='navigation_icon'>
                        <Link to='/'>
                            <AiOutlineHome size={26} />
                        </Link>
                    </div>
                    <nav className='navigation_main'>
                        <ul className='navigation_list'>
                            <Grid col={6} gap={10}>
                                {menuNav.map((item, index) => (
                                    <li className='navigation_item' key={index}>
                                        <Link
                                            to={item.path}
                                            className={`navigation_link ${
                                                activeNav == index ? 'active' : ''
                                            }`}
                                            title={item.name}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </Grid>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
