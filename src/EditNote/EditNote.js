import React from 'react'
import NotefulContext from '../NotefulContext'
import ValidationError from '../ValidationError/ValidationError'
import './EditNote.css'
import { withRouter } from 'react-router-dom'


class EditNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      },
      folder: {
        value: "",
        touched: false
      },
      error: null,
    }
  }

  static contextType = NotefulContext
  
  componentDidMount() {
    const noteId = this.props.match.params.noteId
    const url = `http://localhost:8000/api/notes/${noteId}`
    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error('Failed to fetch note data')
        }
        return res.json()
      })
      .then(data => this.setState({
        name: {
          value: data.name
        },
        content: {
          value: data.content
        },
        folder: {
          value: data.folder
        }
      }))
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  handleChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: {
        value: value,
        touched: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, folder, content } = this.state
    const noteId = this.props.match.params.noteId
    const newNoteData = {
      name: name.value,
      folder: folder.value,
      content: content.value
    }
    const noteEndpoint = `http://localhost:8000/api/notes/${noteId}`
    const options = {
      method: 'PATCH',
      body: JSON.stringify(newNoteData),
      headers: {
        'content-type': 'application/json'
      }
    }
    fetch(noteEndpoint, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Failed to update note')
        }
      })
      .then(() => {
        const updatedNoteData = {
          ...newNoteData,
          id: noteId,
          modified: new Date()
        }
        this.context.editNote(updatedNoteData)
      })
      
      .catch(error => this.setState({error: error.message}))
      .then(() => this.props.history.push('/'))
  }

  validateName() {
    const name = this.state.name.value.trim();
    if(name.length === 0){
      return "A note title is required"
    }
  }

  validateFolder() {
    const folder = this.state.folder.value;
    if(folder === "") {
      return "You must select a folder to hold your note"
    }
  }

  validateContent() {
    const content = this.state.content.value.trim();
    if(content.length === 0) {
      return "Why add a note that doesn't say anything?"
    }
  }
  render() {
    const nameError = this.validateName();
    const folderError = this.validateFolder();
    const contentError = this.validateContent();
    const folderList = this.context.folders.map(folder => (
      <option key={folder.id} value={folder.id}>{folder.name}</option>
    ));

    return (
      <form className='editNoteForm' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>
            <h2>Edit Your Note</h2>
          </legend>
          <label className="noteFormLabel" htmlFor="name">Note Title:</label>          
          <input
            type="text"
            className="name_input"
            name="name"
            id="name"
            value={this.state.name.value}
            onChange={e => this.handleChange(e)}
            required
            aria-required="true"
            aria-describedby="nameError"
          />
          {this.state.name.touched && <ValidationError message={nameError} id="nameError"/>}
          <label className="noteFormLabel" htmlFor="folder" >Folder:</label>
          <select 
            name="folder" 
            id="folder"
            onChange={e => this.handleChange(e)}
            value={this.state.folder.value}
            required
            aria-required="true"
            aria-describedby="folderError"
          >
            <option value="">Select a Folder...</option>
            {folderList}
          </select>
          {this.state.folder.touched && <ValidationError message={folderError} id="folderError" />}
          <label className="noteFormLabel" htmlFor="content">Content:</label>
          <textarea 
            id="content" 
            name="content" 
            value={this.state.content.value} 
            onChange={e => this.handleChange(e)}
            required
            aria-required="true"
            aria-describedby="contentError"
          />
          {this.state.content.touched && <ValidationError message={contentError} id="contentError" />}
          <button 
            className="submitNoteBtn"
            type='submit' 
            disabled={
              this.validateContent() ||
              this.validateFolder() ||
              this.validateContent()
            }>
            Update Note
          </button>
        </fieldset>
      </form>
    )
  }
}

export default withRouter(EditNote)