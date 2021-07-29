import React, { useEffect, useState } from 'react'
import firebaseDB from './config/firebaseConfig'

type AgentType = {
  name: string
  lastName: string
}
function App() {
  // const firebaseApp = firebase.apps[0]

  const [name, setName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [agents, setAgents] = useState<AgentType[]>([])

  useEffect(() => {
    //real time listener
    firebaseDB.child('agents').on('value', (snapshot) => {
      if (snapshot.val()) {
        // console.log(snapshot.val())
        setAgents({ ...snapshot.val() })
      } else {
        setAgents([])
      }
    })
  }, [])

  const handleSubmit = () => {
    console.log(name + ' ' + lastName)
    const agentObj = {
      name,
      lastName,
    }

    firebaseDB.child('agents').push(agentObj, (err) => {
      if (err) console.debug('error', err)
    })

    setName('')
    setLastName('')
  }

  const handleDelete = (agentId: string) => {
    firebaseDB.child(`agents/${agentId}`).remove((err) => {
      if (err) console.debug('error', err)
    })
  }

  const getDBStuff = async () => {
    const SS = await firebaseDB
      .child('agents')
      .orderByValue()
      .on('value', (snapshot) => {
        snapshot.forEach((data) => {
          console.log(
            'key:' + data.key + 'value: ' + JSON.stringify(data.val())
          )
        })
      })
    // console.log(SS)
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>React Firebase</h1>
      <h3>Real time data-base</h3>
      <div>
        <button onClick={getDBStuff}>Get DB Stuff</button>
      </div>
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            width: 500,
            height: 200,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <label htmlFor='nameInput'>Name</label>
            <input
              type='text'
              id='nameInput'
              onChange={(e) => {
                setName(e.target.value)
              }}
              value={name}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <label htmlFor='lastNameInput'>Last name</label>
            <input
              type='text'
              id='lastNameInput'
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              value={lastName}
            />
          </div>

          <button type='button' onClick={handleSubmit}>
            Adicionar
          </button>
        </form>
        <div>
          <h4>Agents list</h4>
          {Object.keys(agents).map((agentId: any) => {
            return (
              <div key={agents[agentId].lastName}>
                <span>{agents[agentId].name}</span>{' '}
                <span>{agents[agentId].lastName}</span>{' '}
                <button onClick={() => handleDelete(agentId)}>Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
