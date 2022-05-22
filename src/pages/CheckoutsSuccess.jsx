import {BsFillCheckCircleFill} from 'react-icons/bs';
import {FcHome} from 'react-icons/fc';
import { Link } from 'react-router-dom';

const CheckoutsSuccess = () => {
    return (
        <div className='checkouts-success'>
            <div className='container'>
                <div className='checkouts-success_container'>
                    <BsFillCheckCircleFill size={40}/>
                    <h1>Đặt hàng thành công</h1>
                    <p>
                        Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi chúng tôi xẽ kiểm tra đơn hàng
                        và chuyển hàng cho bạn, chúc bạn một ngày tốt lành
                    </p>
                    <Link to='/'>
                        Tiếp tục mua hàng <FcHome size={18}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutsSuccess;
