import React from 'react'
import { IPandaFlag } from '../context/PandaflagContext'

interface Props {
  flag: IPandaFlag
}

function Flag({ flag }: Props) {
  return (
    <div
      style={{ border: '1px solid #ddd', borderRadius: 8, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.07)', padding: 20 }}
    >
      <div style={{ marginBottom: 6 }}>{flag.name}</div>

      <div>{flag.enabled ? <span style={{ color: 'green' }}>ON</span> : <span style={{ color: 'red' }}>OFF</span>}</div>
    </div>
  )
}

export default Flag
