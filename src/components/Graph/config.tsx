import React from 'react'

export const NODE_KEY = 'id' // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = 'customEmpty' // Empty node type
export const POLY_TYPE = 'poly'
export const SPECIAL_TYPE = 'special'
export const SKINNY_TYPE = 'skinny'
export const SPECIAL_CHILD_SUBTYPE = 'specialChild'
export const EMPTY_EDGE_TYPE = 'emptyEdge'
export const SPECIAL_EDGE_TYPE = 'specialEdge'

export const nodeTypes = [EMPTY_TYPE, POLY_TYPE, SPECIAL_TYPE, SKINNY_TYPE]
export const edgeTypes = [EMPTY_EDGE_TYPE, SPECIAL_EDGE_TYPE]

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="76" />
  </symbol>
)

const CustomEmptyShape = (
  <symbol viewBox="0 0 100 100" id="customEmpty">
    <circle cx="50" cy="50" r="45" />
  </symbol>
)

const EmptyEdgeShape = <symbol viewBox="0 0 50 50" id="emptyEdge"></symbol>

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: '#emptyEdge',
    },
  },
  NodeSubtypes: {},
  NodeTypes: {
    emptyNode: {
      shape: EmptyNodeShape,
      shapeId: '#emptyNode',
    },
  },
}
