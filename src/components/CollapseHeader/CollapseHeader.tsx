import React from 'react'
import { Collapse } from 'antd'

const { Panel } = Collapse

const hints = [
  'To add nodes, hold shift and click on the grid.',
  'To add edges, hold shift, click and drag from one node to another.',
  'To delete a node or edge, click on it and press Delete/Backspace button on your keyboard.',
  'Click and drag nodes to change their position.',
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
      <Panel header="Click here to see how it works" key="1">
        <Hints />
        <div style={{ paddingLeft: '25px' }}>{NOTE}</div>
      </Panel>
    </Collapse>
  )
}

export default CollapseHeader
