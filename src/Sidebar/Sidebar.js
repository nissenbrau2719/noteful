import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import NotefulContext from '../NotefulContext';

class Sidebar extends React.Component {
  static contextType = NotefulContext
  render() {
    console.log(this.props)
    const folderList = this.context.folders.map(folder => {
      return (
        <li key={folder.id} className="folderItem">
          <NavLink
            exact={true}
            activeClassName="isActive"
            to={`/folder/${folder.id}`}
            id={folder.id}
            className="folderLink"
          >
            {folder.name}
          </NavLink>
        </li>
      );
    });

    return (
      <nav className="sideNav">
        <ul className="folderList">{folderList}</ul>
        <button className="addFolderBtn">Add Folder</button>
      </nav>
    );
  }
  
}

export default Sidebar;
