import React from "react";
import "./Sidebar.css";
import { NavLink, Link } from "react-router-dom";
import NotefulContext from '../NotefulContext';

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
            id={folder.id}
            className="folderLink"
          >
            {folder.name}<span className="count">{noteCount}</span>
          </NavLink>
          
        </li>
      );
    });

    return (
      <nav className="sideNav">
        <ul className="folderList">
          {folderList}
        </ul>
        <Link to="/addFolder">
          <button className="addFolderBtn">
            Add Folder
          </button>
        </Link>
      </nav>
    );
  }
  
}

export default Sidebar;
