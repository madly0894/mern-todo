import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { enqueueSnackbarAction, removeSnackbarAction } from '../store/actions/notifications';
import instance from '../api/axios';

let displayed = [];

const NotificationComponent = props => {
    const dispatch = useDispatch();
    const notifications = useSelector(({ notifications }) => notifications.notifications);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {
        const enqueueSnackbars = (...args) => dispatch(enqueueSnackbarAction(...args));

        const infoSnackbar = (message = "Something wen't wrong, please try again!", variant = 'error') => {
            enqueueSnackbars({
                message,
                options: {
                    variant,
                    key: new Date().getTime() + Math.random()
                }
            });
        };

        const requestHandler = request => {
            return request;
        };

        const responseHandler = response => {
            if (response.config.method === 'post') {
                infoSnackbar('You have successfully created!', 'success');
            } else if (response.config.method === 'put') {
                infoSnackbar('You have successfully updated!', 'success');
            } else if (response.config.method === 'delete') {
                infoSnackbar('You have successfully deleted!', 'success');
            }

            return response;
        };

        const myRequestInterceptor = instance.interceptors.request.use(
            request => requestHandler(request),
            error => {
                if (error) {
                    infoSnackbar();
                }

                return Promise.reject(error.response);
            }
        );

        const myResponseInterceptor = instance.interceptors.response.use(
            response => responseHandler(response),
            error => {
                if (error) {
                    infoSnackbar(error.response.data.message);
                }

                return Promise.reject(error.response);
            }
        );

        return () => {
            instance.interceptors.response.eject(myResponseInterceptor);
            instance.interceptors.request.eject(myRequestInterceptor);
        };
    }, [dispatch]);

    const storeDisplayed = id => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = id => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    React.useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.includes(key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                onExited: (event, myKey) => {
                    // remove this snackbar from redux store
                    dispatch(removeSnackbarAction(myKey));
                    removeDisplayed(myKey);
                }
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

    return null;
};

export default NotificationComponent;
