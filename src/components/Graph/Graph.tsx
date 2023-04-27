import React from 'react'
import { Input, notification } from 'antd'
import { GraphView, IGraphViewProps } from 'react-digraph'
import { isLabelValid, isAcyclic, generateUuid } from 'src/libraries'
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

  updateSelectedNodeIdForGraph = (
    currentID: string,
    graph: IGraphState['graph'],
  ) => {
    const { edges, nodes } = graph
    const newId = generateUuid()

    return {
      nodes: nodes.map((node) =>
        node.id === currentID ? { ...node, id: newId } : node,
      ),
      edges: edges.map((edge) => {
        if (edge.source === currentID) {
          return {
            ...edge,
            source: newId,
          }
        } else if (edge.target === currentID) {
          return {
            ...edge,
            target: newId,
          }
        } else {
          return edge
        }
      }),
    }
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
        graph: this.updateSelectedNodeIdForGraph(source, {
          edges: newEdges,
          nodes,
        }),
      })
    } else if (selectedNodes) {
      const [selectedNode] = Array.from(selectedNodes.values())
      const { id } = selectedNode

      const newEdges = edges.filter(
        ({ source, target }) => source !== id && target !== id,
      )

      const newNodes = nodes.filter((node) => node.id !== id)

      this.setState({
        graph: {
          nodes: newNodes,
          edges: newEdges,
        },
      })
    }
  }

  onSelect: IGraphViewProps['onSelect'] = (selected) => {
    this.setState({ selected })
  }

  onCreateNode: IGraphViewProps['onCreateNode'] = (x, y) => {
    const { graph, label } = this.state
    const { nodes } = graph

    if (isLabelValid(label, nodes)) {
      this.setState({
        graph: {
          ...graph,
          nodes: [...nodes, { id: generateUuid(), title: label, x, y }],
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

    this.setState({
      graph: {
        ...graph,
        edges: [
          ...edges,
          {
            source: sourceNode.id,
            target: targetNode.id,
          },
        ],
      },
    })
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
      const { id } = selectedNode

      const newEdges = edges.filter(
        ({ source, target }) => source !== id && target !== id,
      )

      return isAcyclic(newEdges)
    }

    return true
  }

  canCreateEdge: IGraphViewProps['canCreateEdge'] = (startNode, endNode) => {
    const { graph } = this.state
    const { edges } = graph

    const newEdges =
      startNode && endNode
        ? [
            ...edges,
            {
              source: startNode.id,
              target: endNode.id,
            },
          ]
        : edges

    const result = isAcyclic(newEdges)

    if (!result) {
      this.openNotificationWithIcon({
        message: 'Invalid edge',
        description: 'Adding this edge would create cycle.',
      })
    }

    return result
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
          canCreateEdge={this.canCreateEdge}
        />
      </div>
    )
  }
}
