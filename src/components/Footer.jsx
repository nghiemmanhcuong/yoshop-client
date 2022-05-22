import Grid from './Grid';
import {Link} from 'react-router-dom';
import {FiPhoneCall} from 'react-icons/fi';
import {FaFacebookF} from 'react-icons/fa';
import {AiOutlineTwitter} from 'react-icons/ai';
import {ImGooglePlus} from 'react-icons/im';
import {BsInstagram, BsYoutube} from 'react-icons/bs';

import {menuService} from '../asset/data/constants.js';

const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='container footer_container'>
                    <Grid col={2} mdCol={1}>
                        <div className='footer_block'>
                            <h3 className='footer_title'>Về 8YO</h3>
                            <Grid col={2}  xsCol={1} gap={30}>
                                <p className='footer_desc'>
                                    Đưa đến một chất lượng sản phẩm hoàn hảo với một giá thành hợp
                                    lí nhất. Luôn đặt khách hàng lên trên cả lợi nhuận. Tự hào là
                                    một Local Brand nhận được sự hài lòng của 99,99% khách hàng!
                                </p>
                                <ul className='footer_shop'>
                                    <li>
                                        <span>Điện thoại:</span>
                                        <a href='tel:0898660309'>0898660309</a>
                                    </li>
                                    <li>
                                        <span>Email:</span>
                                        <a href='mailto:8yo.studio@gmail.com'>
                                            8yo.studio@gmail.com
                                        </a>
                                    </li>
                                </ul>
                            </Grid>
                        </div>
                        <div className='footer_block'>
                            <Grid col={2}  xsCol={1} gap={30}>
                                <div className='footer_links'>
                                    <h3 className='footer_title'>Hỗ trợ khách hàng</h3>
                                    <ul>
                                        {menuService.map((item,index) => (
                                            <li key={index}>
                                                <Link to={item.path}>{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='footer_block'>
                                    <h3 className='footer_title'>Chăm sóc khách hàng</h3>
                                    <div className='footer_contact'>
                                        <div className='footer_contact_icon'>
                                            <FiPhoneCall size={32} />
                                        </div>
                                        <div className='footer_contact_method'>
                                            <a
                                                className='footer_contact_method_phone'
                                                href='tel:0898660309'
                                            >
                                                0898660309
                                            </a>
                                            <a
                                                className='footer_contact_method_mail'
                                                href='mailto:8yo.studio@gmail.com'
                                            >
                                                8yo.studio@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <h3 className='footer_title'>Follow 8YO nha bạn hiền!</h3>
                                    <div className='footer_contact_icons'>
                                        <a
                                            href='https://www.facebook.com/8yo.studio'
                                            target='_blank'
                                            className='footer_contact_icons_item'
                                        >
                                            <FaFacebookF />
                                        </a>
                                        <a
                                            href='https://www.facebook.com/8yo.studio'
                                            target='_blank'
                                            className='footer_contact_icons_item'
                                        >
                                            <AiOutlineTwitter />
                                        </a>
                                        <a
                                            href='https://www.instagram.com/8yo.official'
                                            target='_blank'
                                            className='footer_contact_icons_item'
                                        >
                                            <BsInstagram />
                                        </a>
                                        <a
                                            href='/'
                                            target='_blank'
                                            className='footer_contact_icons_item'
                                        >
                                            <ImGooglePlus />
                                        </a>
                                        <a
                                            href='/'
                                            target='_blank'
                                            className='footer_contact_icons_item'
                                        >
                                            <BsYoutube />
                                        </a>
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                </div>
            </div>
            <div className='footer_copyright'>
                <div className="container">
                    <p>Copyright © 2022 8YO Studio. Powered by Haravan</p>
                </div>
            </div>
        </>
    );
};

export default Footer;
