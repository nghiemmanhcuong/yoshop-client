import {Link} from 'react-router-dom';
import {useRef, useEffect, useState} from 'react';
import {BsDot} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';

import {useStore} from '../store';
import {setUserAction,logoutAction} from '../store/actions.js';
import authApi from '../api/authApi.js';

const Auth = () => {
    const navigate = useNavigate();
    const [state,dispatch] = useStore();

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [error, setError] = useState('');

    const authLoginRef = useRef(null);
    const authForgotRef = useRef(null);
    const loginShowRef = useRef(null);
    const forgotShowRef = useRef(null);

    if (loginShowRef.current && forgotShowRef.current) {
        loginShowRef.current.addEventListener('click', () => {
            authForgotRef.current.classList.remove('show');
            authLoginRef.current.classList.add('show');
        });

        forgotShowRef.current.addEventListener('click', () => {
            authLoginRef.current.classList.remove('show');
            authForgotRef.current.classList.add('show');
        });
    }

    // handle login
    const handleLogin = async () => {
        if (!emailLogin || !passwordLogin) {
            setError('Vui lòng nhập đủ thông tin');
        } else {
            const userInfo = {
                email:emailLogin,
                password:passwordLogin,
            };

            try {
                const response = await authApi.login(userInfo);
                if(response.success){
                    setEmailLogin('');
                    setPasswordLogin('');
                    setError('');
                    dispatch(setUserAction(response.data));
                    localStorage.setItem('USER', JSON.stringify(response.data));
                    navigate('/account');
                }else {
                    setError(response.message);
                }

            } catch (error) {
                console.log('error in login', error);
            }
        }
    };

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem('USER');
        dispatch(logoutAction());
        navigate('/');
    }

    return (
        <div className={`auth ${state.user != null ? 'is_user' : ''}`}>
            {state.user == null ? (
                <div className='auth_body'>
                    <div className='auth_login show' ref={authLoginRef}>
                        <div className='auth_login_header'>
                            <h3 className='auth_login_header_title'>ĐĂNG NHẬP TÀI KHOẢN</h3>
                            <p className='auth_login_header_desc'>
                                Nhập email và mật khẩu của bạn:
                            </p>
                        </div>
                        <div className='auth_login_form'>
                            {error != '' && <div className='account_form_error'>{error}</div>}
                            <div className='auth_login_form_input'>
                                <input
                                    type='text'
                                    placeholder='Email'
                                    value={emailLogin}
                                    onChange={(e) => setEmailLogin(e.target.value)}
                                />
                            </div>
                            <div className='auth_login_form_input'>
                                <input
                                    type='password'
                                    placeholder='Mật khẩu'
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                />
                            </div>
                            <p className='auth_login_form_security'>
                                This site is protected by reCAPTCHA and the Google
                                <a href='https://policies.google.com/privacy' target='_blank'>
                                    {' '}
                                    Privacy Policy
                                </a>{' '}
                                and Terms of
                                <a href='https://policies.google.com/terms' target='_blank'>
                                    {' '}
                                    Service apply
                                </a>
                                .
                            </p>
                            <div onClick={() => handleLogin()}>
                                <button className='auth_login_form_btn'>ĐĂNG NHẬP</button>
                            </div>
                            <div className='auth_login_form_action'>
                                <div className='auth_login_form_action_item'>
                                    Khách hàng mới?{' '}
                                    <Link to='/account/register'>Tạo tài khoản</Link>
                                </div>
                                <div className='auth_login_form_action_item'>
                                    Quên mật khẩu?{' '}
                                    <div
                                        className='auth_login_form_action_item_btn'
                                        ref={forgotShowRef}
                                    >
                                        Khôi phục mật khẩu
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='auth_forgot' ref={authForgotRef}>
                        <div className='auth_forgot_header'>
                            <h3 className='auth_forgot_header_title'>KHÔI PHỤC MẬT KHẨU</h3>
                            <p className='auth_forgot_header_desc'>Nhập email của bạn:</p>
                        </div>
                        <div className='auth_forgot_form'>
                            <div className='auth_forgot_form_input'>
                                <input type='text' placeholder='Email' />
                            </div>
                            <p className='auth_forgot_form_security'>
                                This site is protected by reCAPTCHA and the Google
                                <a href='https://policies.google.com/privacy' target='_blank'>
                                    {' '}
                                    Privacy Policy
                                </a>{' '}
                                and Terms of
                                <a href='https://policies.google.com/terms' target='_blank'>
                                    {' '}
                                    Service apply
                                </a>
                                .
                            </p>
                            <button className='auth_forgot_form_btn'>KHÔI PHỤC</button>
                            <div className='auth_forgot_form_action'>
                                <div className='auth_forgot_form_action_item'>
                                    Bạn đã nhớ mật khẩu?{' '}
                                    <div
                                        className='auth_forgot_form_action_item_btn'
                                        ref={loginShowRef}
                                    >
                                        Trở về đăng nhập
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='auth_user'>
                    <h3 className='auth_user_title'>THÔNG TIN TÀI KHOẢN</h3>
                    <p className='auth_user_name'>{state.user.surname + '' + state.user.name}</p>
                    <ul className='auth_user_list'>
                        <li className='auth_user_item'>
                            <Link to='/account'>
                                <BsDot size={20} /> Tài khoản của tôi
                            </Link>
                        </li>
                        {state.user.access && state.user.access == 'admin' && (
                            <li className='auth_user_item'>
                                <a href='http://yoshop.cf/admin' target='_blank'>
                                    <BsDot size={20} /> Vào trang quản trị
                                </a>
                            </li>
                        )}
                        {!state.user.access || state.user.access != 'admin' ? (
                            <li className='auth_user_item'>
                                <Link to='/account/addresses'>
                                    <BsDot size={20} /> Danh sách địa chỉ
                                </Link>
                            </li>
                        ) : null}
                        <li className='auth_user_item'>
                            <Link to='/account/change-password'>
                                <BsDot size={20} /> Đổi mật khẩu
                            </Link>
                        </li>
                        <li className='auth_user_item' onClick={() => handleLogout()}>
                            <BsDot size={20} /> Đăng xuất
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

Auth.propTypes = {};

export default Auth;
