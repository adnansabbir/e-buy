import React from "react";
import './custom-button.style.scss';

const CustomButton = ({children, extraClassNames, ...otherProps}) => (
    <button className={`custom-button ${extraClassNames ? extraClassNames : ''}`} {...otherProps}>{children}</button>
);

export default CustomButton;