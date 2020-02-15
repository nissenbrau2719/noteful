import React from "react";
import { withRouter } from "react-router-dom";
import "./NotePageSidebar.css";
import NotefulContext from '../NotefulContext';

function NotePageSidebar(props) {
  return (
    <NotefulContext.Consumer>
      {context => {
        const featuredNote = context.notes.find(note => note.id === props.match.params.noteId)
        const featuredFolder = context.folders.find(folder => folder.id === featuredNote.folderId)
        return(
          <nav className="noteSidebar">
            <button className="goBackBtn" onClick={() => props.history.goBack()}>
              Go back
            </button>
            <h2 className="noteFolder">{featuredFolder.name}</h2>
          </nav>
        )
      }}
    </NotefulContext.Consumer>
    
  );
}

export default withRouter(NotePageSidebar);
