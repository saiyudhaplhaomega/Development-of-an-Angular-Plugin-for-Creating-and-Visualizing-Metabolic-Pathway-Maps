import { Level } from "./network-elements.model";

export interface NodeData {
    Nodedata: Map<string, number>;
}

export interface EdgeData {
    Edgedata: Map<string, number>;
    
}

export interface NetworkData {
    nodeData: NodeData,
    edgeData: EdgeData, 
    level: Level;
}

