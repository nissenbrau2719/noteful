import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import NoteList from "./NoteList/NoteList";
import NotePage from "./NotePage/NotePage";
import NotePageSidebar from "./NotePageSidebar/NotePageSidebar";
import NotefulContext from './NotefulContext';
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import EditNote from "./EditNote/EditNote";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      error: null,
    };
  }

  static contextType = NotefulContext;

  componentDidMount() {
    const foldersEndpoint = "http://localhost:8000/api/folders";
    const notesEndpoint = "http://localhost:8000/api/notes";

    Promise.all([
      fetch(foldersEndpoint),
      fetch(notesEndpoint)
    ])
      .then(([foldersRes, notesRes]) => {
        if(!foldersRes.ok || !notesRes.ok) {
          throw new Error('failed to retrieve data')
        }
       return Promise.all([foldersRes.json(), notesRes.json()])
      })
      .then(([foldersData, notesData]) => {
        this.setState({
          folders: foldersData,
          notes: notesData,
        })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  deleteNote = (noteId) => {
    const updatedNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: updatedNotes
    })
  }

  deleteFolder = (folderId) => {
    const updatedFolders = this.state.folders.filter(folder => folder.id !== folderId)
    const updatedNotes = this.state.notes.filter(note => note.folder !== folderId)
    this.setState({
      folders: updatedFolders,
      notes: updatedNotes
    })
  }

  addFolder = (newFolder) => {
    const updatedFolders = this.state.folders.concat([newFolder])
    this.setState({
      folders: updatedFolders
    })
  }

  addNote = (newNote) => {
    const updatedNotes = this.state.notes.concat([newNote])
    this.setState({
      notes: updatedNotes
    })
  }

  editNote = (updatedNoteData) => {
    const updatedNotes = this.state.notes.filter(note => note.id !== updatedNoteData.id).concat([ updatedNoteData ])
    this.setState({
      notes: updatedNotes
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder,
      deleteFolder: this.deleteFolder,
      editNote: this.editNote
    }

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <header>
            <h1>
              <Link className="heading" to="/">
                Noteful
              </Link>
            </h1>
          </header>
          <ErrorBoundary>
            <nav>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={ Sidebar }
                />
                <Route
                  path="/folder/:folderId"
                  component = { Sidebar }
                />
                <Route
                  path="/note/:noteId"
                  component={ NotePageSidebar }
                />
                <Route
                  path="/addFolder"
                  component={ NotePageSidebar }
                />
                <Route
                  path="/addNote"
                  component={ NotePageSidebar }
                />
                <Route
                  path="/editNote/:noteId"
                  component={ NotePageSidebar }
                />
              </Switch>
            </nav>
          </ErrorBoundary>
          <ErrorBoundary>
            <main>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={ NoteList }
                />
                <Route
                  path="/folder/:folderId"
                  component={ NoteList }
                />
                <Route
                  path="/note/:noteId"
                  component={ NotePage }
                />
                <Route
                  path="/addFolder"
                  component={ AddFolder }
                />
                <Route
                  path="/addNote"
                  component={ AddNote }
                />
                <Route
                  path="/editNote/:noteId"
                  component={ EditNote }
                />
              </Switch>
            </main>
          </ErrorBoundary>            
        </div>
      </NotefulContext.Provider>  
    );
  }
}

export default App;
