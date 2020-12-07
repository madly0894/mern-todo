import * as types from "../types";
import axios from "axios";
const baseUrl = "/api/employee";

function error() {
    return new Error("Error from server");
}

// GET Employees

export const get_allEmployees = () => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        const res = await axios.get(baseUrl)
            .then(res => res.data)
            .catch(err => {
                dispatch(action_setErrors(err));
            });

        return dispatch(action_allEmployees(res));
    } catch (e) {
        error()
    }
};

export const action_allEmployees = (data) => ({
    type: types.GET_ALL_EMPLOYEES,
    payload: data
});

// POST Add employee

export const post_addEmployee = (title, body) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        const res = await axios.post(`${baseUrl}/add`,
            {
                title: title,
                body: body
            })
            .then(res => res.data)
            .catch(err => {
                dispatch(action_setErrors(err));
            });

        return dispatch(action_createEmployee(res));
    } catch (e) {
        error()
    }
};

export const action_createEmployee = (data) => ({
    type: types.ADD_EMPLOYEE,
    payload: data
});

// PUT Update employee

export const put_updateEmployee = (title, body, id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        const res = await axios.put(`${baseUrl}/update/${id}`,
            {
                title: title,
                body: body
            })
            .then(res => res.data)
            .catch(err => {
                dispatch(action_setErrors(err));
            });

        return dispatch(action_updateEmployee(res));
    } catch (e) {
        error()
    }
};

export const action_updateEmployee = (data) => ({
    type: types.EDIT_EMPLOYEE,
    payload: data
});

// DEL Delete employee

export const del_deleteEmployee = (id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await axios.delete(`${baseUrl}/${id}`)
            .catch(err => {
                dispatch(action_setErrors(err));
            });

        return dispatch(action_deleteEmployee(id));
    } catch (e) {
        error()
    }
};

export const action_deleteEmployee = (id) => ({
    type: types.DELETE_EMPLOYEE,
    payload: id
});

// GET Employee by id

export const get_employeeById = (id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        const res = await axios.get(`${baseUrl}/${id}`)
            .then(res => res.data)
            .catch(err => {
                dispatch(action_setErrors(err));
            });

        return dispatch(action_employeeById(res));
    } catch (e) {
        error()
    }
};

export const action_employeeById = (data) => ({
    type: types.GET_EMPLOYEE_BY_ID,
    payload: data
});

// Set Loading

export const action_setLoading = () => ({
    type: types.GET_EMPLOYEE_BY_ID
});

// Set Errors

export const action_setErrors = (errors) => ({
    type: types.GET_EMPLOYEE_BY_ID,
    payload: errors
});