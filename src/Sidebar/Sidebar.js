import React from 'react';
import './Sidebar.css';
// import { NavLink } from 'react-router-dom';


function Sidebar(props) {

  const folderList = props.folders.map(folder => {
    return <div key={folder.id} className='folderLink'>
     {folder.name}
    </div>
  });

  return(
    <div className="sideNav">
      {folderList}
      <button className='addFolderBtn'>Add Folder</button>
    </div>
  );
}

export default Sidebar;