import * as types from "../types";

const initialState = {
    employees: [],
    // employee: null,
    errors: null,
    success: false,
    loading: false
};

function todo(state = initialState, action) {
    const {payload} = action;

    switch (action.type) {
        case types.GET_ALL_EMPLOYEES:
            return {
                ...state,
                employees: payload,
                success: true,
                loading: false
            };
        case types.ADD_EMPLOYEE :
            return {
                ...state,
                employees: [...state.employees, payload],
                success: true,
                loading: false
            };
        case types.EDIT_EMPLOYEE:
            const edit = state.employees.map((item) => item._id === payload._id
                ? {...item, ...payload} : item
            );

            return {
                ...state,
                employees: edit,
                success: true,
            };
        case types.DELETE_EMPLOYEES:
            const deleteAll = state.employees.filter((item, i) => payload.indexOf(item._id) === -1);

            return {
                ...state,
                employees: deleteAll,
                success: true,
                loading: false
            };
        case types.SET_LOADING:
            return {
                ...state,
                loading: true,
                success: false,
                errors: null
            };
        case types.SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        case types.SET_RESET: {
            return {
                ...state,
                errors: null,
            }
        }
        // case types.GET_EMPLOYEE_BY_ID:
        //     return {
        //         ...state,
        //         employee: payload,
        //         success: true,
        //         loading: false
        //     };
        // case types.DELETE_EMPLOYEE :
        //     const employees = state.employees.filter((item) => item._id !== payload);
        //
        //     return {
        //         ...state,
        //         employees,
        //         success: true,
        //         loading: false
        //     };
        default:
            return state;
    }
}

export default todo;
