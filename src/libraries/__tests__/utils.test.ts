import { isAcyclic } from 'src/libraries'
import defaultGraph from 'src/components/Graph/default-graph'

describe('isAcyclic', () => {
  test('should return true if graph is acyclic', () => {
    expect(isAcyclic(defaultGraph.edges)).toBeTruthy()
  })

  test("should return false if graph isn't acyclic", () => {
    const edges = [
      {
        source: 'A',
        target: 'B',
      },
      {
        source: 'B',
        target: 'A',
      },
    ]
    expect(isAcyclic(edges)).toBeFalsy()
  })
})
