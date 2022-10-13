import React, { KeyboardEventHandler, useState } from 'react'
import { IPandaFlag, PandaflagProvider } from '../src/context/PandaflagContext'
import { useFlag } from '../src/hooks/useFlag'
import Flag from '../src/stories/Flag'

export default {
  title: 'useFlag',
  component: Demo,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    initialValue: {
      control: 'number',
    },
  },
}

function Content({ flagName }) {
  const flagData = useFlag(flagName)

  if (flagData.isLoading) {
    return <div>Loading...</div>
  }

  if (!flagData.flag) {
    return <div>Flag is undefined</div>
  }

  return (
    <div>
      <Flag flag={flagData.flag} />
    </div>
  )
}

function Demo() {
  const [flagNameInput, setFlagNameInput] = useState<string>('test')
  const [flagName, setFlagName] = useState<string>('test')

  function search() {
    if (flagNameInput) {
      setFlagName(flagNameInput)
    }
  }

  function onEnter(event: KeyboardEventInit) {
    if (event.key === 'Enter') {
      search()
    }
  }

  return (
    <PandaflagProvider apiKey={process.env.REACT_APP_PANDAFLAG_API_KEY as string} environment="production">
      <>
        <label>Flag Name</label>
        <div style={{ display: 'flex' }}>
          <input onKeyDown={onEnter} value={flagNameInput} onChange={(event) => setFlagNameInput(event.target.value)} />

          <button style={{ marginLeft: 12 }} onClick={search}>
            Search
          </button>
        </div>
        <br />

        <Content flagName={flagName} />
      </>
    </PandaflagProvider>
  )
}

const Template = () => <Demo />

export const Default = Template.bind({})
