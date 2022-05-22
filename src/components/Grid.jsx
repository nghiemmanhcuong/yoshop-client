import PropTypes from 'prop-types';

const Grid = (props) => {
    const styles = {
        gap: props.gap ? `${props.gap}px` : '0',
    };

    const col = props.col ? `grid-col-${props.col}` : '';
    const mdCol = props.mdCol ? `grid-col-md-${props.mdCol}` : '';
    const smCol = props.smCol ? `grid-col-sm-${props.smCol}` : '';
    const xsCol = props.xsCol ? `grid-col-xs-${props.xsCol}` : '';
    const xssCol = props.xssCol ? `grid-col-xss-${props.xssCol}` : '';

    return (
        <div className={`grid ${col} ${mdCol} ${smCol} ${xsCol} ${xssCol}`} style={styles}>
            {props.children}
        </div>
    );
};

Grid.propTypes = {
    col: PropTypes.number.isRequired,
    mdCol: PropTypes.number,
    smCol: PropTypes.number,
    xsCol: PropTypes.number,
    xssCol: PropTypes.number,
};

export default Grid;
