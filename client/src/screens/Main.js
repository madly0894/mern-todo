import React, {useEffect} from 'react';
import TableComponent from "../components/TableComponent";
import {getAllEmployees} from "../store/actions/actions";
import {useDispatch, useSelector} from "react-redux";
import DialogComponent from "../components/DialogComponent";

const Main = () => {
    const dispatch = useDispatch();
    const employees = useSelector(({ reducers }) => reducers.employees);

    useEffect(() => {
        dispatch(getAllEmployees())
    }, [dispatch]);

    const headCells = React.useMemo(() => [
        {id: 1, disablePadding: false, label: 'ID'},
        {id: 2, disablePadding: false, label: 'Full Name'},
        {id: 3, disablePadding: false, label: 'Role'},
        {id: 4, disablePadding: false, label: 'Business Location'},
        {id: 5, disablePadding: false, label: 'Email'},
        {id: 6, disablePadding: false, label: 'Phone'},
        {id: 7, disablePadding: false, label: 'Hourly Rate'}
    ], []);

    const rows = React.useMemo(() => employees, [employees]);

    return (
        <>
            <TableComponent rows={rows} headCells={headCells} />
            <DialogComponent />
        </>
    );
};

export default Main;