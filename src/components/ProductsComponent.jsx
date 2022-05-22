import PropTypes from 'prop-types';
import Card from './Card';
import Grid from './Grid';
import {Link} from 'react-router-dom';

const ProductsComponent = (props) => {
    return (
        <div className='products-component'>
            <Grid col={4} mdCol={3} smCol={2} xssCol={1} gap={5}>
                {props.data.map((product,index) => (
                    <Card item={product} key={index}/>
                ))}
            </Grid>
            {props.buttonText ? <div className='products-component_button'>
                <Link to={props.buttonLink}>
                    Xem thêm sản phẩm <b>{props.buttonText}</b>
                </Link>
            </div> : null}
        </div>
    );
};

ProductsComponent.propTypes = {
    data: PropTypes.array.isRequired,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
};

export default ProductsComponent;
