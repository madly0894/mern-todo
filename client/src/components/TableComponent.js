import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function createData(name, calories, fat, carbs, protein, sa, sw) {
    return {name, calories, fat, carbs, protein, sa, sw};
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3, 5, 6),
    createData('Donut', 452, 25.0, 51, 4.9, 5, 6),
    createData('Eclair', 262, 16.0, 24, 6.0, 5, 6),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 5, 6),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 5, 6),
    createData('Honeycomb', 408, 3.2, 87, 6.5, 5, 6),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 5, 6)
];

const headCells = [
    {id: 1, disablePadding: false, label: 'ID'},
    {id: 2, disablePadding: false, label: 'Full Name'},
    {id: 3, disablePadding: false, label: 'Role'},
    {id: 4, disablePadding: false, label: 'Business Location'},
    {id: 5, disablePadding: false, label: 'Email'},
    {id: 6, disablePadding: false, label: 'Phone'},
    {id: 7, disablePadding: false, label: 'Hourly Rate'},
];

function EnhancedTableHead(props) {
    return (
        <TableHead>
            <TableRow style={{borderBottom: '2px solid rgba(0, 0, 0, .4)'}}>
                <TableCell padding="checkbox">
                    <Typography style={{textAlign: 'center'}}>#</Typography>
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    grid: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    button: {
        width: 200
    }
}));

export default function TableComponent() {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.calories}</TableCell>
                                            <TableCell align="center">{row.fat}</TableCell>
                                            <TableCell align="center">{row.carbs}</TableCell>
                                            <TableCell align="center">{row.protein}</TableCell>
                                            <TableCell align="center">{row.sa}</TableCell>
                                            <TableCell align="center">{row.sw}</TableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows}}>
                                    <TableCell colSpan={8}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.grid}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Add employee
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="outlined" className={classes.button}
                                    disabled={selected.length > 1}>
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="outlined" color="secondary" className={classes.button}
                                    disabled={!selected.length}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                {/*<TablePagination*/}
                {/*    rowsPerPageOptions={[5, 10, 25]}*/}
                {/*    component="div"*/}
                {/*    count={rows.length}*/}
                {/*    rowsPerPage={rowsPerPage}*/}
                {/*    page={page}*/}
                {/*    onChangePage={handleChangePage}*/}
                {/*    onChangeRowsPerPage={handleChangeRowsPerPage}*/}
                {/*/>*/}
            </Paper>
        </div>
    );
}
