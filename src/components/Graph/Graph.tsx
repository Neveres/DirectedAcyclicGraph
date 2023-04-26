import React from 'react'
import { GraphView, IGraphViewProps } from 'react-digraph'
import GraphConfig, { NODE_KEY } from './config'
import defaultGraph from './default-graph'

const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig

type IGraphProps = {}
type IGraphState = {
  graph: IObject
  selected: IGraphViewProps['selected']
}

export class Graph extends React.Component<IGraphProps, IGraphState> {
  graphViewRef = React.createRef()

  constructor(props: IGraphProps) {
    super(props)
    this.state = {
      graph: defaultGraph,
      selected: null,
    }
  }

  onDeleteSelected: IGraphViewProps['onDeleteSelected'] = (selected) => {}

  onSelect: IGraphViewProps['onSelect'] = (selected, event) => {
    this.setState({ selected })
  }

  onCreateNode: IGraphViewProps['onCreateNode'] = (x, y, event) => {
    const { pageX, pageY } = event
  }

  onCreateEdge: IGraphViewProps['onCreateEdge'] = (sourceNode, targetNode) => {}

  render() {
    const {
      graph: { nodes, edges },
      selected,
    } = this.state

    return (
      <div>
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
