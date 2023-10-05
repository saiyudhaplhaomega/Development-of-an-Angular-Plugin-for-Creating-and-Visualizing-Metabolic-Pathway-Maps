 import { Injectable } from '@angular/core'; 
 


 @Injectable({
  providedIn: 'root'
})
export class DataService {
  private formData: any = {}; // This can be your form data structure
  private simulationData: any = {}; // This can be your simulation data structure

  constructor() {}

  // Setters
  setFormData(data: any) {
    this.formData = data;
  }

  setSimulationData(data: any) {
    this.simulationData = data;
  }

  // Getters
  getFormData(): any {
    return this.formData;
  }

  getSimulationData(): any {
    return this.simulationData;
  }
}  
  

 
