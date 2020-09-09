import React from "react";
import './collection-preview.scss';
import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({title, items, ...others}) => {
    return (
        <div className='collection-preview'>
            <h1 className='title text-uppercase' onClick={()=> {console.log(others)}}>{title}</h1>
            <div className="preview">
                {items
                    .slice(0, 4)
                    .map(item => (
                        <CollectionItem key={item.id} item={item}/>
                    ))}
            </div>
        </div>
    )
};

export default CollectionPreview;