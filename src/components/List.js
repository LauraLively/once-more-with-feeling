import React, { Component } from 'react';
import styled from 'styled-components';
import Task from './Task'
import { apiURL } from '../config'
import {Droppable} from 'react-beautiful-dnd';
import AddTask from './AddTask';
import { Grid, Card, CardContent } from '@material-ui/core';


//styled components
const Container = styled.div`
    padding: 0px;
    margin: 4px;
    min-width: 200px;
`;
const Title = styled.h3`
    padding: 0px;
    margin: 0px;
`;
const TaskList = styled.div`
    padding: 1px !important;
`;

//styles
const styles = {
    card:{
        minWidth: 275,
        width: 300,
        backgroundColor: "#ccc",
        marginRight: ".5em",
    },
    taskButton:{
        margin: "6rem",
    }
}


class List extends Component {
    state={
        tasks: []
    };

    getTasks = async () => {
        console.log("fetchid", this.props.list._id, this.props.list.taskIds)
        await fetch(`${apiURL}/tasksByListId/${this.props.list._id}`)
            .then(response => response.json())
            // .then(data => data.map((element, index) => <Task key={element._id} task={element} index={index} />))
            // .then(components => this.setState({ tasks: components }))
            .then(data => this.setState({tasks : data}))
            .catch(err => console.log(err))
        };
    componentDidMount() {
    this.getTasks()
    };  
render() {
    let sortedTasks = Object.assign([], this.state.tasks);
    let taskIdOrder = this.props.list.taskIds;
    sortedTasks.sort((a, b) => {  
        return taskIdOrder.indexOf(a._id) - taskIdOrder.indexOf(b._id);
      });

    return (
      <Container>
          <Grid>
              <Card style={styles.card}>
                  <CardContent>
            <Title>{this.props.list.title}</Title>
            <Droppable droppableId={this.props.list._id}>
            {(provided) => (
                <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {Object.keys(sortedTasks).map((key, index) => <Task key={key} task={sortedTasks[key]} index={index} />)} 
                    {/* {this.state.tasks.map(task => <Task key={task.id} task={task} />)}  */}
                    {provided.placeholder}
                    <AddTask style={styles.taskButton}/>
                </TaskList>
               
            )}
            </Droppable>
            </CardContent>
              </Card>
          </Grid>
        </Container>

    )
  }
}

export default List
