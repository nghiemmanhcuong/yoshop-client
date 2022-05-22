import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Helmet from '../components/Helmet';

import authApi from '../api/authApi';
import {useStore} from '../store';
import {setUserAction} from '../store/actions.js';

const Login = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (state.user != null) {
            navigate('/');
        }
    }, [state.user]);

    // handle login
    const handleLogin = async () => {
        if (!email || !password) {
            setError('Vui lòng nhập đủ thông tin');
        } else {
            const userInfo = {
                email,
                password,
            };

            try {
                const response = await authApi.login(userInfo);
                if (response.success) {
                    setEmail('');
                    setPassword('');
                    setError('');
                    dispatch(setUserAction(response.data));
                    localStorage.setItem('USER', JSON.stringify(response.data));
                    navigate('/');
                } else {
                    setError(response.message);
                }
            } catch (error) {
                console.log('error in login', error);
            }
        }
    };

    return (
        <Helmet title='Đăng nhập'>
            <div className='account'>
                <div className='container'>
                    <div className='account_container'>
                        <div className='account_header'>
                            <h1 className='account_header_title'>Đăng nhập</h1>
                            <div className='account_header_hr'></div>
                        </div>
                        <div className='account_form'>
                            {error != '' && <div className='account_form_error'>{error}</div>}
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='text'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='password'
                                    placeholder='Mật khẩu'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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
                            <div className='account_button' onClick={() => handleLogin()}>
                                <button>Đăng nhập</button>
                            </div>
                            <div className='account_other'>
                                <Link to='/account/register'>
                                    <span>Đăng ký</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Login;
