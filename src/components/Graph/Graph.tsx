import React from 'react'
import { Input, notification } from 'antd'
import { GraphView, IGraphViewProps } from 'react-digraph'
import { isLabelValid } from 'src/libraries'
import GraphConfig, { NODE_KEY } from './config'
import defaultGraph from './default-graph'

const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig

type IGraphProps = {}
type IGraphState = {
  graph: typeof defaultGraph
  selected: IGraphViewProps['selected']
  label: string
}

export class Graph extends React.Component<IGraphProps, IGraphState> {
  graphViewRef = React.createRef()

  constructor(props: IGraphProps) {
    super(props)
    this.state = {
      graph: defaultGraph,
      selected: null,
      label: '',
    }
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ label: event.target.value.trim() })
  }

  openNotificationWithIcon = (content: {
    message: string
    description: string
  }) => {
    notification.error(content)
  }

  onDeleteSelected: IGraphViewProps['onDeleteSelected'] = (selected) => {}

  onSelect: IGraphViewProps['onSelect'] = (selected, event) => {
    this.setState({ selected })
  }

  onCreateNode: IGraphViewProps['onCreateNode'] = (x, y) => {
    const { graph, label } = this.state
    const { nodes } = graph

    if (isLabelValid(label, nodes)) {
      this.setState({
        graph: {
          ...graph,
          nodes: [...nodes, { id: label, title: label, x, y }],
        },
      })
    } else {
      this.openNotificationWithIcon({
        message: 'Invalid label',
        description: 'The label has been used.',
      })
    }
  }

  onCreateEdge: IGraphViewProps['onCreateEdge'] = (sourceNode, targetNode) => {}

  render() {
    const {
      graph: { nodes, edges },
      selected,
      label,
    } = this.state

    return (
      <div>
        <Input
          value={label}
          onChange={this.onInputChange}
          placeholder="Input label for new node"
          allowClear
        />
        <GraphView
          ref={(ref: any) => (this.graphViewRef = ref)}
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          readOnly={false}
          onSelect={this.onSelect}
          onCreateNode={this.onCreateNode}
          onUpdateNode={() => {}}
          onDeleteSelected={this.onDeleteSelected}
          onCreateEdge={this.onCreateEdge}
          onSwapEdge={() => {}}
        />
      </div>
    )
  }
}
