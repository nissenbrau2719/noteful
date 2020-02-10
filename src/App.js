import React from 'react';
// import { Route, Link } from 'react-router-dom';
import './App.css';
import dummyStore from './dummy-store';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: dummyStore.folders,
      notes: dummyStore.notes,
      selectedFolder: "",
      selectedNote: "",
    }
  }

  render() {
    return (
      <div className='App'>
        <header>
          <h1>Noteful</h1>
        </header>
        <main>
          <Sidebar className="Sidebar" folders={ this.state.folders } />
          <NoteList className="NoteList" notes={ this.state.notes } />
        </main>
      </div>
      
    );
  }
 
}

export default App;