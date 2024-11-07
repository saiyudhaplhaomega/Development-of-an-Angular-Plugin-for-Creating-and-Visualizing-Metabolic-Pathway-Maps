import { Injectable } from '@angular/core';
import * as d3 from 'd3';
// Common refresh rates to map to
const commonRefreshRates = [30, 60, 120, 144, 240];

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor() {}

  // Function to round FPS to the nearest common refresh rate
  public roundToRefreshRate(fps: number): number {
    return commonRefreshRates.reduce((prev, curr) => {
      return Math.abs(curr - fps) < Math.abs(prev - fps) ? curr : prev;
    });
  }
  public nearestNode(event, nodes, zoomScale) {
     // Get mouse coordinates relative to the canvas
     let mouseX = event.offsetX / zoomScale;
     let mouseY = event.offsetY / zoomScale;
     if(!mouseX && !mouseY) { // Click coordinate 
        mouseX = event.sourceEvent.offsetX / zoomScale;
        mouseY = event.sourceEvent.offsetY / zoomScale;
     }
     // Find the node closest to the mouse cursor
     let closestNode = null;
     let minDistance = 10;
 
     nodes.forEach(node => {
         const distance = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2);
         if (distance < minDistance) {
             minDistance = distance;
             closestNode = node;
         }
     });
     return closestNode;
  }

  
}
