import * as types from "../types";

const initialState = {
    employees: [],
    employee: null
};

function reducers(state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        case types.ADD_EMPLOYEE :
            return {
                ...state,
                employees: [...state.employees, action.payload]
            };
        case types.DELETE_EMPLOYEE :
            const cut = state.employees.filter((note) => note.id !== action.payload);
            return {...state, employees: cut};
        case types.EDIT_EMPLOYEE:
            const edit = state.employees.map((note) => note.id === action.payload.id
                ? {...action.payload} : note
            );
            return {...state, notes: edit};
        default:
            return state;
    }
}

export default reducers;
