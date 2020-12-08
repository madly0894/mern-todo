import * as types from "../types";

export const toggleDialog = (data) => ({
    type: types.TOGGLE_DIALOG,
    payload: data
});