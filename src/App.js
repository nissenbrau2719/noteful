import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import dummyStore from './dummy-store';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import NotePageSidebar from './NotePageSidebar/NotePageSidebar';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: dummyStore.folders,
      notes: dummyStore.notes,
      selectedFolder: {},
      selectedNote: {},
      selectedNoteFolderName: "",
      displayNotes: dummyStore.notes,
    }
  }

  handleFolder = (folderId) => {
    let selectFolder = this.state.folders.find(folder => folder.id === folderId)
    let selectDisplayNotes = this.state.notes.filter(note => note.folderId === folderId);
    this.setState({
      selectedFolder: selectFolder,
      displayNotes: selectDisplayNotes
    });
  }

  handleNote = (noteId) => {
    let selectNote = this.state.notes.find(note => note.id === noteId);
    let selectFolder = this.state.folders.find(folder => folder.id === selectNote.folderId)
    this.setState({
      selectedNote: selectNote,
      selectedNoteFolderName: selectFolder.name
    })
  }


  render() {
    
    return (
      <div className='App'>
        <header>
          <h1>
            <Link className='heading' to='/'>Noteful</Link>
          </h1>
          
        </header>
        <main>
          <Switch>
            <Route 
              exact 
              path='/' 
              render={() => 
                <Sidebar  
                  folders={ this.state.folders } 
                  handleFolder={ this.handleFolder } 
                />}
            />
            <Route
              path='/folder/:folderId'
              render={() => 
                <Sidebar 
                  folders={ this.state.folders } 
                  handleFolder={ this.handleFolder } 
                />} 
            />
            <Route
              path='/note/:noteId'
              render={() => 
                <NotePageSidebar
                  folderName={this.state.selectedNoteFolderName}
                />}
            />
          </Switch>
          <Switch>
            <Route
              exact
              path='/'
              render={() => 
                <NoteList 
                  notes={ this.state.notes }
                  handleNote={ this.handleNote }
                />}
            />
            <Route
              path='/folder/:folderId'
              render={() => 
                <NoteList 
                  notes={ this.state.displayNotes }
                  handleNote={ this.handleNote }
                />}
            />
            <Route
              path='note/:noteId'
              render={() => 
                <NotePage
                  note={this.state.selectedNote}
                />}
            />
          </Switch>
        </main>
      </div>
      
    );
  }
 
}

export default App;