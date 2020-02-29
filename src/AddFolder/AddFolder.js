import React from 'react';
import uuid from 'react-uuid';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';
import './AddFolder.css'

class AddFolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folderName: {
        value: "",
        touched: false
      },
      folderId: "",
      error: null
    }
  }
  
  static contextType = NotefulContext

  updateFolderName(folderName) {
    this.setState({
      folderName: {
        value: folderName,
        touched: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newFolder = {
      id: this.state.folderId,
      name: this.state.folderName.value
    }
    const foldersEndpoint = "http://localhost:9090/folders"
    const options = {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: {
        'content-type': 'application/json'
      }
    }
    console.log(options.body)
    fetch(foldersEndpoint, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Failed to add new folder')
        }
        return res.json()
      })
      .then(() => {
        this.context.addFolder(newFolder)
      })
      
      .catch(error => this.setState({error: error.message}))
      .then(() => this.props.history.push('/'))
  }

  componentDidMount() {
    const newFolderId = uuid();
    this.setState({
      folderId: newFolderId
    })
  }
  
  validateName() {
    if(this.state.folderName.value.trim().length === 0) {
      return "You must name your folder"
    }
  }
  render() {
    const nameError = this.validateName();
    return(
      <form className="addFolderForm" onSubmit={e => this.handleSubmit(e)}>
        <fieldset>
          <legend><h2>Add a New Folder</h2></legend>
          <label htmlFor="folderName">Folder Name:</label>          
          <input
            type="text"
            className="folderName_input"
            name="folderName"
            id="folderName"
            onChange={e => this.updateFolderName(e.target.value)}
            required
            aria-required="true"
            aria-describedby="nameError"
          />
          {this.state.folderName.touched && <ValidationError message={nameError} id="nameError"/>}
          <button className="submitFolderBtn" type='submit' disabled={!this.state.folderName.touched || this.state.folderName.value.trim().length < 1}>
            Create Folder
          </button>
          
        </fieldset>
      </form>
    )
  }
}

export default AddFolder