

import { Link } from "react-router-dom"

import PropTypes from "prop-types";

import { icon } from "../assets";

const Logo = ({ classes = ''}) => {
  return (
    <Link
      to='/'
      className={`min-w-max max-w-max h-[24px] ${classes}`}
    >
      <img
        src={icon}
        width={133}
        height={24}
        alt='logo'
        className=''
      />
    </Link>
  );
};

Logo.prototype = {
    classes: PropTypes.string,
}

export default Logo