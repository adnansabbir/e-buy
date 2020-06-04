import {directory_data} from './initial_data';

const INITIAL_STATE = {
    sections: directory_data
};

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default directoryReducer;
