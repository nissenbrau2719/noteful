import React from 'react'
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ""
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message
    }
  }

  render() {
    if(this.state.hasError) {
      return(
        <h2 errorMessage>Encountered an error, {this.state.errorMessage}</h2>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary