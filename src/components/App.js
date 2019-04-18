import React, { Component } from 'react';
import '../styles/App.css';
import styled from 'styled-components';
import List from './List';
import { DragDropContext } from 'react-beautiful-dnd';
import Appbar from './Appbar';
import TemporaryDrawer from './Drawer'
import AddList from './AddList';

//api
import { apiURL } from '../config';


const ListContainer = styled.div`
  text-align: center;
  padding: 8px;
  margin: 20px;
  display: flex;
  flex-direction: row;
`;

const Top = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
`;

class App extends Component {
  state = { lists: [] };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

  if (!destination) {
    return;
  }

  if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
  ) {
      return;
  }
  const data = Object.assign([], this.state.lists);
  const listIndex = data.findIndex(l => l._id === source.droppableId);
  
  data[listIndex].taskIds.splice(source.index, 1);
  data[listIndex].taskIds.splice(destination.index, 0, draggableId);

 this.setState({lists:data})
};

  getLists = async () => {
    const BoardId = '5ca3f3181c9d4400000ac12d';
    await fetch(`${apiURL}/listByBoardId/${BoardId}`)
    .then(response => response.json())
    .then(data => this.setState({lists:data}) )
    .catch( err => console.log(err))
    };

    componentDidMount() {
      this.getLists()
    };

  render() {
    const lists = this.state.lists
    return( 
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div className="App">
        <Appbar/>
        <Top>
        <TemporaryDrawer />
        </Top>
        <ListContainer>
          {/* {this.state.lists.map(listId => {
          const list = this.state.lists[listId];
          const tasks = list.taskIds.map(taskIds => this.state.tasks[taskIds]);
          return <List key={list._id} list={list} tasks={tasks} />
        })} */}

        {Object.keys(lists).map((key, index) => <List key={key} list={lists[key]} index={index} />)} 

        {/* {this.state.lists} */}
        <AddList/>
        </ListContainer>
      </div>
      </DragDropContext>
    )
  }
}

export default App;
