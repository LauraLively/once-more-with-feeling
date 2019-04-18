import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { apiURL } from '../config'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//styles
const styles = {
    button: {
        width: "100%",
        marginTop: "1rem",
        marginBottom:0,
    },
    icon: {
        paddingRight:".5rem",
    }
};

class AddTask extends Component {
    state = {
        open: false,
        dueDate: new Date(),
        name: "",
        desc: "",
        listID: this.props.listID
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    dateChange = async (date) => {
        this.setState({
            dueDate: date,
        });
    };
    handleDateChange = async (date) => {
        this.setState({ dueDate: date });
    };
    handleChange = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        let data = this.state; 
        await fetch(`${apiURL}/task`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: { //to fix POST body to API. Deleted 's' on end of applications The problem with copy/paste from stackoverflow!  
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res.json()))
            .then(() => this.setState({
                name: "",
                desc: "",
                dueDate: ""
            }))
            .catch(err => console.log(err));
        console.log(data)
    };

    render() {
        return (
            <div>
                {/* <Button variant="outlined" size="small" onClick={this.handleClickOpen}>
                    New Task
            </Button> */}
                <Button style={styles.button} onClick={this.handleClickOpen}> <AddCircleIcon style={styles.icon} />Add Task</Button>

                <Dialog  {...this.props}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <form onSubmit={this.handleSubmit}>

                        <DialogTitle id="form-dialog-title">{this.state.name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                type='text'
                                name="name"
                                placeholder='New Task...'
                                value={this.state.name}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                type='text'
                                name="desc"
                                placeholder='Description...'
                                value={this.state.desc}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container 
                                // className={classes.grid} 
                                justify="space-around">
                                <DatePicker
                                    margin="normal"
                                    label="Due Date"
                                    value={this.state.dueDate}
                                    onChange={this.handleDateChange}
                                    disablePast= {true}
                                />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} >
                                Cancel
                            </Button>
                            <Button type="submit" onClick={this.handleClose} >
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
};

export default AddTask;
