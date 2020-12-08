import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {toggleDialog} from "../store/actions/settings";
import {useDispatch} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
    button: {
        width: 200,
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            marginTop: theme.spacing(2)
        },
        '&:last-child': {
            marginRight: 0
        }
    }
}));

const ActionComponent = ({ selectedRowData, selectedRowIds }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleOpenDialog = (key) => {
        dispatch(toggleDialog({
            data: key === 'add' ? null : selectedRowData,
            key,
            selectedRowIds: key === 'delete' ? selectedRowIds : []
        }));
    };

    return (
        <Grid container>
            <Grid item xs className={classes.buttonGroup}>
                <Button onClick={() => handleOpenDialog("add")} size="small" variant="contained" color="primary" className={classes.button}>
                    <Hidden mdUp>
                        <AddIcon />
                    </Hidden>
                    <Hidden smDown>
                        Add employee
                    </Hidden>
                </Button>
                <Button onClick={() => handleOpenDialog("edit")} size="small" variant="outlined" className={classes.button}
                        disabled={selectedRowIds.length > 1 || selectedRowIds.length === 0}>
                    <Hidden mdUp>
                        <EditIcon />
                    </Hidden>
                    <Hidden smDown>
                        Edit employee
                    </Hidden>
                </Button>
                <Button onClick={() => handleOpenDialog("delete")} size="small" variant="outlined" color="secondary" className={classes.button}
                        disabled={!selectedRowIds.length}>
                    <Hidden mdUp>
                        <DeleteIcon />
                    </Hidden>
                    <Hidden smDown>
                        Delete {selectedRowIds.length > 1 ? 'all employees' : 'employee'}
                    </Hidden>
                </Button>
            </Grid>
        </Grid>
    );
};

export default ActionComponent;
