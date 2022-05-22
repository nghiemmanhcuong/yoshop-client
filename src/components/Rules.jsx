import React from 'react';

const Rules = () => {
    return (
        <div className='rules'>
            <h1 className='rules_title'>Điều khoản dịch vụ</h1>
            <div className='rules_list'>
                <div className='rules_list_item'>
                    <h3 className='rules_list_item_title'>1. Giới thiệu</h3>
                    <p className='rules_list_item_desc'>
                        Chào mừng quý khách hàng đến với website chúng tôi. <br />
                        <br />
                        Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý
                        khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa,
                        thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào
                        bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web
                        mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web,
                        sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách
                        chấp nhận với những thay đổi đó. <br />
                        <br />
                        Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của
                        chúng tôi. <br />
                        <br />
                    </p>
                </div>
                <div className='rules_list_item'>
                    <h3 className='rules_list_item_title'>2. Hướng dẫn sử dụng website</h3>
                    <p className='rules_list_item_desc'>
                        Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập
                        dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo
                        có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo
                        quy định hiện hành của pháp luật Việt Nam. <br />
                        <br />
                        Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ
                        website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng
                        cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo. <br />
                        <br />
                    </p>
                </div>
                <div className='rules_list_item'>
                    <h3 className='rules_list_item_title'>3. Thanh toán an toàn và tiện lợi</h3>
                    <p className='rules_list_item_desc'>
                        Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:
                    </p>
                    <ul className='rules_list_item_payment'>
                        <li>
                            <span>Cách 1:</span>Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)
                        </li>
                        <li>
                            <span>Cách 2:</span>Thanh toán sau (COD - giao hàng và thu tiền tận nơi)
                        </li>
                        <li>
                            <span>Cách 3:</span>Thanh toán online qua thẻ tín dụng, chuyển khoản
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Rules;
