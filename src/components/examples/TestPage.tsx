import React from 'react'
import { FirebaseAuthProvider } from '../../context/AuthContext'
import ExampleSignup from './ExampleSignup'


class TestPage extends React.Component {
  render () {
    return (
      <FirebaseAuthProvider >
        < ExampleSignup />
      </FirebaseAuthProvider>
    )
  }
}
export default TestPage