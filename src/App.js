import React from 'react';
// import { Route, Link } from 'react-router-dom';
import './App.css';
import dummyStore from './dummy-store';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: dummyStore.folders,
      notes: dummyStore.notes,
      selectedFolder: "",
      selectedNote: "",
      displayNotes: dummyStore.notes,
    }
  }

  handleFolder = (folderId) => {
    let selectDisplayNotes = this.state.notes.filter(note => note.folderId === folderId);
    this.setState({
      selectedFolder: folderId,
      displayNotes: selectDisplayNotes
    });
  }

  handleNote = (noteId) => {
    this.setState({
      selectedNote: noteId
    })
  }

 


  render() {

    let notePageNote;
    let notePageFolder;
    
    if (this.state.selectedNote !== "") {
      notePageNote = this.state.notes.find(note => {
        if(note.id === this.state.selectedNote) {
          return note;
        }
      })

      notePageFolder = this.state.folders.find(folder => {
        if(folder.id === notePageNote.folderId) {
          return folder;
        }
      })
    }
    
    return (
      <div className='App'>
        <header>
          <h1>Noteful</h1>
        </header>
        <main>
          <Sidebar className="Sidebar" folders={ this.state.folders} handleFolder={ this.handleFolder } />
          <NoteList className="NoteList" notes={ this.state.displayNotes } handleNote={ this.handleNote } />
          { this.state.selectedNote && <NotePage note={ notePageNote } folderName={ notePageFolder.name } /> }
        </main>
      </div>
      
    );
  }
 
}

export default App;