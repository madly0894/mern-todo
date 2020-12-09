import React from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        position: 'absolute',
        marginTop: 58
    },
}));

const LoadingComponent = () => {
    const classes = useStyles();
    const {loading} = useSelector(({ todo }) => todo);

    return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default LoadingComponent;
