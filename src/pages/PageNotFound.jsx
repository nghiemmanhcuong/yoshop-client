import {Link} from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='page-not-found'>
            <div className='container'>
                <h1 className='page-not-found_title'>
                    <span>404</span>
                    Không tìm thấy trang
                </h1>
                <p className='page-not-found_desc'>
                    Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển đi, thay đổi link hoặc chưa bao
                    giờ tồn tại.
                </p>
                <div className='page-not-found_btn'>
                    <Link to='/'>TRỞ VỀ TRANG CHỦ</Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
