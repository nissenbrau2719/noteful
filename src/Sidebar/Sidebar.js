import React, { Fragment } from "react";
import "./Sidebar.css";
import { NavLink, Link, withRouter } from "react-router-dom";
import NotefulContext from '../NotefulContext';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class Sidebar extends React.Component {
  static contextType = NotefulContext
  state = {
    error: null
  }
  
  handleDelete = (folderId) => {
    let confirmDelete = window.confirm('Delete this folder? All associated notes will also be deleted.')
    if(confirmDelete === true) {
      const folderEndpoint = `http://localhost:8000/api/folders/${folderId}`;
      const options = { 
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      }
      fetch(folderEndpoint, options)
        .then(res => {
          if(!res.ok) {
            throw new Error("Failed to delete")
          }
        })
        .then(() => {
          this.context.deleteFolder(folderId)
          if(this.props.match.params.folderId === folderId) {
            this.props.history.push('/')
          }
          
        })
    }
  }
  render() {
    
    const folderList = this.context.folders.map(folder => {
      const noteCount =  this.context.notes.filter(note => note.folder === folder.id).length
      return (
        <li key={folder.id} className="folderItem">
          <i className='fa fa-trash' aria-hidden='true' aria-label={`delete ${folder.name} folder`} id={folder.id} title={`Delete ${folder.name} Folder`} onClick={e => this.handleDelete(e.target.id)}></i>
          <NavLink
            exact={true}
            activeClassName="active"
            to={`/folder/${folder.id}`}
            className="folderLink"
          >
            
            {folder.name}
            
          </NavLink>
          <span className="count">{noteCount}</span>
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

export default withRouter(Sidebar);
