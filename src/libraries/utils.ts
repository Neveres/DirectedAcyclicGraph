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

export const isAcyclic = (
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
        if (node === path[path.length - 1]) return false
        batch.push([node, ...path])
      }
    }
    queue = batch
  }

  return true
}

export const generateUuid = () => {
  let nowOfDate = Date.now()

  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    nowOfDate += performance.now()
  }

  const result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (character) => {
      const remains = (nowOfDate + Math.random() * 16) % 16 | 0
      nowOfDate = Math.floor(nowOfDate / 16)
      return (character === 'x' ? remains : (remains & 0x3) | 0x8).toString(16)
    },
  )
  return result
}
