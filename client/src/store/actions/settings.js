import * as types from "../types";

export const toggleDialog = (data) =>{
    return {
        type: types.TOGGLE_DIALOG,
        payload: data
    };
};

export const closeDialog = () => {
    return {
        type: types.CLOSE_DIALOG
    }
};