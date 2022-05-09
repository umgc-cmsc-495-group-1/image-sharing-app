import {AppUserInterface} from "../types/authentication";
import {FeedPostInterface} from "../types/appTypes";

class Node<T> {
  data: T;
  adjacent: Node<T>[];
  // eslint-disable-next-line no-unused-vars
  comparator: (user: T, post: T) => number;

  // eslint-disable-next-line no-unused-vars
  constructor(data: T, comparator: (user: T, post: T) => number) {
    this.data = data;
    this.adjacent = [];
    this.comparator = comparator;
  }

  addAdjacent(node: Node<T>) {
    this.adjacent.push(node);
  }

  removeAdjacent(data: T): Node<T> | null {
    const index = this.adjacent.findIndex(n => this.comparator(n.data, data) === 0);
    if (index === -1) {
      return null;
    }
    return this.adjacent.splice(index, 1)[0];
  }
}

export class Graph<T> {
  nodes: Node<T>[] = []
  // eslint-disable-next-line no-unused-vars
  comparator: (user: T, post: T) => number;

  // eslint-disable-next-line no-unused-vars
  constructor(comparator: (user: T, post: T) => number) {
    this.comparator = comparator;
  }

  /**
   * Sorts the nodes in the graph by the comparator function
   */
  sort() {
    const sorted: Node<T>[] = [];
    this.nodes.forEach(node => sorted.push(node));
    sorted.sort((a, b) => {
      const diff = this.comparator(a.data, b.data)
      return diff > 0 ? 1 : -1;
    });
    this.nodes = sorted;
  }

  /**
   * Add a node to the graph if it was not added before.
   * @param {T} data
   * @returns {Node<T>}
   */
  addNode(data: T): Node<T> {
    const node: Node<T> = new Node(data, this.comparator);
    this.nodes.push(node);

    return node;
  }

  /**
   * Removes a node from the graph and all of its adjacent nodes.
   * @param {T} data
   * @returns {Node<T> | null}
   */
  removeNode(data: T): Node<T> | null {
    const nodeIndex = this.nodes.indexOf(new Node<T>(data, this.comparator));
    const node = this.nodes[nodeIndex];
    if (!node) return null;

    this.nodes.forEach(n => n.removeAdjacent(node.data));
    this.nodes.splice(nodeIndex, 1);

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
    const fromIndex = this.nodes.indexOf(new Node<T>(from, this.comparator));
    const toIndex = this.nodes.indexOf(new Node<T>(to, this.comparator));
    const fromNode = this.nodes[fromIndex];
    const toNode = this.nodes[toIndex];
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

export const comparator = ({user, post}:{user: AppUserInterface, post: FeedPostInterface}): number => {
  const currentInterests: string[] = [];
  if (post.likes.includes(user.uid)) {
    post.classification.classifications.forEach(item => {
      currentInterests.push(item.className);
    })
  }

  if (user.likes.includes(post.pid) && post.uid !== user.uid) {
    post.classification.classifications.forEach(classification => {
      if (currentInterests.includes(classification.className)) {
        return 0;
      }
    })
  }

  if (!user.likes.includes(post.pid)) return 1;


  if (!post.likes.includes(user.uid)) return -1;

  return -1;

}

// export const graph: Graph<{ user: AppUserInterface; post: FeedPostInterface }> = new Graph(comparator);

