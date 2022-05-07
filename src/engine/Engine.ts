class Node<T> {
  data: T;
  adjacent: Node<T>[];
  // eslint-disable-next-line no-unused-vars
  comparator: (a: T, b: T) => number;

  // eslint-disable-next-line no-unused-vars
  constructor(data: T, comparator: (a: T, b: T) => number) {
    this.data = data;
    this.adjacent = [];
    this.comparator = comparator;
  }

  addAdjacent(node: Node<T>) {
    this.adjacent.push(node);
  }

  removeAdjacent(data: T): Node<T> | null {
    // this.adjacent = this.adjacent.filter(n => n !== node);
    const index = this.adjacent.findIndex(n => this.comparator(n.data, data) === 0);
    if (index === -1) {
      return null;
    }
    return this.adjacent.splice(index, 1)[0];
  }
}

export class Graph<T> {
  nodes: Map<T, Node<T>> = new Map();
  // eslint-disable-next-line no-unused-vars
  comparator: (a: T, b: T) => number;

  // eslint-disable-next-line no-unused-vars
  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  /**
   * Add a node to the graph if it was not added before.
   * @param {T} data
   * @returns {Node<T>}
   */
  addNode(data: T): Node<T> {
    let node = this.nodes.get(data);
    if (node) return node;

    node = new Node(data, this.comparator);
    this.nodes.set(data, node);

    return node;
  }

  /**
   * Removes a node from the graph and all of its adjacent nodes.
   * @param {T} data
   * @returns {Node<T> | null}
   */
  removeNode(data: T): Node<T> | null {
    const node = this.nodes.get(data);
    if (!node) return null;

    this.nodes.forEach(n => n.removeAdjacent(node.data));
    this.nodes.delete(data);

    return node;
  }

  /**
   * Add an edge between two nodes.
   * @param {T} from
   * @param {T} to
   */
  addEdge(from: T, to: T) {
    const fromNode = this.addNode(from);
    const toNode = this.addNode(to);
    fromNode.addAdjacent(toNode);
  }

  /**
   * Removes an edge between two nodes.
   * @param {T} from
   * @param {T} to
   */
  removeEdge(from: T, to: T) {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!fromNode || !toNode) return;

    fromNode.removeAdjacent(toNode.data);
  }

  /**
   * Depth-first search traversal of the graph.
   * @param {T} node
   * @param {Set<T>}visited
   * @private
   */
  private depthFirstSearch(node: Node<T>, visited: Set<T>) {
    if (!node) return;

    if (visited.has(node.data)) return;

    visited.add(node.data);

    node.adjacent.forEach(n => {
      if (!visited.has(n.data)) {
        this.depthFirstSearch(n, visited);
      }
    });
  }

  /**
   * Returns a set of all nodes that are reachable from the given node.
   * @param {T} node
   * @returns {Set<T>}
   */
  dfs() {
    const visited = new Set<T>();
    this.nodes.forEach(n => this.depthFirstSearch(n, visited));
    return visited;
  }
}

function comparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}

export const graph = new Graph(comparator);

