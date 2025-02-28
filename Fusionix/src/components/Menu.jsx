

import PropTypes from "prop-types";


const Menu = ({ classes = '', children }) => {
    return <div className={`menu ${classes}`}>{children}</div>;
};

Menu.propTypes = {
    classes: PropTypes.string,
    Children: PropTypes.any,
};


export default Menu;