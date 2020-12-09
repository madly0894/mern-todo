import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import ActionComponent from "./ActionComponent";
import {useSelector} from "react-redux";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";
import LoadingComponent from "./LoadingComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 1024,
    },
    grid: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
    },
    tableContainer: {
        position: 'relative',
    },
    tableHeadRow: {
        borderBottom: '2px solid rgba(0, 0, 0, .2)'
    },
    table: {
        minWidth: 992,
        border: '1px solid rgba(224, 224, 224, 1)',
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
    footer: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    }
}));

function EnhancedTableHead({ headCells }) {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow className={classes.tableHeadRow}>
                <TableCell padding="checkbox">
                    <Typography align="center">#</Typography>
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
        cursor: 'pointer',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    }
}))(TableRow);

const TableComponent = ({ rows, headCells }) => {
    const [selected, setSelected] = React.useState([]);
    const [selectedRowData, setSelectedRowData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {success} = useSelector(({ todo }) => todo);
    const {open} = useSelector(({ settings }) => settings.dialog);
    const classes = useStyles({open});

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    useEffect(() => {
        if (success) setSelected([]);
    }, [success]);

    const handleClick = (row) => {
        const {_id} = row;

        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
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

        setSelectedRowData(row);
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
                <TableContainer className={classes.tableContainer}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            classes={classes}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow
                                            hover
                                            onClick={(event) => handleClick(row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{`${row.firstName} ${row.lastName}`}</TableCell>
                                            <TableCell align="center">{row.role.title}</TableCell>
                                            <TableCell align="center">{row.businessLocation.title}</TableCell>
                                            <TableCell align="center">{row.personalEmail}</TableCell>
                                            <TableCell align="center">{row.personalPhone}</TableCell>
                                            <TableCell align="center">{row.hourlyRate} / h</TableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows, }}>
                                    <TableCell colSpan={8} style={{ border: 'none' }}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <LoadingComponent />
                </TableContainer>
                <Grid container alignItems="center" className={classes.footer}>
                    <Grid item xs={12} sm={7}>
                        <ActionComponent selectedRowData={selectedRowData} selectedRowIds={selected} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default TableComponent;
