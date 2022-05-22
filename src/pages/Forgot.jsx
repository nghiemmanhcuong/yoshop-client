import {Link} from 'react-router-dom';

const Forgot = () => {
    return (
        <div className='account'>
            <div className='container'>
                <div className='account_container'>
                    <div className='account_header'>
                        <h1 className='account_header_title'>Phục hồi mật khẩu</h1>
                        <div className='account_header_hr'></div>
                    </div>
                    <div className='account_form'>
                        <div className='account_form_group'>
                            <input
                                className='account_form_group_input'
                                type='text'
                                placeholder='Email'
                                isRequired
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
                        <div className='account_button'>
                            <button>Gửi yêu cầu</button>
                        </div>
                        <div className='account_other'>
                            <Link to='/account/login'>
                                <span>Huỷ</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgot;
