import React from 'react'
import './ValidationError.css'
import PropTypes from 'prop-types'

export default function ValidationError(props) {
  if(props.message) {
    return (
      <div className="error" id={props.id}>{props.message}</div>
    );
  }
  return <></>
}

ValidationError.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string,
}