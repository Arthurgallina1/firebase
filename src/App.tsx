import React from 'react'
import firebase from 'firebase'

function App() {
  const firebaseApp = firebase.apps[0]
  return (
    <div>
      <h1>React Firebase</h1>
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>
    </div>
  )
}

export default App
