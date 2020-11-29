import React, { Component } from 'react'
import styled from "styled-components";

export class ErrorBoundary extends Component {

  constructor( props ){
    super(props)

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError( error ) {
    return {
      hasError: true
    }
  }

  render() {
    if (this.state.hasError) {
      this.state = {
        hasError: false
        // reset error state so user can continue
      }
      return <Error>Sorry... that search had a problem</Error>
    }
    return this.props.children;
  }
}

const Error = styled.h3`
  text-align: center;
  color: red;
`;


export default ErrorBoundary