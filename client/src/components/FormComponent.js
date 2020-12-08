import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    typography: {
        textTransform: 'uppercase',
        fontWeight: 700
    },
    divider: {
        margin: theme.spacing(1, 0),
    },
    item: {
        margin: theme.spacing(1, 0),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            margin: theme.spacing(0),
        }
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1, 0)
        }
    },
    headline: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2)
        }
    },
    select: {
        [theme.breakpoints.down('sm')]: {
            width: 229
        }
    }
}));

const FormComponent = ({form, handleChangeForm}) => {
    const classes = useStyles();

    return (
        <form noValidate autoComplete="off">
            <Grid container justify="flex-start" alignItems="flex-start">
                <Grid container direction="column" className={classes.headline}>
                    <Typography className={classes.typography}>Personal</Typography>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>First Name:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-first-name"
                            variant="outlined"
                            placeholder="First Name"
                            autoFocus
                            size="small"
                            name="firstName"
                            onChange={handleChangeForm}
                            value={form.firstName}
                        />
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Last Name:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-last-name"
                            variant="outlined"
                            placeholder="Last Name"
                            size="small"
                            name="lastName"
                            onChange={handleChangeForm}
                            value={form.lastName}
                        />
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Login:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-login"
                            variant="outlined"
                            placeholder="Login"
                            size="small"
                            name="login"
                            onChange={handleChangeForm}
                            value={form.login}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="column" className={classes.headline}>
                    <Typography className={classes.typography}>Contact</Typography>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid container justify="center" alignItems="center" item className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Work Phone:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-work-phone"
                            variant="outlined"
                            placeholder="Work Phone"
                            size="small"
                            autoFocus
                            name="workPhone"
                            onChange={handleChangeForm}
                            value={form.workPhone}
                        />
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Personal Phone:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-personal-phone"
                            variant="outlined"
                            placeholder="Personal Phone"
                            size="small"
                            name="personalPhone"
                            onChange={handleChangeForm}
                            value={form.personalPhone}
                        />
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Work Email:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-work-email"
                            variant="outlined"
                            placeholder="Work Email"
                            size="small"
                            name="workEmail"
                            onChange={handleChangeForm}
                            value={form.workEmail}
                        />
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Personal Email:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-personal-email"
                            variant="outlined"
                            placeholder="Personal Email"
                            size="small"
                            name="personalEmail"
                            onChange={handleChangeForm}
                            value={form.personalEmail}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="column" className={classes.headline}>
                    <Typography className={classes.typography}>Employment</Typography>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Business Location:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <FormControl fullWidth className={classes.select} variant="outlined" size="small" placeholder="Business Location">
                            <Select
                                id="demo-controlled-open-select"
                                value={form.businessLocation?.title}
                                onChange={handleChangeForm}
                                MenuProps={{
                                    style: {
                                        zIndex: 9999
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Company:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <FormControl fullWidth className={classes.select} variant="outlined" size="small" placeholder="Company">
                            <Select
                                id="demo-controlled-open-select"
                                value={form.company?.title}
                                onChange={handleChangeForm}
                                MenuProps={{
                                    style: {
                                        zIndex: 9999
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Role:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <FormControl fullWidth className={classes.select} variant="outlined" size="small" placeholder="Role">
                            <Select
                                id="demo-controlled-open-select"
                                value={form.role?.title}
                                onChange={handleChangeForm}
                                MenuProps={{
                                    style: {
                                        zIndex: 9999
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" className={classes.item}>
                    <Grid item xs sm={5} className={classes.title}>
                        <Typography>Hourly Rate:</Typography>
                    </Grid>
                    <Grid item xs sm={5}>
                        <TextField
                            id="id-hourly-rate"
                            variant="outlined"
                            placeholder="Hourly Rate"
                            size="small"
                            name="hourlyRate"
                            onChange={handleChangeForm}
                            value={form.hourlyRate}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default FormComponent;