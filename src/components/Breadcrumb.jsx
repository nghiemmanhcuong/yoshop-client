import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumb = (props) => {
    return (
        <div className='breadcrumb'>
            <div className='breadcrumb_item'>
                <Link to='/'>Trang chủ</Link>
            </div>
            <span>/</span>
            {props.category ? (
                <>
                    <div className='breadcrumb_item'>
                        <Link to={`/collections/${props.category.slug}`}>{props.category.name}</Link>
                    </div>
                    <span>/</span>
                </>
            ) : null}
            <div className='breadcrumb_item'>{props.title}</div>
        </div>
    );
};

Breadcrumb.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.object,
};

export default Breadcrumb;
