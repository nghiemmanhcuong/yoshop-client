import {CgArrowLongLeft} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Helmet from '../components/Helmet';

import authApi from '../api/authApi.js';
import {useStore} from '../store';
import {setUserAction} from '../store/actions.js';

const Register = () => {
    const [, dispatch] = useStore();
    const navigate = useNavigate();

    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!surname || !name || !email || !phone || !sex || !password) {
            setError('Vui lòng nhập đủ thông tin');
        } else {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                if (/((09|03|07|08|05)+([0-9]{8})\b)/g.test(phone)) {
                    setError('');
                    const user = {
                        surname,
                        name,
                        email,
                        phone,
                        sex,
                        password,
                    };

                    try {
                        const response = await authApi.register(user);
                        if (response.success) {
                            const user = {
                                userId: Number(response.userId),
                                surname,
                                name,
                                email,
                            };
                            dispatch(setUserAction(user));
                            localStorage.setItem('USER', JSON.stringify(user));
                            navigate('/account');
                        }else {
                            setError(response.message);
                        }
                    } catch (error) {
                        console.log('error in register', error);
                    }
                } else {
                    setError('Số điện thoại của bạn không hợp lệ');
                }
            } else {
                setError('Email của bạn không hợp lệ');
            }
        }
    };

    return (
        <Helmet title='Tạo tài khoản'>
            <div className='account'>
                <div className='container'>
                    <div className='account_container'>
                        <div className='account_header'>
                            <h1 className='account_header_title'>Tạo tài khoản</h1>
                            <div className='account_header_hr'></div>
                        </div>
                        <div className='account_form'>
                            {error != '' && <div className='account_form_error'>{error}</div>}
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='text'
                                    placeholder='Họ và tên điệm'
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                                <p></p>
                            </div>
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='text'
                                    placeholder='Tên'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='text'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='account_form_sex'>
                                <input
                                    className='account_form_sex_checkbox'
                                    name='sex'
                                    type='radio'
                                    value='nữ'
                                    id='female'
                                    onChange={(e) => setSex(e.target.value)}
                                />
                                <label htmlFor='female'>Nữ</label>
                                <input
                                    className='account_form_sex_checkbox'
                                    name='sex'
                                    type='radio'
                                    value='nam'
                                    id='male'
                                    onChange={(e) => setSex(e.target.value)}
                                />
                                <label htmlFor='male'>Nam</label>
                            </div>
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='text'
                                    placeholder='Số Điện Thoại'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='text'
                                    placeholder='Mật Khẩu'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <p className='account_security'>
                            This site is protected by reCAPTCHA and the Google
                            <a href='' target='_blank'>
                                {' '}
                                Privacy Policy
                            </a>{' '}
                            and Terms of
                            <a href='' target='_blank'>
                                {' '}
                                Service apply
                            </a>{' '}
                            .
                        </p>
                        <div className='account_button' onClick={() => handleRegister()}>
                            <button>Đăng ký</button>
                        </div>
                        <div className='account_back'>
                            <Link to='/'>
                                <CgArrowLongLeft size={18} />
                                <span>Quay lại trang chủ</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Register;
