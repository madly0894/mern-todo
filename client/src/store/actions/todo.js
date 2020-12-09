import * as types from "../types";
import instance from '../../api/axios';
import {convertArrayToObject} from "../../utils/helpers";
import {closeDialog} from "./settings";

function error(e) {
    return new Error(e.message);
}

// GET Employees

export const getAllEmployees = () => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await instance.get()
            .then(res => {
                dispatch(action_allEmployees(res.data));
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });
    } catch (e) {
        error(e)
    }
};

export const action_allEmployees = (data) => ({
    type: types.GET_ALL_EMPLOYEES,
    payload: data
});

// POST Add employee

export const addEmployee = (form) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await instance.post('/add', form)
            .then(res => {
                dispatch(action_createEmployee(res.data.data));
                dispatch(closeDialog());
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });

    } catch (e) {
        error(e)
    }
};

export const action_createEmployee = (data) => ({
    type: types.ADD_EMPLOYEE,
    payload: data
});

// PUT Update employee

export const updateEmployee = (form) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await instance.put(`/update/${form._id}`, form)
            .then(res => {
                dispatch(action_updateEmployee(res.data.data));
                dispatch(closeDialog());
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });

    } catch (e) {
        error(e)
    }
};

export const action_updateEmployee = (data) => ({
    type: types.EDIT_EMPLOYEE,
    payload: data
});

// Delete Selected Employees

export const deleteEmployees = (id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await instance.delete(`/all/:${id}`)
            .then(() => {
                dispatch(action_deleteEmployees(id));
                dispatch(closeDialog());
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });
    } catch (e) {
        error(e)
    }
};

export const action_deleteEmployees = (id) => ({
    type: types.DELETE_EMPLOYEES,
    payload: id
});

// Set Loading

export const action_setLoading = () => ({
    type: types.SET_LOADING
});

// Set Errors

export const action_setErrors = (errors) => ({
    type: types.SET_ERRORS,
    payload: errors
});

// Reset Errors

export const action_reset = () => ({
    type: types.SET_RESET
});

// // DEL Delete employee
//
// export const deleteEmployee = (id) => async (dispatch) => {
//     dispatch(action_setLoading());
//
//     try {
//         await instance.delete(`/${id}`)
//             .then(() => {
//                 dispatch(action_deleteEmployee(id));
//                 dispatch(closeDialog());
//             })
//             .catch(err => {
//                 dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
//             });
//     } catch (e) {
//         error()
//     }
// };
//
// export const action_deleteEmployee = (id) => ({
//     type: types.DELETE_EMPLOYEE,
//     payload: id
// });

// // GET Employee by id
//
// export const getEmployeeById = (id) => async (dispatch) => {
//     dispatch(action_setLoading());
//
//     try {
//         await instance.get(`/${id}`)
//             .then(res => {
//                 dispatch(action_employeeById(res.data));
//                 dispatch(closeDialog());
//             })
//             .catch(err => {
//                 dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
//             });
//     } catch (e) {
//         error()
//     }
// };
//
// export const action_employeeById = (data) => ({
//     type: types.GET_EMPLOYEE_BY_ID,
//     payload: data
// });