import * as types from "../types";

const initialState = {
    employees: [],
    employee: null,
    errors: null,
    loading: false
};

function reducers(state = initialState, action) {
    const {payload} = action;

    switch (action.type) {
        case types.GET_ALL_EMPLOYEES:
            return {
                ...state,
                employees: payload,
                loading: false
            };
        case types.GET_EMPLOYEE_BY_ID:
            return {
                ...state,
                employee: payload,
                loading: false
            };
        case types.ADD_EMPLOYEE :
            return {
                ...state,
                employees: [...state.employees, payload]
            };
        case types.DELETE_EMPLOYEE :
            const employees = state.employees.filter((note) => note.id !== payload);

            return {
                ...state,
                employees
            };
        case types.EDIT_EMPLOYEE:
            const edit = state.employees.map((note) => note.id === payload
                ? {...payload} : note
            );

            return {
                ...state,
                notes: edit
            };
        case types.SET_LOADING:
            return {
                ...state,
                loading: true,
                errors: null
            };
        case types.SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        default:
            return state;
    }
}

export default reducers;
