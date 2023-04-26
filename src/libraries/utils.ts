export const isLabelValid = (
  label: string,
  nodes: {
    title: string
  }[],
) => nodes.every(({ title }) => title !== label)
