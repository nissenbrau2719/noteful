import React from 'react'
import uuid from 'react-uuid'
import NotefulContext from '../NotefulContext'

export default class AddNote extends React.Component {
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
      folderId: {
        value: "",
        touched: false
      },
      id: "",
      modified: "",
      error: null,
    }
  }

  static contextType = NotefulContext

  // updateName(name) {
  //   this.setState({
  //     name: {
  //       value: name,
  //       touched: true
  //     }
  //   })
  // }

  // updateContent(content) {
  //   this.setState({
  //     content: {
  //       value: content,
  //       touched: true
  //     }
  //   })
  // }

  // updateFolderId(folder) {
  //   this.setState({
  //     folderId: {
  //       value: folder,
  //       touched: true
  //     }
  //   })
  // }

  createIdAndModified() {
    const newId = uuid()
    const modified = new Date()
    this.setState({
      id: newId,
      modified: modified
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
    const newNote = {
      id: this.state.id,
      name: this.state.name.value,
      folderId: this.state.folderId.value,
      modified: this.state.modified,
      content: this.state.content.value
    }
    const notesEndpoint = "http://localhost:9090/folders"
    const options = {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json'
      }
    }
    console.log(options.body)
    fetch(notesEndpoint, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Failed to add new note')
        }
        return res.json()
      })
      .then(() => {
        this.context.addNote(newNote)
      })
      
      .catch(error => this.setState({error: error.message}))
      .then(() => this.props.history.push('/'))
  }

  componentDidMount() {
    this.createIdAndModified();
  }

  render() {
    const folderList = this.context.folders.map(folder => (
      <option key={folder.id} value={folder.id}>{folder.name}</option>
    ))
    return(
      <form className="addNoteForm" onSubmit={e => this.handleSubmit(e)}>
        <fieldset>
          <legend><h2>Add a New Note</h2></legend>
          <label className="noteFormLabel" htmlFor="name">Note Title:</label>          
          <input
            type="text"
            className="name_input"
            name="name"
            id="name"
            value={this.state.name.value}
            onChange={e => this.handleChange(e)}
            required
          />
          <select 
            name="folderId" 
            onChange={e => this.handleChange(e)}
            value={this.state.folderId.value}
            required
          >
            <option value="">Select a Folder...</option>
            {folderList}
          </select>
          <label className="noteFormLabel" htmlFor="content">Content:</label>
          <textarea 
            id="content" 
            name="content" 
            value={this.state.content.value} 
            onChange={e => this.handleChange(e)}
            required
          />
          <button 
            type='submit' 
            disabled={
              (!this.state.name.touched || this.state.name.value.trim().length < 1) &&
              (!this.state.folderId.touched || this.state.folderId.value === "") &&
              (!this.state.content.touched || this.state.content.value.trim().length < 1)
            }>
            Submit Note
          </button>
        </fieldset>
      </form>
    )
  }
}


