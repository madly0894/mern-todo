import * as types from "../types";
import instance from '../../api/axios';

function error() {
    return new Error("Error from server");
}

// GET Employees

export const getAllEmployees = () => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        const res = await instance.get()
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

export const addEmployee = (title, body) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        const res = await instance.post('/add',
            {
                title: title,
                body: body
            })
            .then(res => res)
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

export const updateEmployee = (title, body, id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        const res = await instance.put(`/update/${id}`,
            {
                title: title,
                body: body
            })
            .then(res => res)
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

export const deleteEmployee = (id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        await instance.delete(`/${id}`)
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

export const getEmployeeById = (id) => async (dispatch) => {
    dispatch(action_setLoading());

    try {
        const res = await instance.get(`/${id}`)
            .then(res => res)
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
    type: types.SET_LOADING
});

// Set Errors

export const action_setErrors = (errors) => ({
    type: types.SET_ERRORS,
    payload: errors
});