import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';

import numberWithComas from '../utils/numberWithComas.js';


const Card = (props) => {
    const [imageArr, setImageArr] = useState([])
    const {name, images, oldPrice, newPrice, discount,slug} = props.item;
    const img_url = process.env.REACT_APP_IMG_URL;

    useEffect(() => {
        if(images != null) {
            setImageArr(JSON.parse(images));
        }
    }, [images])

    return (
        <div className='card'>
            <div className='card_img'>
                <Link to={`/products/${slug}`}>
                    {imageArr && imageArr[0] && <img src={img_url+imageArr[0]} alt='product image' />}
                    {imageArr && imageArr[1] && <img src={img_url+imageArr[1]} alt='product image' />}
                </Link>
            </div>
            <div className='card_info'>
                <h5 className='card_info_name'>{name}</h5>
                <div className='card_info_price'>
                    <span className='card_info_price_new'>
                        {numberWithComas(newPrice)}
                        <sup>đ</sup>
                    </span>
                    {newPrice ? (
                        <span className='card_info_price_old'>
                            {numberWithComas(oldPrice)}
                            <sup>đ</sup>
                        </span>
                    ) : null}
                </div>
            </div>
            {discount ? <div className='card_discount'>-{discount}%</div> : null}
        </div>
    );
};

Card.propTypes = {
    item: PropTypes.object.isRequired
};

export default Card;
