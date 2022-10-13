## Pandaflag React SDK

React SDK to easily evaluate Flags in your React web application

## Installation

```
npm install pandaflag-react
```

## Setup the Provider

```tsx
import { PandaflagProvider } from 'react-pandaflag'

const App = () => {
  return (
    <PandaflagProvider apiKey={PROJECT_API_KEY} environment={ENVIRONMENT}>
      ...
    </PandaflagProvider>
  )
}

// PROJECT_API_KEY = Your projects api key found in Pandaflag app In Projects page
// ENVIRONMENT = The environment name for which you initialize the client
```

## Evaluate flags

```tsx
import { useFlags, useFlag, Flag } from 'pandaflag-react'

const AllFlags = () => {
  // Get All Flags
  const flagsData: Flag[] = useFlags()

  if (flagData.isLoading) {
    return <div>Loading...</div>
  }

  return ...
}

const OneFlag = () => {
  // Get one flag
  const flagData: Flag = useFlag('maps_v2')
  //  {
  //    isLoading: false,
  //    flag: {
  //      name: 'maps_v2'
  //      description: 'Updated UI version of maps feature'
  //      enabled: true
  //    }
  //  }

  if (flagData.isLoading) {
    return <div>Loading...</div>
  }

  return ...
}
```
