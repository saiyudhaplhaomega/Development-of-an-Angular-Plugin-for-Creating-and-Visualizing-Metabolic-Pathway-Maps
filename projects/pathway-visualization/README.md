# Pathway visualization

This is a simple Angular project implementing a force-directed graph visualization using D3.js.

## Project Overview

This project aims to demonstrate the integration of Angular with D3.js to create interactive force-directed graphs. The D3 force chart visualizes relationships between entities using a physics-based simulation.

### Key Features

- **Force-Directed Graph**: The project visualizes a force-directed graph, where nodes are connected by edges and positioned based on simulated physical forces.

- **Search and Highlight**: Users can search for specific nodes by their labels, and the corresponding node will be highlighted in the graph.

- **Zoom and Pan**: Users can zoom in and out of the graph and pan across the visualization canvas.

- **File Upload**: Users can upload JSON files containing graph data, and the graph will be dynamically rendered based on the uploaded data.

- **Dynamic Data Loading**: Enables dynamic loading of graph data by allowing users to upload JSON files containing node and edge information.

- **Text Box Creation**: Allows users to dynamically create text boxes on the canvas, providing a way to annotate or add additional information to the graph.

- **Hierarchical Navigation**: Supports hierarchical navigation through graph data, allowing users to explore different levels or layers of the graph.

- **Tooltip Display**: Displays tooltips with node details on hover, providing additional context and information about individual nodes.

- **Brush Selection**: Implements brush selection functionality to select multiple nodes within a defined area, facilitating targeted analysis of subsets of the graph.

- **Hierarchy stack**: Users can traverse between the different layers. Like user opened an ORGANELL file and double click on a node, it will expand the child and also user can go back to that ORGANELLE file.


## Dependencies

The project uses the following dependencies:

- Angular (Core, HttpClient)
- D3.js
- Angular Material (for UI components)


## Installation

To install and run the project locally, follow these steps:

1. Unzip:
   ```
   Unzip pathway_visualization.zip file
   ```

2. Navigate to the project directory:
   ```
   cd pathway_visualization
   ```

3. Install dependencies:
   ```
   npm install --force
   ```

4. Start the development server:
   ```
   ng serve pathway-visualization
   ```

5. Open your browser and navigate to `http://localhost:4200/` to view the application.


## Generating Files and Directory Structure

In the `assets` folder, you'll find several files used for different levels of the network.

### File Generation

## Naming Convention

Each file follows a specific naming convention for clarity:
network_n_9_e_18_l_molecular.json

- `network`: A prefix indicating the file contains network data.
- `n`: Denotes the node of nodes.
- `e`: Denotes the number of edges.
- `l`: Represents the network level, which can be one of the following:
  - `molecular`
  - `module`
  - `organelle`

## Directory Structure

In the `src/asset` folder, organize files by creating directories based on the network level. For example, if you are working with organelle files:

1. Create a directory named `organelle`.
2. Place all related files inside this `organelle` directory.

## Network Levels

The network levels to categorize files include:

- Molecular
- Module
- Organelle

Make sure each file is placed in the corresponding directory based on its level.



The levels in the network are as follows:

```python
['MOLECULAR', 'MODULE', 'ORGANELLE']
```
If you want to change their order, you can sort the array in the force-chart-component.

To generate the necessary JSON files for each level (molecular, module, organelle), you need to run the Python script dummy_data.ipynb. This script will generate the respective JSON files.

Steps to Generate Data:
### 1. For ORGANELLE level (upper layer):
   ```python
   build_network_layout(node_number=100, level=Level.ORGANELLE)
   ```
### 2. For MODULE level (middle layer):
   ```python
   build_network_layout(node_number=100, level=Level.MODULE)
   ```
### 3. For MOLECULAR level (lower layer):
   ```python
   build_network_layout(node_number=100, level=Level.MOLECULAR)
   ```
Once the files are generated, rename the nodes in the upper layer to match the file names of the corresponding lower-level layers.

Layer Navigation
You should be able to navigate between different layers. For example:

After opening an ORGANELLE file, clicking on a node should lead to the corresponding MODULE file.
You should also be able to return to the original ORGANELLE file.
Implement a navigation function (or button) to allow easy transitions between these layers.

### Example Code for Building Different Layers:
```python
### ORGANELLE level
build_network_layout(node_number=10, level=Level.ORGANELLE)

### MODULE level (with a node from the organelle layer)
build_network_layout(node_number=10, level=Level.MODULE, node_id=str(1))

### MOLECULAR level
build_network_layout(node_number=10, level=Level.MOLECULAR)

# COMMUNITY level (if applicable)
build_network_layout(node_number=10, level=Level.COMMUNITY)
```

## Usage

Once the application is running, you can perform the following actions:

- **Upload File**: Click on the "Upload File" button to select a JSON file containing graph data.
- **Search**: Enter a search query in the search bar to highlight nodes with matching labels.
- **Zoom**: Use the zoom controls to zoom in and out of the graph.
- **Pan**: Toggle pan mode to move around the graph canvas.
- **Double Click**: Double-click on a node to expand the hierarchy and load additional data.

# Force Chart Component

This component uses an HTML5 canvas along with the D3.js force algorithm to dynamically generate and plot nodes on a canvas based on the `x` and `y` coordinates calculated by the algorithm.

## Functional Flow

1. **File Selection:**
   - The user starts by selecting a file.

2. **File Processing:**
   - Once a file is selected, the `onFileSelected` function is triggered within the `ForceChart` component.

3. **Canvas Rendering:**
   - The `onFileSelected` function processes the file and calls the `drawCanvas` function.

4. **Dynamic Plotting:**
   - The `drawCanvas` function uses the D3.js force algorithm to generate dynamic `x` and `y` coordinates. These coordinates are then updated within the `tick` function, which is responsible for plotting the nodes on the canvas.

### Callbacks

For each level (`organelle`, `module`, `molecular`), the following interaction callbacks are defined for both exploration and editing modes:

* **Hover**: `onHover(event: any, node: any, mode: string)`
* **Click**: `onClick(event: any, node: any, mode: string)`
* **DoubleClick**: `onDoubleClick(event: any, node: any, mode: string)`
* **RightClick**: `onRightClick(event: any, node: any, mode: string)`

These handlers log interaction details and can be expanded to implement any custom behavior.

### Usage

The component retrieves configuration settings from the `ConfigService` and dynamically generates the appropriate callbacks for node interaction. Here's how the component decides which component to load:

1. **Molecular Exploration**: When `param.molecular.exploration` is detected in the callback response, `MolecularExplorationComponent` is loaded, and the corresponding interaction event (hover, click, double click, right click) is invoked.
2. **Molecular Editing**: When `param.molecular.editing` is detected, `MolecularEditingComponent` is loaded, with the corresponding interaction event triggered.

### Example Callback Workflow

1. The component receives a response with event details.
2. It checks if `exploration` or `editing` mode is active for the molecular level.
3. The appropriate interaction callback (e.g., click, hover) is executed based on the event type.
4. The corresponding component (`MolecularExplorationComponent` or `MolecularEditingComponent`) is loaded dynamically.

This component uses an HTML5 canvas along with the D3.js force algorithm to dynamically generate and plot nodes on a canvas based on the `x` and `y` coordinates calculated by the algorithm.

## Functional Flow

1. **File Selection:**
   - The user starts by selecting a file.

2. **File Processing:**
   - Once a file is selected, the `onFileSelected` function is triggered within the `ForceChart` component.

3. **Canvas Rendering:**
   - The `onFileSelected` function processes the file and calls the `drawCanvas` function.

4. **Dynamic Plotting:**
   - The `drawCanvas` function uses the D3.js force algorithm to generate dynamic `x` and `y` coordinates. These coordinates are then updated within the `tick` function, which is responsible for plotting the nodes on the canvas.

## Resources

- [D3.js Documentation](https://d3js.org/)
- [Angular Documentation](https://angular.io/)
- [Tutorial: Creating Interactive Graphs with D3.js](https://www.tutorialspoint.com/d3js/d3js_introduction.htm)
- [D3 and Canvas in 3 steps](https://www.freecodecamp.org/news/d3-and-canvas-in-3-steps-8505c8b27444/)
- [Working with D3.js and Canvas](https://www.bocoup.com/blog/d3js-and-canvas)
- [Needles, Haystacks, and the Canvas API - data visualization - Bocoup](https://www.bocoup.com/blog/2d-picking-in-canvas)
- [Learnings from a d3.js addict on starting with canvas | Visual Cinnamon](https://www.visualcinnamon.com/2015/11/learnings-from-a-d3-js-addict-on-starting-with-canvas/)


## Troubleshooting

- If you encounter issues with the D3 force chart, please check the browser console for error messages and refer to the documentation.
- Ensure that the data format is compatible with the chart's requirements.

## Contributing

Contributions to this project are welcome! Please fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss potential improvements.

## Credits

This project was created by Saiyudh Mannan, Emanuel Lange, Daniel Walke.

## License

This project is licensed under the [MIT License](LICENSE).








