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

        return (<Error>oops... nothing found</Error>) 
      }
      
    return this.props.children;
  }
}

const Error = styled.h3`
  text-align: center;
  color: red;
`;


export default ErrorBoundary