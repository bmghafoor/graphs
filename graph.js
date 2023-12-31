class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.addVertex(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, arr = [start.value], seen = new Set([start.value])) {
    for (let neighbor of start.adjacent) {
      if (!seen.has(neighbor.value)) {
        seen.add(neighbor.value);
        arr.push(neighbor.value);
        this.depthFirstSearch(neighbor, arr, seen);
      }
    }
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let arr = [start.value];
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    while (toVisitQueue.length) {
      let currNode = toVisitQueue.shift();
      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
          arr.push(neighbor.value);
        }
      }
    }
    return arr;
  }
}

module.exports = { Graph, Node };
