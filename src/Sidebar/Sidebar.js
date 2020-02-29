import React, { Fragment } from "react";
import "./Sidebar.css";
import { NavLink, Link } from "react-router-dom";
import NotefulContext from '../NotefulContext';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class Sidebar extends React.Component {
  static contextType = NotefulContext
  render() {
    const folderList = this.context.folders.map(folder => {
      const noteCount =  this.context.notes.filter(note => note.folderId === folder.id).length
      return (
        <li key={folder.id} className="folderItem">
          <NavLink
            exact={true}
            activeClassName="active"
            to={`/folder/${folder.id}`}
            className="folderLink"
          >
            {folder.name}<span className="count">{noteCount}</span>
          </NavLink>
        </li>
      );
    });

    return (
      <ErrorBoundary>
        <Fragment>
          <ul className="folderList">
            {folderList}
            {folderList.length === 0 && <div className="errorMessage">Couldn't fetch folders, please try again later</div>}
          </ul>
          <Link to="/addFolder">
            <button className="addFolderBtn">
              Add Folder
            </button>
          </Link>
        </Fragment>
      </ErrorBoundary>
      
    );
  }
  
}

export default Sidebar;
