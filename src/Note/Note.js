import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';


function Note(props) {
  
  return (
    <NotefulContext.Consumer>
      {context => {
        const handleDelete = (noteId) => {
          const noteEndpoint = `http://localhost:9090/notes/${noteId}`;
          const options = { 
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            }
          }
          fetch(noteEndpoint, options)
            .then(res => {
              if(!res.ok) {
                return(res.json()).then(error => {throw new Error("Failed to delete", error.message)})
              }
            })
            .then(() => {
              if(props.history) {
                props.history.push('/')
              }
              context.deleteNote(noteId)
              
            })
            .catch(error => console.log(error.message))
        }
        const formattedDate = new Date(props.note.modified).toDateString();

        return (
          <div className='Note'>
            <h2 className='noteTitle' >
              <Link to={`/note/${props.note.id}`} id={props.note.id} >{props.note.name}</Link>
            </h2>
            {!props.note.id && <div className="errorMessage">Couldn't get this note</div>}
            <div className='noteDetails'>
              <p className='modified'>Modified on {formattedDate}</p>
              <button className='deleteBtn' id={props.note.id} onClick={e => handleDelete(e.target.id)}>Delete Note</button>
            </div>
          </div>
        )
      }}
    </NotefulContext.Consumer> 
  );
}

Note.defaultProps = {
  deleteNote: () => {}
}

Note.propTypes = {
  note: PropTypes.object.isRequired
}
export default Note;