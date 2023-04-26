export const isLabelValid = (
  label: string,
  nodes: {
    title: string
  }[],
) => nodes.every(({ title }) => title !== label)

const getAdjacencyList = (
  edges: {
    source: string
    target: string
  }[],
) => {
  const adjacencyList = new Map<string, string[]>()
  edges.forEach(({ source, target }) => {
    const valueOfSource = adjacencyList.get(source) || []
    valueOfSource.push(target)
    adjacencyList.set(source, valueOfSource)
  })

  return adjacencyList
}

export const getCycle = (
  edges: {
    source: string
    target: string
  }[],
) => {
  const adjacencyList = getAdjacencyList(edges)
  let queue = Array.from(adjacencyList.keys()).map((node) => [node])
  while (queue.length) {
    const batch = []
    for (const path of queue) {
      const parents = adjacencyList.get(path[0]) || []
      for (const node of parents) {
        if (node === path[path.length - 1]) return [node, ...path]
        batch.push([node, ...path])
      }
    }
    queue = batch
  }
}
