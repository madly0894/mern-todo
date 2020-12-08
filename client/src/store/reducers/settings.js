import * as types from "../types";

const initialState = {
    dialog: {
        action: '',
        open: false,
        data: null,
        selectedRowIds: []
    }
};

export default function settings(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_DIALOG:
            return {
                ...state,
                dialog: {
                    open: !state.dialog.open,
                    action: action.payload.key,
                    data: action.payload.data,
                    selectedRowIds: action.payload.selectedRowIds
                }
            };
        default:
            return state;
    }
}
