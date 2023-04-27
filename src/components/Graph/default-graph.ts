import { generateUuid } from 'src/libraries'

const nodes = [
  {
    id: generateUuid(),
    title: 'A',
    x: 0,
    y: 100,
  },
  {
    id: generateUuid(),
    title: 'B',
    x: 300,
    y: 300,
  },
  {
    id: generateUuid(),
    title: 'C',
    x: 50,
    y: 600,
  },
  {
    id: generateUuid(),
    title: 'D',
    x: 700,
    y: 500,
  },
  {
    id: generateUuid(),
    title: 'E',
    x: 1000,
    y: 300,
  },
  {
    id: generateUuid(),
    title: 'F',
    x: 500,
    y: 0,
  },
  {
    id: generateUuid(),
    title: 'G',
    x: -300,
    y: 300,
  },
]

export default {
  edges: [
    {
      source: nodes[0].id,
      target: nodes[5].id,
    },
    {
      source: nodes[0].id,
      target: nodes[1].id,
    },
    {
      source: nodes[0].id,
      target: nodes[6].id,
    },
    {
      source: nodes[1].id,
      target: nodes[4].id,
    },
    {
      source: nodes[1].id,
      target: nodes[2].id,
    },
    {
      source: nodes[2].id,
      target: nodes[6].id,
    },
    {
      source: nodes[3].id,
      target: nodes[2].id,
    },
    {
      source: nodes[4].id,
      target: nodes[3].id,
    },
    {
      source: nodes[5].id,
      target: nodes[3].id,
    },
  ],
  nodes,
}
