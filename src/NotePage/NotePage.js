import React from 'react';
import './NotePage.css';
import Note from '../Note/Note';
import './NotePage.css';
import NotefulContext from '../NotefulContext';

class NotePage extends React.Component {
  state = {
    note: {}
  }
  static contextType = NotefulContext

  componentDidMount() {
    const noteId = this.props.match.params.noteId
    const url = `http://localhost:9090/notes/${noteId}`
    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error('Failed to fetch note data')
        }
        return res.json()
      })
      .then(data => this.setState({note: data}))
  }
    

  render() {
    const { note } = this.state
    return (
      <div className='noteMain'>
        <Note note={note} {...this.props}/>
        <p className='noteContent'>
          {note.content}
        </p>
      </div>
    );
  }
  
}

export default NotePage;