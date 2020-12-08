import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {toggleDialog} from "../store/actions/settings";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    button: {
        width: 200,
        // margin: theme.spacing(2, 2, 2, 0)
    }
}));

const ActionComponent = ({ selectedRow, selected }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleOpenDialog = (key) => {
        dispatch(toggleDialog({data: key === 'add' ? null : selectedRow, key}));
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs>
                    <Button onClick={() => handleOpenDialog("add")} size="small" variant="contained" color="primary" className={classes.button}>
                        Add employee
                    </Button>
                    <Button onClick={() => handleOpenDialog("edit")} size="small" variant="outlined" className={classes.button}
                            disabled={selected.length > 1 || selected.length === 0}>
                        Edit
                    </Button>
                    <Button onClick={() => handleOpenDialog("delete")} size="small" variant="outlined" color="secondary" className={classes.button}
                            disabled={!selected.length}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default ActionComponent;