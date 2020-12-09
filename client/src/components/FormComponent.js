import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import db from "../store/db";
import {useSelector} from "react-redux";
import NumberFormat from 'react-number-format';
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
    typography: {
        textTransform: 'uppercase',
        fontWeight: 700,
        color: 'rgba(0, 0, 0, .5)'
    },
    fieldLabel: {
        color: 'rgba(0, 0, 0, .5)',
        fontWeight: 500
    },
    divider: {
        margin: theme.spacing(1, 0),
    },
    item: {
        margin: theme.spacing(1, 20),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1, 5),
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            margin: theme.spacing(0),
        }
    },
    title: {
        paddingTop: 10,
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
            margin: theme.spacing(1, 0)
        }
    },
    headline: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(2)
        }
    },
    select: {
        flex: 1,
        minWidth: 180
    },
    lastInput: {
        width: 114.5,
        [theme.breakpoints.down("xs")]: {
            width: '100%'
        }
    },
}));

const hasErrors = (key) => {
    return key?.map((err, i) => (
        <React.Fragment key={i}>
            <span>{err.msg}</span>
            <br/>
        </React.Fragment>
    ))
};

const FormComponent = ({form, handleChangeForm}) => {
    const classes = useStyles();
    const {errors} = useSelector(({ todo }) => todo);

    const {businessLocations, companies, roles} = db;

    return (
        <form noValidate autoComplete="off">
            <Grid container justify="flex-start" alignItems="flex-start">
                <Grid container direction="column" className={classes.headline}>
                    <Typography className={classes.typography}>Personal</Typography>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>First Name:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-first-name"
                            variant="outlined"
                            placeholder="First Name"
                            autoFocus
                            error={!!errors?.firstName}
                            size="small"
                            name="firstName"
                            onChange={handleChangeForm}
                            value={form.firstName}
                        />
                        <FormHelperText>{hasErrors(errors?.firstName)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Last Name:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-last-name"
                            variant="outlined"
                            placeholder="Last Name"
                            error={!!errors?.lastName}
                            size="small"
                            name="lastName"
                            onChange={handleChangeForm}
                            value={form.lastName}
                        />
                        <FormHelperText>{hasErrors(errors?.lastName)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Login:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-login"
                            variant="outlined"
                            placeholder="Login"
                            error={!!errors?.login}
                            size="small"
                            name="login"
                            onChange={handleChangeForm}
                            value={form.login}
                        />
                        <FormHelperText>{hasErrors(errors?.login)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container direction="column" className={classes.headline}>
                    <Typography className={classes.typography}>Contact</Typography>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid container justify="center" item className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Work Phone:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <NumberFormat
                            customInput={TextField}
                            id="id-work-phone"
                            placeholder="Work Phone"
                            error={!!errors?.workPhone}
                            size="small"
                            name="workPhone"
                            onChange={handleChangeForm}
                            value={form.workPhone}
                            variant="outlined"
                            format="###-###-####"
                        />
                        <FormHelperText>{hasErrors(errors?.workPhone)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Personal Phone:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <NumberFormat
                            customInput={TextField}
                            id="id-personal-phone"
                            variant="outlined"
                            placeholder="Personal Phone"
                            error={!!errors?.personalPhone}
                            size="small"
                            name="personalPhone"
                            onChange={handleChangeForm}
                            value={form.personalPhone}
                            format="###-###-####"
                        />
                        <FormHelperText>{hasErrors(errors?.personalPhone)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Work Email:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-work-email"
                            variant="outlined"
                            type="email"
                            placeholder="Work Email"
                            error={!!errors?.workEmail}
                            size="small"
                            name="workEmail"
                            onChange={handleChangeForm}
                            value={form.workEmail}
                        />
                        <FormHelperText>{hasErrors(errors?.workEmail)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Personal Email:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-personal-email"
                            variant="outlined"
                            type="email"
                            placeholder="Personal Email"
                            error={!!errors?.personalEmail}
                            size="small"
                            name="personalEmail"
                            onChange={handleChangeForm}
                            value={form.personalEmail}
                        />
                        <FormHelperText>{hasErrors(errors?.personalEmail)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container direction="column" className={classes.headline}>
                    <Typography className={classes.typography}>Employment</Typography>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Business Location:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <Autocomplete
                            size="small"
                            className={classes.select}
                            id="id-business-location"
                            options={businessLocations}
                            getOptionSelected={(option, value) => option.title === value.title}
                            value={form.businessLocation}
                            onChange={(option, value) => {
                                handleChangeForm(value, 'businessLocation');
                            }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                   error={!!errors?.businessLocation}
                                   placeholder="Business Location" variant="outlined"
                                />
                            )}
                        />
                        <FormHelperText>{hasErrors(errors?.businessLocation)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Company:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <Autocomplete
                            size="small"
                            className={classes.select}
                            id="id-company"
                            options={companies}
                            getOptionSelected={(option, value) => option.title === value.title}
                            value={form.company}
                            onChange={(option, value) => {
                                handleChangeForm(value, 'company');
                            }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Company"
                                    variant="outlined"
                                    error={!!errors?.company}
                                />
                            )}
                        />
                        <FormHelperText>{hasErrors(errors?.company)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Role:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <Autocomplete
                            size="small"
                            className={classes.select}
                            id="id-role"
                            options={roles}
                            getOptionSelected={(option, value) => option.title === value.title}
                            value={form.role}
                            onChange={(option, value) => {
                                handleChangeForm(value, 'role');
                            }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={!!errors?.role}
                                    placeholder="Role"
                                    variant="outlined"
                                />
                            )}
                        />
                        <FormHelperText>{hasErrors(errors?.role)}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container item justify="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography className={classes.fieldLabel}>Hourly Rate:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <NumberFormat
                            customInput={TextField}
                            id="id-hourly-rate"
                            variant="outlined"
                            placeholder="Hourly Rate"
                            error={!!errors?.hourlyRate}
                            size="small"
                            name="hourlyRate"
                            onChange={handleChangeForm}
                            value={form.hourlyRate}
                            className={classes.lastInput}
                            format="##.00"
                        />
                        <FormHelperText>{hasErrors(errors?.hourlyRate)}</FormHelperText>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default FormComponent;
