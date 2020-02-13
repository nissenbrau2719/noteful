import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import dummyStore from "./dummy-store";
import Sidebar from "./Sidebar/Sidebar";
import NoteList from "./NoteList/NoteList";
import NotePage from "./NotePage/NotePage";
import NotePageSidebar from "./NotePageSidebar/NotePageSidebar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: dummyStore.folders,
      notes: dummyStore.notes
    };
  }

  render() {
    return (
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
              render={routeProps => (
                <Sidebar folders={this.state.folders} {...routeProps} />
              )}
            />
            <Route
              path="/folder/:folderId"
              render={routeProps => (
                <Sidebar folders={this.state.folders} {...routeProps} />
              )}
            />
            <Route
              path="/note/:noteId"
              render={routeProps => {
                const note = this.state.notes.find(
                  note => note.id === routeProps.match.params.noteId
                );
                const noteFolder = this.state.folders.find(
                  folder => folder.id === note.folderId
                );
                return (
                  <NotePageSidebar
                    folderName={noteFolder.name}
                    {...routeProps}
                  />
                );
              }}
            />
          </Switch>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <NoteList notes={this.state.notes} {...routeProps} />
              )}
            />
            <Route
              path="/folder/:folderId"
              render={routeProps => {
                const displayNotes = this.state.notes.filter(
                  note => note.folderId === routeProps.match.params.folderId
                );
                return <NoteList notes={displayNotes} {...routeProps} />;
              }}
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
    );
  }
}

export default App;
