//creating interface for nodes and edges
export enum Level {
        COMMUNITY = 'community',
        ORGANELLE = 'organelle',
        MODULE = 'module',
        MOLECULAR = 'molecular'
    }
    
export enum NodeType{
    CIRCLE = 'circle',
    SQUARE = 'square',
    DIAMOND = 'diamond'
    }
    
export interface Node {
    nodeId: string,
    label: string, //displayed in visualization
    modelElementRef: string, //reference to element in model knowledgebase
    dataRef: string, //reference to element in data object
    nodeType: NodeType,
    isSecondaryMetabolite: boolean,
    size: number, //scaling factor between 0 and 1
    color: number, //scaling factor between 0 and 1
    x: number,
    y: number
}

export enum EdgeType {
    FORWARD = 'forward',
    REVERSIBLE = 'reversible',
    UNDIRECTED = 'undirected'
    }
    
export interface Edge {
    edgeId: string,
    label: string, //displayed in visualization
    modelElementRef: string, //reference to element in model knowledgebase
    dataRef: string, //reference to element in data object
    width: number, //scaling factor between 0 and 1
    color: number, //scaling factor between 0 and 1
    edgeType: EdgeType,
    flux: number, //between -1000 and 1000, should control edge ‚motion‘ and direction
    source: string,
    target: string
    }

export interface NetworkMap {
    nodes: Node[],
    edges: Edge[],  //array of edges connecting nodes
    level: Level  //representing the level of hierarchy of the network map (community, organelle, module, molecular)
}

//can implemetn class , for the data structure i can adhere to.