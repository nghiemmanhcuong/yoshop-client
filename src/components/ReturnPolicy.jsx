import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className='return-policy'>
            <h1 className='return-policy_title'>Chính sách đổi trả</h1>
            <div className='return-policy_content'>
                <div className='return-policy_content_block'>
                    <h3 className='return-policy_content_title'>1. Điều kiện đổi trả</h3>
                    <p className='return-policy_content_desc'>
                        Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại
                        hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:
                    </p>
                    <ul className='return-policy_content_list'>
                        <li className='return-policy_content_list_item'>
                            Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên
                            website tại thời điểm đặt hàng.
                        </li>
                        <li className='return-policy_content_list_item'>
                            Không đủ số lượng, không đủ bộ như trong đơn hàng.
                        </li>
                        <li className='return-policy_content_list_item'>
                            Sản phẩm phải còn nguyễn nhãn mác, trong tình trạng còn mới / chưa qua
                            sử dụng.
                        </li>
                    </ul>
                    <p className='return-policy_content_desc'>
                        Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót
                        trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.
                    </p>
                </div>
                <div className='return-policy_content_block'>
                    <h3 className='return-policy_content_title'>
                        2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả
                    </h3>
                    <ul className='return-policy_content_list'>
                        <li className='return-policy_content_list_item'>
                            <span>Thời gian thông báo đổi trả:</span>trong vòng 3 ngày kể từ khi
                            nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc
                            bể vỡ.
                        </li>
                        <li className='return-policy_content_list_item'>
                            <span>Thời gian gửi chuyển trả sản phẩm:</span>trong vòng 7 ngày kể từ
                            khi nhận sản phẩm.
                        </li>
                        <li className='return-policy_content_list_item'>
                            <span>Địa điểm đổi trả sản phẩm:</span>Khách hàng có thể mang hàng trực
                            tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu
                            điện.
                        </li>
                    </ul>
                    <p className='return-policy_content_desc'>
                        Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến
                        chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ fanpage của 8YO. Xin
                        cảm ơn quý khách.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;
