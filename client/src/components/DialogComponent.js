import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {toggleDialog} from "../store/actions/settings";
import {
    action_reset,
    addEmployee,
    deleteEmployees,
    updateEmployee
} from "../store/actions/todo";
import FormComponent from "./FormComponent";
import {makeStyles} from "@material-ui/core/styles";
import _ from 'lodash';
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    dialogAction: {
        padding: '8px 24px 16px'
    },
    typography: {
        textTransform: 'capitalize',
        fontWeight: 600,
        fontSize: theme.spacing(3)
    },
    wrapper: {
        position: 'relative',
    },
    blockProgress: {
        width: 44,
        height: 22,
        marginLeft: theme.spacing(1)
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
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
    const {success, loading} = useSelector(({ todo }) => todo);
    const [form, setForm] = useState(initialState);

    const handleChangeForm = (event, key = null) => {
        if (key) {
            return setForm(form => ({
                ...form,
                [key]: event
            }))
        }

        const {name, value} = event.target;

        if (name === 'workPhone' || name === 'personalPhone') {
            return setForm(form => ({
                ...form,
                [name]: value === '' ? '' : +value.replace(/[^0-9]+/g, "")
            }));
        }

        if (name === 'hourlyRate') {
            return setForm(form => ({
                ...form,
                [name]: value === '' ? '' : +value.replace(/[".0']/g, "")
            }));
        }

        setForm(form => ({
            ...form,
            [name]: value
        }));
    };

    console.log(form)

    useEffect(() => {
        if (data) {
            setForm(data);
        } else {
            setForm(initialState)
        }
    }, [data]);

    useEffect(() => {
        if(success) setForm(initialState);
    }, [success]);

    const handleAddEmployee = () => {
        dispatch(addEmployee(form));
    };

    const handleEditEmployee = () => {
        dispatch(updateEmployee(form));
    };

    const handleDeleteEmployees = () => {
        dispatch(deleteEmployees(selectedRowIds));
    };

    const handleDisagreeDialog = () => {
        dispatch(toggleDialog({data: form, key: action, selectedRowIds}));
        dispatch(action_reset());
    };

    const handleAgreeDialog = () => {
        if (action === 'edit') {
            handleEditEmployee();
        } else if (action === 'delete') {
            handleDeleteEmployees()
        } else {
            handleAddEmployee();
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth={action === 'delete' ? 'xs' : 'md'}
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
                            Are you sure you want to delete { selectedRowIds.length > 1 ? 'employees' : `this employee ${data.firstName} ${data.lastName}`}?
                        </DialogContentText>
                    )
                    : (
                        <FormComponent form={form} handleChangeForm={handleChangeForm}/>
                    )}
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button size="small" variant="outlined" onClick={handleDisagreeDialog}>
                    Close
                </Button>
                <div className={classes.wrapper}>
                    {
                        loading ? (
                            <div className={classes.blockProgress}>
                                <CircularProgress size={24} className={classes.buttonProgress} />
                            </div>
                        ) : (
                            <Button
                                onClick={handleAgreeDialog}
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled={action === 'delete' ? false : _.isEqual(data, form)}
                            >
                                {action}
                            </Button>
                        )
                    }
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default DialogComponent;
