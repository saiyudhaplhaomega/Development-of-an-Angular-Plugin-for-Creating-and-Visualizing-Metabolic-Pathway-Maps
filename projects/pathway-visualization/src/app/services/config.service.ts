import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = AppConfig;

  constructor() {}

  getConfig() {
    return this.config;
  }

  // You can also add methods to dynamically update the config if needed
  setConfig(newConfig: Partial<typeof AppConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}
