import React, { Component } from 'react';
// import DatePicker from './DatePicker';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { apiURL } from '../config'


class AddList extends Component {
    state = {
        open: false,
        title: "",
        taskIds: []
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        // let data = this.state; 
        await fetch(`${apiURL}/list`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: { //to fix POST body to API. Deleted 's' on end of applications The problem with copy/paste from stackoverflow!  
            'Content-Type': 'application/json'
        }}).then(res => console.log(res.json()))
            .then(() => this.setState({
                title: "",
            }))
            .catch(err => console.log(err));
        // console.log(data)
    };

    render() {
        return (
            <div>
                {/* <Button variant="outlined" size="small" onClick={this.handleClickOpen}>
                    New Task
            </Button> */}
                <Button style={styles.button} onClick={this.handleClickOpen}> <AddCircleIcon style={styles.icon} />Add List</Button>

                <Dialog  {...this.props}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <form onSubmit={this.handleSubmit}>

                        <DialogTitle id="form-dialog-title">{this.state.title}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                type='text'
                                name="title"
                                placeholder='New List...'
                                value={this.state.title}
                                onChange={this.handleChange}
                                fullWidth
                            />
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

const styles = {
  button: {
    // height: "100%",
    width: 300,
    backgroundColor: "#ccc",
  },
  icon: {
      paddingRight: ".5rem",
  }
};

export default AddList;
