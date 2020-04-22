import React, {Fragment} from "react";
import { withRouter } from "react-router-dom";
import "./NotePageSidebar.css";
import NotefulContext from '../NotefulContext';

function NotePageSidebar(props) {
  let featuredNote
  let featuredFolder
  return (
    <NotefulContext.Consumer>
      {context => {
        if(props.match.params.noteId) {
          featuredNote = context.notes.find(note => note.id === props.match.params.noteId)
          featuredFolder = context.folders.find(folder => folder.id === featuredNote.folder)
        }
        return(
          <Fragment>
            <button className="goBackBtn" onClick={() => props.history.goBack()}>
              Go back
            </button>
            {featuredNote && (<h2 className="noteFolder">{featuredFolder.name}</h2>)}
          </Fragment>
        )
      }}
    </NotefulContext.Consumer>
    
  );
}

export default withRouter(NotePageSidebar);
