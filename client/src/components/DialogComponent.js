import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {toggleDialog} from "../store/actions/settings";
import {addEmployee, deleteEmployee, updateEmployee} from "../store/actions/actions";
import FormComponent from "./FormComponent";
import {makeStyles} from "@material-ui/core/styles";
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
    dialogAction: {
        padding: '8px 24px 16px'
    }
}));

const initialState = {
    businessLocation: null,
    company: null,
    role: null,
    firstName: "",
    hourlyRate: "",
    lastName: "",
    login: "",
    personalEmail: "",
    personalPhone: "",
    workEmail: "",
    workPhone: "",
    _id: ""
};

const DialogComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {open, action, data} = useSelector(({ settings }) => settings.dialog);
    const [form, setForm] = useState(initialState);

    const handleChangeForm = (e) => {
        const {name, value} = e.target;

        setForm(form => ({
            ...form,
            [name]: value
        }));
    };

    useEffect(() => {
        if (data) {
            setForm(data);
        } else {
            setForm(initialState)
        }
    }, [data]);

    const handleAddEmployee = () => {
        dispatch(addEmployee(form));
    };

    const handleEditEmployee = () => {
        dispatch(updateEmployee(form));
    };

    const handleDeleteEmployee = () => {
        dispatch(deleteEmployee(form._id));
    };

    const handleDisagreeDialog = () => {
        dispatch(toggleDialog({data: form, key: action}))
    };

    const handleAgreeDialog = () => {
        if (action === 'edit') {
            handleEditEmployee();
        } else if (action === 'delete') {
            handleDeleteEmployee();
        } else {
            handleAddEmployee();
        }
        handleDisagreeDialog();
        setForm(initialState);
    };

    console.log(form)

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={handleDisagreeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ zIndex: 9999 }}
        >
            <DialogTitle id="alert-dialog-title">
                {action.toUpperCase()} Employee
            </DialogTitle>
            <DialogContent>
                {action === 'delete'
                    ? (
                        <DialogContentText id="alert-dialog-description">Are you sure you want to delete this note {data._id}?</DialogContentText>
                    )
                    : (
                        <FormComponent form={form} handleChangeForm={handleChangeForm}/>
                    )}
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button onClick={handleDisagreeDialog} color="secondary">
                    Close
                </Button>
                <Button
                    onClick={handleAgreeDialog}
                    variant="contained"
                    color="primary"
                    disabled={action === 'delete' ? false : (_.isEqual(data, form) || !_.isEmpty(form))}
                >
                    {action}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogComponent;