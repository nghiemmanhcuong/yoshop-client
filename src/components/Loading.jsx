import React from 'react';

const Loading = () => {
    return (
        <div className='loading'>
            <div className='lds-ellipsis'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='loading_text'>Đang tải</div>
        </div>
    );
};

export default Loading;
