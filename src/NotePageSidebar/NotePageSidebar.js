import React, {Fragment} from "react";
import { withRouter } from "react-router-dom";
import "./NotePageSidebar.css";
import NotefulContext from '../NotefulContext';

class NotePageSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      note: {},
      error: null
    }
  }

  static contextType = NotefulContext
  
  state = {
    note: {},
    folder: {},
    error: null
  }


  componentDidMount() {
    const noteId = this.props.match.params.noteId
    const noteEndpoint = `http://localhost:8000/api/notes/${noteId}`
    fetch(noteEndpoint)
     .then(res => {
       if(!res.ok) {
         throw new Error('Failed to fetch note data')
       }
       return res.json()
     })
     .then(data => this.setState({note: data}))
     .then(() => {
       const folderId = this.state.note.folder
       const folderEndpoint = `http://localhost:8000/api/folders/${folderId}`
       fetch(folderEndpoint)
        .then(res => {
          if(!res.ok) {
            throw new Error('Failed to fetch folder data')
          }
          return res.json()
          .then(data => this.setState({folder: data}))
        })
     })
  }

  render() {
    const { folder } = this.state
    return (
      <Fragment>
        <button className="goBackBtn" onClick={() => this.props.history.goBack()}>
          Go back
        </button>
        {folder && (<h2 className="noteFolder">{folder.name}</h2>)}
      </Fragment>
)
  }
}
// function NotePageSidebar(props) {
//   let featuredNote
//   let featuredFolder
//   return (
//     <NotefulContext.Consumer>
//       {context => {
//         if(props.match.params.noteId) {
//           featuredNote = context.notes.find(note => note.id === props.match.params.noteId)
//           featuredFolder = context.folders.find(folder => folder.id === featuredNote.folderId)
//         }
//         return(
//           <Fragment>
//             <button className="goBackBtn" onClick={() => props.history.goBack()}>
//               Go back
//             </button>
//             {featuredNote && (<h2 className="noteFolder">{featuredFolder.name}</h2>)}
//           </Fragment>
//         )
//       }}
//     </NotefulContext.Consumer>
    
//   );
// }

export default withRouter(NotePageSidebar);
