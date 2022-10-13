import React from 'react'
import { IPandaFlag, PandaflagProvider } from '../src/context/PandaflagContext'
import { useFlags } from '../src/hooks/useFlags'
import Flag from '../src/stories/Flag'

export default {
  title: 'useFlags',
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

function Content() {
  const flagsData = useFlags()

  if (flagsData.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {flagsData.flags.map((flag: IPandaFlag, index: number) => (
        <div style={{ marginBottom: 16 }} key={index}>
          <Flag flag={flag} />
        </div>
      ))}
    </div>
  )
}

function Demo() {
  return (
    <PandaflagProvider apiKey={process.env.REACT_APP_PANDAFLAG_API_KEY as string} environment="production">
      <Content />
    </PandaflagProvider>
  )
}

const Template = () => <Demo />

export const Default = Template.bind({})
