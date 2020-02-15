import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import NoteList from "./NoteList/NoteList";
import NotePage from "./NotePage/NotePage";
import NotePageSidebar from "./NotePageSidebar/NotePageSidebar";
import NotefulContext from './NotefulContext';

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
    const foldersEndpoint = "http://localhost:9090/folders";
    const notesEndpoint = "http://localhost:9090/notes";

    Promise.all([
      fetch(foldersEndpoint),
      fetch(notesEndpoint)
    ])
      .then(([foldersRes, notesRes]) => {
        if(!foldersRes.ok || !notesRes.ok) {
          throw new Error('failed to fetch data')
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

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
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
          <main>
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
            </Switch>
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
                render={routeProps => {
                  const note = this.state.notes.find(
                    note => note.id === routeProps.match.params.noteId
                  );

                  return <NotePage note={note} {...routeProps} />;
                }}
              />
            </Switch>
          </main>
        </div>
      </NotefulContext.Provider>
      
    );
  }
}

export default App;
