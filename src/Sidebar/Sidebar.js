import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar(props) {
  const folderList = props.folders.map(folder => {
    return (
      <NavLink to={`/folder/${folder.id}`}>
        <div
          key={folder.id}
          id={folder.id}
          className="folderLink"
        >
          {folder.name}
        </div>
      </NavLink>
    );
  });

  return (
    <div className="sideNav">
      {folderList}
      <button className="addFolderBtn">Add Folder</button>
    </div>
  );
}

export default Sidebar;
