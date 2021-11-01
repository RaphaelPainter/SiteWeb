function dijkstra(source) {
    let distances = {},
        parents = {},
        visited = new Set();
    for (let i = 0; i < this.vertices.length; i++) {
        if (this.vertices[i] === source) {
            distances[source] = 0;
        } else {
            distances[this.vertices[i]] = Infinity;
        }
        parents[this.vertices[i]] = null;
    }

    let currVertex = this.vertexWithMinDistance(distances, visited);

    while (currVertex !== null) {
        let distance = distances[currVertex],
            neighbors = this.adjacencyList[currVertex];
        for (let neighbor in neighbors) {
            let newDistance = distance + neighbors[neighbor];
            if (distances[neighbor] > newDistance) {
                distances[neighbor] = newDistance;
                parents[neighbor] = currVertex;
            }
        }
        visited.add(currVertex);
        currVertex = this.vertexWithMinDistance(distances, visited);
    }

    console.log(parents);
    console.log(distances);
}