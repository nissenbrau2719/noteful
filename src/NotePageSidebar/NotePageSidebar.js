import React from "react";
import { withRouter } from "react-router-dom";
import "./NotePageSidebar.css";

function NotePageSidebar(props) {
  return (
    <div className="noteSidebar">
      <button className="goBackBtn" onClick={() => props.history.goBack()}>
        Go back
      </button>
      <h2 className="noteFolder">{props.folderName}</h2>
    </div>
  );
}

export default withRouter(NotePageSidebar);
