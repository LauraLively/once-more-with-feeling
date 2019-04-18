import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'; 
import { Grid, Card, CardContent, CardActions, Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import EditIcon from  '@material-ui/icons/Edit';
import CloseIcon from  '@material-ui/icons/Close';
import DeleteIcon from  '@material-ui/icons/Delete';
import EditTask from './EditTask';



const TaskButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
`;


const Container = styled.div`
    padding: 1px;
    margin-bottom: 5px;
    border-radius: 3px;
`;

// const styles = {
//     actions:{
//         display: "flex",
//         justifyContent: "center"
//     }
// }

class Task extends Component {
    state = {
        isUpdating: false
    };

    toggleUpdate = () => {
        this.setState({ isUpdating : !this.state.isUpdating})
    };

    moreButton = () => (
        <TaskButtons>
            <Button onClick={this.toggleUpdate}><MoreHorizIcon/></Button>
        </TaskButtons>

    );

    editDelete =() => (
        <TaskButtons>
            <Button><EditTask task={this.props.task}/></Button>
            <Button><DeleteIcon/></Button> 
            <Button onClick={this.toggleUpdate}><CloseIcon/></Button> 
        </TaskButtons>
    )
    
    //need delete function here

  render() {
      return (
          <Draggable draggableId={this.props.task._id} index={this.props.index}>
          {(provided) =>(
              <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef} >
              <Grid>
                  <Card>
                    <CardContent>
                    {this.props.task.name}
                    {/* <pre>{this.props.task._id}</pre>
                    <pre>{this.props.index}</pre> */}
                    </CardContent>
                    <CardActions className="actions">
                    {this.state.isUpdating ? <this.editDelete/> : <this.moreButton/> }        
                    </CardActions>
                  </Card>
              </Grid>
              </Container>
          )}
          </Draggable>
    )
  }
}

export default Task
