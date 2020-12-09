import * as types from "../types";
import instance from '../../api/axios';
import {convertArrayToObject} from "../../utils/helpers";

function error() {
    return new Error('Error from server');
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
        error()
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
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });

    } catch (e) {
        error()
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
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });

    } catch (e) {
        error()
    }
};

export const action_updateEmployee = (data) => ({
    type: types.EDIT_EMPLOYEE,
    payload: data
});

// DEL Delete employee

export const deleteEmployee = (id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await instance.delete(`/${id}`)
            .then(() => {
                dispatch(action_deleteEmployee(id));
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });
    } catch (e) {
        error()
    }
};

export const action_deleteEmployee = (id) => ({
    type: types.DELETE_EMPLOYEE,
    payload: id
});

// GET Employee by id

export const getEmployeeById = (id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await instance.get(`/${id}`)
            .then(res => {
                dispatch(action_employeeById(res.data));
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });
    } catch (e) {
        error()
    }
};

export const action_employeeById = (data) => ({
    type: types.GET_EMPLOYEE_BY_ID,
    payload: data
});

// Delete All Employees

export const deleteAllEmployees = () => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await instance.delete(`/all`)
            .then(() => {
                dispatch(action_deleteAllEmployees());
            })
            .catch(err => {
                dispatch(action_setErrors(convertArrayToObject(err.data.errors, 'param')));
            });
    } catch (e) {
        error()
    }
};

export const action_deleteAllEmployees = () => ({
    type: types.DELETE_ALL_EMPLOYEES
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
