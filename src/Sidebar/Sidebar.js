import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar(props) {
  const folderList = props.folders.map(folder => {
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
    <div className="sideNav">
      <ul className="folderList">{folderList}</ul>
      <button className="addFolderBtn">Add Folder</button>
    </div>
  );
}

export default Sidebar;
