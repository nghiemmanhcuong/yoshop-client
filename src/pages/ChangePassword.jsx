import {Link} from 'react-router-dom';
import {useState} from 'react';

import Helmet from '../components/Helmet';

import authApi from '../api/authApi.js';
import {useStore} from '../store';

const ChangePassword = () => {
    const [state] = useStore();

    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setReypePassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async () => {
        if (!email || !oldPassword || !newPassword || !retypePassword) {
            setError('Vui lòng nhập đủ thông tin');
        } else {
            if (newPassword != retypePassword) {
                setError('Mật khẩu nhập lại không khớp');
            } else {
                try {
                    const data = {
                        email,
                        oldPassword,
                        newPassword,
                        retypePassword,
                    };

                    const response = await authApi.changePassword(data);
                    if (response.success) {
                        setError('');
                        setSuccess(response.message);
                    } else {
                        setError(response.message);
                    }
                } catch (error) {
                    console.log('Feiled to handle api change password!', error);
                }
            }
        }
    };

    return (
        <Helmet title='Đổi mật khẩu'>
            <div className='account'>
                <div className='container'>
                    <div className='account_container'>
                        <div className='account_header'>
                            <h1 className='account_header_title'>Đổi mật khẩu</h1>
                            <div className='account_header_hr'></div>
                        </div>
                        <div className='account_form'>
                           {error != '' && <div className='account_form_error'>{error}</div>}
                            {success != '' && <div className='account_form_success'>{success}</div>}
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
                                    placeholder='Mật khẩu cũ'
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='password'
                                    placeholder='Mật khẩu mới'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className='account_form_group'>
                                <input
                                    className='account_form_group_input'
                                    type='password'
                                    placeholder='Nhập lại mật khẩu mới'
                                    value={retypePassword}
                                    onChange={(e) => setReypePassword(e.target.value)}
                                />
                            </div>
                            <div className='account_button' onClick={() => handleChangePassword()}>
                                <button>Đổi mật khẩu</button>
                            </div>
                            <div className='account_other'>
                                <Link to='/'>
                                    <span>Quay lại trang chủ</span>
                                </Link>
                                {state.user == null && (
                                    <Link to='/account/login'>
                                        <span>Đăng nhập</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default ChangePassword;
