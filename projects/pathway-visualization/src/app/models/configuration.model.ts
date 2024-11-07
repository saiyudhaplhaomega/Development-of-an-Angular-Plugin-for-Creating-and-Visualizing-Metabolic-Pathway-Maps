


export enum InteractionType {
    NODECLICK = 'nodeClick',
    NODEHOVER = 'nodeHover',
    EDGECLICK = 'edgeClick',
    EDGEHOVER = 'edgeHover'
  }
  
export interface NetworkInteractionEvent {
    interactionType: InteractionType,
    elementType: string,
    elementId: string,
    modelElementRef: string,
    dataRef: string
    }
    

export interface Callbacks {
    hover: (event: NetworkInteractionEvent) => void | undefined,
    click: (event: NetworkInteractionEvent) => void | undefined,
    doubleclick: (event: NetworkInteractionEvent) => void | undefined,
    rightclick: (event: NetworkInteractionEvent) => void | undefined,
    }

export interface ModeCallbacks {
    exploration: Callbacks,
    editing: Callbacks
}

export interface LevelCallbacks {
	community?: ModeCallbacks,
	organelle: ModeCallbacks,
	module: ModeCallbacks,
	molecular: ModeCallbacks
}

export interface Configuration {
    updateLayoutFrequency: number,
    showGrid: boolean,
    callbacks: LevelCallbacks,
    colorscale: string[],
    minNodeSize: number,
    maxNodeSize: number,
}



