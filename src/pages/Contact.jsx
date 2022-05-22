import {MdPlace, MdEmail} from 'react-icons/md';
import {BsTelephoneForwardFill, BsTelephoneFill} from 'react-icons/bs';
import {FaHeadphones, FaUserAlt} from 'react-icons/fa';
import {RiBook3Fill} from 'react-icons/ri';
import {AiFillMessage} from 'react-icons/ai';
import {IoCloseCircleSharp} from 'react-icons/io5';
import {useState,useRef} from 'react';

import Grid from '../components/Grid';

import AuthApi from '../api/authApi.js';

const Contact = () => {
    const errorMsg = useRef(null);
    const successMsg = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendContact = async () => {
        if (!name || !email || !phone || !title || !content) {
            setError('Vui lòng nhập đủ thông tin');
            if(errorMsg.current != null){
                errorMsg.current.style.display = 'block';
            }
        } else {
            try {
                const data = {
                    name,
                    email,
                    phone,
                    title,
                    content,
                };
                const response = await AuthApi.sendContact(data);
                if (response.success) {
                    setSuccess(response.message);
                    setError('');
                    setName('');
                    setEmail('');
                    setPhone('');
                    setTitle('');
                    setContent('');
                    if(successMsg.current != null){
                        successMsg.current.style.display = 'block';
                    }
                } else {
                    setError(response.message);
                    if(errorMsg.current != null){
                        errorMsg.current.style.display = 'block';
                    }
                }
            } catch (error) {
                console.log('Feiled to send contact api!', error);
            }
        }
    };

    // handle close message
    const handleCloseMsg = (e) => {
        e.target.parentElement.style.display = 'none';
    }

    return (
        <div className='contact'>
            <div className='container'>
                <div className='contact_header'>
                    <h1 className='contact_header_title'>Liên hệ với chúng tôi</h1>
                    <div className='contact_header_hr'></div>
                </div>
                <div className='contact_container'>
                    <div className='contact_address'>
                        <div className='contact_address_item'>
                            <div className='contact_address_item_icon'>
                                <MdPlace size={20} />
                            </div>
                            <div className='contact_address_item_content'>
                                <h5>Trụ sở chính</h5>
                                <p>Số 73 Tràng Thi, Quận Hoàn Kiếm, Thành Phố Hà Nội</p>
                            </div>
                        </div>
                        <div className='contact_address_item'>
                            <div className='contact_address_item_icon'>
                                <MdEmail size={17} />
                            </div>
                            <div className='contact_address_item_content'>
                                <h5>Email</h5>
                                <p>nghiemmanhcuong98@gmail.com</p>
                            </div>
                        </div>
                        <div className='contact_address_item'>
                            <div className='contact_address_item_icon'>
                                <BsTelephoneForwardFill size={17} />
                            </div>
                            <div className='contact_address_item_content'>
                                <h5>Mua hàng online</h5>
                                <p>(+84)987.954.221</p>
                            </div>
                        </div>
                        <div className='contact_address_item'>
                            <div className='contact_address_item_icon'>
                                <FaHeadphones size={17} />
                            </div>
                            <div className='contact_address_item_content'>
                                <h5>Chăm sóc khách hàng</h5>
                                <p>
                                    cskh@icondenim.com Thứ Hai đến Thứ Bảy, <br /> từ 8:00 đến 17:30
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='contact_form'>
                        <div className='contact_form_header'>
                            <h3>Liên hệ với YO-8</h3>
                            <p>
                                Chúng tôi sẵn sàng trợ giúp và trả lời bất kỳ câu hỏi nào của bạn.
                                Hãy cho chúng tôi biết về vấn đề của bạn để chúng tôi có thể trợ
                                giúp bạn nhanh hơn. Chúng tôi mong chờ góp ý từ bạn.
                            </p>
                        </div>
                        <div className='contact_form_container'>    
                            {error != '' && <div className='account_form_error' ref={errorMsg}>
                                {error}
                                <div className='account_form_error_icon' onClick={(e) => handleCloseMsg(e)}>
                                    X
                                </div>
                            </div>}
                            {success != '' && <div className='account_form_success' ref={successMsg}>
                                {success}
                                <div className='account_form_error_icon' onClick={(e) => handleCloseMsg(e)}>
                                    X
                                </div>
                            </div>}
                            <Grid col={2} xsCol={1} gap={10}>
                                <div className='contact_form_group'>
                                    <div className='contact_form_group_icon'>
                                        <FaUserAlt size={11} />
                                    </div>
                                    <input
                                        className='contact_form_group_input'
                                        type='text'
                                        placeholder='Họ và tên'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='contact_form_group'>
                                    <div className='contact_form_group_icon'>
                                        <BsTelephoneFill size={12} />
                                    </div>
                                    <input
                                        className='contact_form_group_input'
                                        type='text'
                                        placeholder='Số điện thoại'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </Grid>
                            <Grid col={2} xsCol={1} gap={10}>
                                <div className='contact_form_group'>
                                    <div className='contact_form_group_icon'>
                                        <MdEmail size={12} />
                                    </div>
                                    <input
                                        className='contact_form_group_input'
                                        type='text'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='contact_form_group'>
                                    <div className='contact_form_group_icon'>
                                        <RiBook3Fill size={12} />
                                    </div>
                                    <input
                                        className='contact_form_group_input'
                                        type='text'
                                        placeholder='Tiêu đề'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </Grid>
                            <div className='contact_form_group textarea'>
                                <div className='contact_form_group_icon'>
                                    <AiFillMessage size={12} />
                                </div>
                                <textarea
                                    className='contact_form_group_input'
                                    cols='30'
                                    rows='10'
                                    placeholder='Nội dung'
                                    defaultValue={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='contact_form_btn' onClick={() => handleSendContact()}>
                                <button>Gửi liên hệ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
