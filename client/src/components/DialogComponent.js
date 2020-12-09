import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {toggleDialog} from "../store/actions/settings";
import {addEmployee, deleteAllEmployees, deleteEmployee, updateEmployee} from "../store/actions/actions";
import FormComponent from "./FormComponent";
import {makeStyles} from "@material-ui/core/styles";
import _ from 'lodash';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    dialogAction: {
        padding: '8px 24px 16px'
    },
    typography: {
        textTransform: 'capitalize',
        fontWeight: 900,
        fontSize: theme.spacing(3)
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
};

const DialogComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {open, action, data, selectedRowIds} = useSelector(({ settings }) => settings.dialog);
    const {errors, loading} = useSelector(({ reducers }) => reducers);
    const [form, setForm] = useState(initialState);

    const handleChangeForm = (event, key) => {
        if (key) {
            return setForm(form => ({
                ...form,
                [key]: event
            }))
        }

        const {name, value} = event.target;

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
        dispatch(toggleDialog({data: form, key: action, selectedRowIds: []}))
    };

    const handleAgreeDialog = () => {
        if (action === 'edit') {
            handleEditEmployee(form);
        } else if (action === 'delete') {
            if (selectedRowIds.length > 1) {
                dispatch(deleteAllEmployees())
            } else {
                handleDeleteEmployee(form._id);
            }
        } else {
            handleAddEmployee(form);
        }

        // if (!errors.length) {
        //     handleDisagreeDialog();
        //     setForm(initialState);
        // }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleDisagreeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography className={classes.typography}>
                    {action} {selectedRowIds.length > 1 ? 'Employees' : 'Employee'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                {action === 'delete'
                    ? (
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete { selectedRowIds.length > 1 ? 'all employees' : `this employee ${data._id}`}?
                        </DialogContentText>
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
                    disabled={action === 'delete' ? false : (_.isEqual(data, form))}
                >
                    {action}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogComponent;
