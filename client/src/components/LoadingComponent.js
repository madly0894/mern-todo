import React from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
}));

const LoadingComponent = () => {
    const classes = useStyles();
    const {loading} = useSelector(({ reducers }) => reducers);

    return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingComponent;
