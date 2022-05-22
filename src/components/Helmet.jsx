import {useEffect} from 'react';
import PropTypes from 'prop-types';

const Helmet = (props) => {
    document.title = props.title ? props.title + '-YO8' : '';
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [props.title]);

    return <div>{props.children}</div>;
};

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Helmet;
