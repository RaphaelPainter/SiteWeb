export class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList.set(vertex,{});
    }

    addEdge(vertex1, vertex2, weight) {
        if(!this.adjacencyList.has(vertex1)) {
            console.log("graph: vertex "+ vertex1+ " is unknown")
        }
        this.adjacencyList.get(vertex1)[vertex2] = weight;
    }

    changeWeight(vertex1, vertex2, weight) {
        this.adjacencyList.get(vertex1)[vertex2] = weight;
    }

    print(){
        let order = this.vertices.length;
        console.log(this.adjacencyList);
        for (const [vertex, neighbors] of this.adjacencyList.entries()) {
            for(let neighbor in neighbors) {
                for(let weight in this.adjacencyList.get(vertex)){
                    console.log("graph: "+ vertex + " -> "+this.adjacencyList.get(vertex)[weight]+" -> " + neighbor);
                }
            }
          }
    }
}

