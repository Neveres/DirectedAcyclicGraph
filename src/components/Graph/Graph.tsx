import React from 'react'
import { Input, notification } from 'antd'
import { GraphView, IGraphViewProps } from 'react-digraph'
import { isLabelValid, isAcyclic } from 'src/libraries'
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

  onDeleteSelected: IGraphViewProps['onDeleteSelected'] = (selected) => {
    const { graph } = this.state
    const { edges, nodes } = graph
    const { edges: selectedEdges, nodes: selectedNodes } = selected

    if (selectedEdges) {
      const [selectedEdge] = Array.from(selectedEdges.values())
      const { source, target } = selectedEdge

      const newEdges = edges.filter(
        (edge) => edge.source !== source || edge.target !== target,
      )

      this.setState({
        graph: {
          ...graph,
          edges: newEdges,
        },
      })
    } else if (selectedNodes) {
      const [selectedNode] = Array.from(selectedNodes.values())
      const { title } = selectedNode

      const newEdges = edges.filter(
        ({ source, target }) => source !== title && target !== title,
      )

      const newNodes = nodes.filter((node) => node.title !== title)

      this.setState({
        graph: {
          nodes: newNodes,
          edges: newEdges,
        },
      })
    }
  }

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

  onCreateEdge: IGraphViewProps['onCreateEdge'] = (sourceNode, targetNode) => {
    const { graph } = this.state
    const { edges } = graph

    const newEdges = [
      ...edges,
      {
        source: sourceNode.title,
        target: targetNode.title,
      },
    ]

    if (isAcyclic(newEdges)) {
      this.setState({
        graph: {
          ...graph,
          edges: newEdges,
        },
      })
    } else {
      this.openNotificationWithIcon({
        message: 'Invalid edge',
        description: 'Adding this edge would create cycle.',
      })
    }
  }

  canDeleteSelected: IGraphViewProps['canDeleteSelected'] = (selected) => {
    const {
      graph: { edges },
    } = this.state
    const { edges: selectedEdges, nodes: selectedNodes } = selected

    if (selectedEdges) {
      const [selectedEdge] = Array.from(selectedEdges.values())
      const { source, target } = selectedEdge

      const newEdges = edges.filter(
        (edge) => edge.source !== source || edge.target !== target,
      )

      return isAcyclic(newEdges)
    } else if (selectedNodes) {
      const [selectedNode] = Array.from(selectedNodes.values())
      const { title } = selectedNode

      const newEdges = edges.filter(
        ({ source, target }) => source !== title && target !== title,
      )

      return isAcyclic(newEdges)
    }

    return true
  }

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
          onSelect={this.onSelect}
          onCreateNode={this.onCreateNode}
          onDeleteSelected={this.onDeleteSelected}
          onCreateEdge={this.onCreateEdge}
          canDeleteSelected={this.canDeleteSelected}
        />
      </div>
    )
  }
}
