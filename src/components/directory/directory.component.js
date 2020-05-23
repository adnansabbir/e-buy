import React from "react";
import MenuItem from "../menu-items/menu-item.component";
import './directory.style.scss'
import {sections} from './dummy_data'

class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections: []
        }
    }

    componentDidMount() {
        this.setState({sections: sections})
    }

    render() {
        return (
            <div className="directory-menu">
                {
                    this.state.sections.map(({title, imageUrl, id, size}) => (
                        <MenuItem key={id} title={title} imageUrl={imageUrl} size={size}/>
                    ))
                }
            </div>
        )
    }
}

export default Directory;