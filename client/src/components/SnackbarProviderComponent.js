import React from 'react';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';
import { closeSnackbarAction } from '../store/actions/notifications';
import {useDispatch} from "react-redux";

const Provider = ({ children }) => {
    const dispatch = useDispatch();

    return (
        <SnackbarProvider
            action={key => (
                <Button
                    size="small"
                    aria-label="close"
                    color="inherit"
                    className="font-black"
                    onClick={() => dispatch(closeSnackbarAction(key))}
                >
                    Ok
                </Button>
            )}
            maxSnack={3}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            autoHideDuration={3000}
        >
            {children}
        </SnackbarProvider>
    );
};

export default React.memo(Provider);
