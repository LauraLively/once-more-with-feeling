import React, { Component } from 'react';
// import DatePicker from './DatePicker';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import {apiURL} from '../config';
import EditIcon from  '@material-ui/icons/Edit';


class EditTask extends Component {
    state = {
        open: false,
        _id: this.props.task._id,
        name: this.props.task.name,
        desc: this.props.task.desc,
        dueDate: this.props.task.dueDate,
        listID: this.props.task.listID

      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    dateChange = async (date) => {
        this.setState({
            dueDate: date,
        })
    };
    handleDateChange = async (date) => {
        this.setState({ dueDate: date });
      };
    
    handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(`${apiURL}/task/${this.props.task._id}`, {
            method: "PUT",
            body: JSON.stringify(this.state)
        }).then(res => console.log(res.json()))
            .then(() => this.setState({
                name: "",
                desc: "",
                dueDate: "",
            }))
            .catch(err => console.log(err))
    }

      render() {
        return (
          <div>
            {/* <Button variant="outlined" size="small"  onClick={this.handleClickOpen}>
              Update
            </Button> */}
            <EditIcon onClick={this.handleClickOpen}/>
            {/* <i class="far fa-edit"  onClick={this.handleClickOpen}></i> */}
            <Dialog  {...this.props}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
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

export default EditTask;
