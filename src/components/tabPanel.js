import React from "react";
import PropTypes from "prop-types";
// import Box from "@material-ui/core/Box";

const TabPanel = ({ children, value, index, name, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${name}-${index}`}
      aria-labelledby={`${name}-${index}`}
      {...other}
      className="w-full"
    >
      {value === index && <div className="p-10">{children}</div>}
    </div>
  );
};
TabPanel.propTypes = {
  children: PropTypes.element,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default TabPanel;
