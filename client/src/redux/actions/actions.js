import * as types from "../types";
import axios from "axios";
const baseUrl = "/api/employee";

function error() {
    return new Error("Error from server");
}

// GET Employees

export const get_allEmployees = () => async (dispatch) => {
    try {
        const res = await axios.get(baseUrl);
        const data = await res.data;

        return dispatch(action_allEmployees(data));
    } catch (e) {
        error()
    }
};

export const action_allEmployees = (data) => ({
    type: types.GET_ALL_EMPLOYEES,
    data
});

// POST Add employee

export const post_addEmployee = (title, body) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/add`,
            {
                title: title,
                body: body
            });
        const data = await res.data;

        return dispatch(action_createEmployee(data));
    } catch (e) {
        error()
    }
};

export const action_createEmployee = (data) => ({
    type: types.ADD_EMPLOYEE,
    data
});

// PUT Update employee

export const put_updateEmployee = (title, body, id) => async (dispatch) => {
    try {
        const res = await axios.put(`${baseUrl}/update/${id}`,
            {
                title: title,
                body: body
            });
        const data = await res.data;

        return dispatch(action_updateEmployee(data));
    } catch (e) {
        error()
    }
};

export const action_updateEmployee = (data) => ({
    type: types.EDIT_EMPLOYEE,
    data
});

// DEL Delete employee

export const del_deleteEmployee = (id) => async (dispatch) => {
    try {
        await axios.delete(`${baseUrl}/${id}`);

        return dispatch(action_deleteEmployee(id));
    } catch (e) {
        error()
    }
};

export const action_deleteEmployee = (id) => ({
    type: types.DELETE_EMPLOYEE,
    id
});

// GET Employee by id

export const get_employeeById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/${id}`);
        const data = await res.data;

        return dispatch(action_employeeById(data));
    } catch (e) {
        error()
    }
};

export const action_employeeById = (onePost) => ({
    type: types.GET_EMPLOYEE_BY_ID,
    onePost
});
