import React from "react";
import './menu-item.style.scss'
import {withRouter} from 'react-router-dom'

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => {
    return (
        <div className={`${size === 'large' ? 'large' : 'small'} menu-item`} onClick={() => history.push(linkUrl)}>
            <div
                className="background-image"
                style={{backgroundImage: `url(${imageUrl})`}}
            />
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
};

export default withRouter(MenuItem)
