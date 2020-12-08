import * as types from '../types';

export const enqueueSnackbarAction = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: types.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbarAction = key => ({
    type: types.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbarAction = key => ({
    type: types.REMOVE_SNACKBAR,
    key,
});
