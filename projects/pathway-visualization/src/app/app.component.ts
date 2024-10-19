import { Component } from '@angular/core';
import { MolecularExplorationComponent } from './molecular-exploration/molecular-exploration.component';
import { MolecularEditingComponent } from './molecular-editing/molecular-editing.component';
import { ConfigService } from './services/config.service';

enum InteractionType {
  NODECLICK = 'nodeClick',
  NODEHOVER = 'nodeHover',
  NODEDOUBLECLICK = 'nodeDoubleClick',
  NODERIGHTCLICK = 'nodeRightClick',
}

interface Callbacks {
  hover: (event: any, node, mode) => void;
  click: (event: any, node, mode) => void;
  doubleClick: (event: any, node, mode) => void;
  rightClick: (event: any, node, mode) => void;
}

interface ModeCallbacks {
  exploration: Callbacks;
  editing: Callbacks;
}

interface LevelCallbacks {
  organelle: ModeCallbacks;
  module: ModeCallbacks;
  molecular: ModeCallbacks;
}

@Component({
  selector: 'vis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  componentToLoad: any = null;
  configuration: any;

  // Define interaction callbacks for all levels
  levelCallbacks: LevelCallbacks = {
    organelle: this.generateModeCallbacks(),
    module: this.generateModeCallbacks(),
    molecular: this.generateModeCallbacks(),
  };

  constructor(private configService: ConfigService) {
    this.configuration = this.configService.getConfig();
  }

  /**
   * Generate mode callbacks dynamically for exploration and editing modes
   */
  private generateModeCallbacks(): ModeCallbacks {
    const generateCallback = (method) => (event, node, mode) => this[method](event, node, mode);

    return {
      exploration: {
        hover: generateCallback('onHover'),
        click: generateCallback('onClick'),
        doubleClick: generateCallback('onDoubleClick'),
        rightClick: generateCallback('onRightClick'),
      },
      editing: {
        hover: generateCallback('onHover'),
        click: generateCallback('onClick'),
        doubleClick: generateCallback('onDoubleClick'),
        rightClick: generateCallback('onRightClick'),
      },
    };
  }

  /**
   * Method to generate dummy dictionary data for each callback
   */
  private generateDummyData(node: any, mode: string, event: any) {
    return {
      id: node?.id || 'dummy123',
      description: `Dummy description for mode: ${mode}`,
      eventType: event.type || 'unknown',
      metadata: {
        timestamp: new Date().toISOString(),
        randomValue: Math.random(),
      },
    };
  }

  /**
   * Handle callback responses, including determining which mode and event type
   */
  callbacks(response) {
    const { param, event, node } = response;
    const { molecular } = param;

    if (molecular) {
      const mode = molecular.exploration ? 'exploration' : molecular.editing ? 'editing' : null;
      if (mode) {
        // Optionally load component based on mode
        // this.componentToLoad = mode === 'exploration' ? MolecularExplorationComponent : MolecularEditingComponent;
        const callbacks = this.levelCallbacks.molecular[mode];
        const eventType = Object.keys(molecular[mode]).pop();
        if (eventType && callbacks[eventType]) {
          callbacks[eventType](event, node, mode);
        }
      }
    }
  }

  // Event handlers with dummy data included
  onHover(event: any, node: any, mode: string) {
    const dummyData = this.generateDummyData(node, mode, event);
    console.log('Hover event:', { event, node, mode, dummyData });
  }

  onClick(event: any, node: any, mode: string) {
    const dummyData = this.generateDummyData(node, mode, event);
    console.log('Click event:', { event, node, mode, dummyData });
  }

  onDoubleClick(event: any, node: any, mode: string) {
    const dummyData = this.generateDummyData(node, mode, event);
    console.log('Double click event:', { event, node, mode, dummyData });
  }

  onRightClick(event: any, node: any, mode: string) {
    const dummyData = this.generateDummyData(node, mode, event);
    console.log('Right click event:', { event, node, mode, dummyData });
  }
}
