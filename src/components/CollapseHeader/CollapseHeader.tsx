import React from 'react'
import { Collapse } from 'antd'

const { Panel } = Collapse

const hints = [
  'To add nodes, hold shift and click on the grid.',
  'To add edges, hold shift and click/drag to between nodes.',
  'To delete a node or edge, click on it and press Del button on your keyboard.',
  'Click and drag nodes to change their position.',
  'If you want to create the edge that deleted before, then you should remove node first and create both node and edge again.',
]

const NOTE = 'Note: For macOS, use command instead of Ctrl.'

const Hints = () => (
  <ul>
    {hints.map((hint) => (
      <li key={hint}>{hint}</li>
    ))}
  </ul>
)

const CollapseHeader = () => {
  return (
    <Collapse>
      <Panel header="Tutorial" key="1">
        <Hints />
        <div style={{ paddingLeft: '25px' }}>{NOTE}</div>
      </Panel>
    </Collapse>
  )
}

export default CollapseHeader
