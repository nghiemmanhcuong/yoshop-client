import {Link, useNavigate} from 'react-router-dom';
import {FaRegDotCircle, FaRegUser} from 'react-icons/fa';
import {AiFillHome} from 'react-icons/ai';
import {MdPlace} from 'react-icons/md';
import {BsTelephoneFill} from 'react-icons/bs';
import {CgClose} from 'react-icons/cg';
import {useEffect, useState} from 'react';

import Helmet from '../components/Helmet';

import {useStore} from '../store';
import {logoutAction} from '../store/actions.js';
import {dataProvinces} from '../asset/data/constants.js';
import authApi from '../api/authApi.js';

import Grid from '../components/Grid';

const AccountAddresses = () => {
    const navigate = useNavigate();
    const [state, dispatch, getUserAddresses] = useStore();

    const [provinces, setProvinces] = useState([]);
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [contry, setContry] = useState('');
    const [province, setProvince] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (state.user != null) {
            getUserAddresses(Number(state.user.userId));
        }

        if (state.user.access && state.user.access == 'admin') {
            navigate('/404');
        }
    }, []);

    useEffect(() => {
        if (state.user == null) {
            navigate('/');
        }
    }, [state.user]);

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem('USER');
        dispatch(logoutAction());
        navigate('/');
    };

    const handleSelectContry = (e) => {
        setProvinces(JSON.parse(e.target.value));
        if (JSON.parse(e.target.value).length == 0) {
            setProvince('');
        } else {
            setProvince(JSON.parse(e.target.value)[0]);
        }
        setContry(e.target.options[e.target.selectedIndex].dataset.name);
    };

    const handleAddAddress = async () => {
        if (!name || !address || !phone) {
            setError('Bạn chưa nhập họ và tên, số điện thoại hoặc địa chỉ');
        } else {
            try {
                const addressInfo = {
                    userId: Number(state.user.userId),
                    surname,
                    name,
                    company,
                    address,
                    contry,
                    province,
                    phone,
                };
                const response = await authApi.addAddress(addressInfo);
                if (response.success) {
                    getUserAddresses(Number(state.user.userId));
                    setSurname('');
                    setName('');
                    setCompany('');
                    setAddress('');
                    setPhone('');
                } else {
                    setError(response.message);
                }
            } catch (error) {
                console.log('Feiled to add address api!', error);
            }
        }
    };

    const handleDeleteUserAddress = async (userAddressId) => {
        try {
            const response = await authApi.deleteAddresses({user_address_id: userAddressId});
            if (response.success) {
                getUserAddresses(Number(state.user.userId));
            }
        } catch (error) {
            console.log('Feiled to delete address api!', error);
        }
    };

    return (
        <Helmet title='Địa chỉ của tôi'>
            <div className='account-page'>
                <div className='container'>
                    <div className='account-page_header'>
                        <h1 className='account-page_header_title'>Tài khoản của bạn</h1>
                        <div className='account-page_header_hr'></div>
                    </div>
                    <div className='account-page_container'>
                        <div className='account-page_left'>
                            <h3 className='account-page_left_title'>TÀI KHOẢN</h3>
                            <ul className='account-page_left_list'>
                                <li className='account-page_left_item'>
                                    <Link to='/account'>
                                        <FaRegDotCircle size={8} /> Thông tin tài khoản
                                    </Link>
                                </li>
                                <li className='account-page_left_item'>
                                    <Link to='/account/addresses'>
                                        <FaRegDotCircle size={8} /> Danh sách địa chỉ
                                    </Link>
                                </li>
                                <li className='account-page_left_item'>
                                    <Link to='/account/change-password'>
                                        <FaRegDotCircle size={8} /> Đổi mật khẩu
                                    </Link>
                                </li>
                                <li
                                    className='account-page_left_item'
                                    onClick={() => handleLogout()}
                                >
                                    <FaRegDotCircle size={8} /> Đăng xuất
                                </li>
                            </ul>
                        </div>
                        <div className='account-page_right'>
                            <div className='account-page_addresses'>
                                <Grid col={2} mdCol={1} gap={30}>
                                    <div className='account-page_addresses_list'>
                                        {state.user != null &&
                                        state.user.addresses != undefined &&
                                        state.user.addresses.length > 0 ? (
                                            state.user.addresses.map((item, index) => (
                                                <div
                                                    className='account-page_addresses_item'
                                                    key={index}
                                                >
                                                    <div className='account-page_addresses_item_header'>
                                                        <span>{item.surname + '' + item.name}</span>
                                                        <div
                                                            className='account-page_addresses_item_header_icon'
                                                            onClick={() =>
                                                                handleDeleteUserAddress(item.id)
                                                            }
                                                        >
                                                            <CgClose size={17} />
                                                        </div>
                                                    </div>
                                                    <div className='account-page_addresses_item_body'>
                                                        <div className='account-page_addresses_item_group'>
                                                            <span>Họ và tên:</span>
                                                            <p>{item.surname + ' ' + item.name}</p>
                                                        </div>
                                                        <div className='account-page_addresses_item_group'>
                                                            <span>Công ty:</span>
                                                            <p>{item.company}</p>
                                                        </div>
                                                        <div className='account-page_addresses_item_group'>
                                                            <span>Địa chỉ:</span>
                                                            <p>
                                                                {item.address} <br />
                                                                {item.contry},{item.province}
                                                            </p>
                                                        </div>
                                                        <div className='account-page_addresses_item_group'>
                                                            <span>Số điện thoại:</span>
                                                            <p>{item.phone}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className='account-page_addresses_empty'>
                                                Bạn chưa đăng ký địa chỉ nào
                                            </div>
                                        )}
                                    </div>
                                    <div className='account-page_addresses_form'>
                                        <div className='account-page_addresses_form_header'>
                                            <h3>NHẬP ĐỊA CHỈ MỚI</h3>
                                        </div>
                                        <div className='account-page_addresses_form_body'>
                                            {error != '' && (
                                                <div className='account_form_error'>{error}</div>
                                            )}
                                            <div className='account-page_addresses_form_group'>
                                                <div className='account-page_addresses_form_icon'>
                                                    <FaRegUser />
                                                </div>
                                                <input
                                                    type='text'
                                                    className='account-page_addresses_form_input'
                                                    placeholder='Họ'
                                                    value={surname}
                                                    onChange={(e) => setSurname(e.target.value)}
                                                />
                                            </div>
                                            <div className='account-page_addresses_form_group'>
                                                <div className='account-page_addresses_form_icon'>
                                                    <FaRegUser />
                                                </div>
                                                <input
                                                    type='text'
                                                    className='account-page_addresses_form_input'
                                                    placeholder='Tên'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className='account-page_addresses_form_group'>
                                                <div className='account-page_addresses_form_icon'>
                                                    <AiFillHome />
                                                </div>
                                                <input
                                                    type='text'
                                                    className='account-page_addresses_form_input'
                                                    placeholder='Công ty'
                                                    value={company}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                />
                                            </div>
                                            <div className='account-page_addresses_form_group'>
                                                <div className='account-page_addresses_form_icon'>
                                                    <AiFillHome />
                                                </div>
                                                <input
                                                    type='text'
                                                    className='account-page_addresses_form_input'
                                                    placeholder='Địa chỉ'
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                            <div className='account-page_addresses_form_group'>
                                                <div className='account-page_addresses_form_icon'>
                                                    <MdPlace />
                                                </div>
                                                <select
                                                    className='account-page_addresses_form_select'
                                                    onChange={(e) => handleSelectContry(e)}
                                                >
                                                    <option value='[]' data-name=''>
                                                        - Please Select --
                                                    </option>
                                                    {dataProvinces.map((item, index) => (
                                                        <option
                                                            value={JSON.stringify(
                                                                item.provincesData,
                                                            )}
                                                            key={index}
                                                            data-name={item.provincesName}
                                                        >
                                                            {item.provincesName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {provinces.length > 0 && (
                                                <div className='account-page_addresses_form_group'>
                                                    <div className='account-page_addresses_form_icon'>
                                                        <MdPlace />
                                                    </div>
                                                    <select
                                                        className='account-page_addresses_form_select'
                                                        value={province}
                                                        onChange={(e) =>
                                                            setProvince(e.target.value)
                                                        }
                                                    >
                                                        {provinces.map((item, index) => (
                                                            <option value={item} key={index}>
                                                                {item}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                            <div className='account-page_addresses_form_group'>
                                                <div className='account-page_addresses_form_icon'>
                                                    <BsTelephoneFill />
                                                </div>
                                                <input
                                                    type='text'
                                                    className='account-page_addresses_form_input'
                                                    placeholder='Số điện thoại'
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className='account-page_addresses_form_btn'>
                                                <button onClick={() => handleAddAddress()}>
                                                    Thêm mới
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default AccountAddresses;
