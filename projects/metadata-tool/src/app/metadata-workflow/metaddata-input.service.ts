import { Injectable } from '@angular/core';
import { ColumnData } from './metadata-columnData'; 

@Injectable({
  providedIn: 'root'
})
export class MetaDataInputService {
  getColumnData(): Promise<ColumnData[]> {
    return Promise.resolve([
  {Counter: 1, Sourcename: 'biogas sample', Projectidentifier: "ISAS_SDRF", Study: 'SDRF for Standardization', Project: 'de.NBI', Program: 'de.NBI', biologicalreplicate: "1", 
  metagenomes: "ecological metagenome", ecologicalmetagenomes: "biogas metagenom" },
  {Counter: 2, Sourcename: 'biogas sample', Projectidentifier: "ISAS_SDRF", Study: 'SDRF for Standardization', Project: 'de.NBI', Program: 'de.NBI', biologicalreplicate: "2", 
  metagenomes: "ecological metagenome", ecologicalmetagenomes: "biogas metagenom" },
  {Counter: 3, Sourcename: 'soil sample', Projectidentifier: "ISAS_SDRF", Study: 'SDRF for Standardization', Project: 'de.NBI', Program: 'de.NBI', biologicalreplicate: "1", 
  metagenomes: "ecological metagenome", ecologicalmetagenomes: "soil metagenom" },
  {Counter: 4, Sourcename: 'soil sample', Projectidentifier: "ISAS_SDRF", Study: 'SDRF for Standardization', Project: 'de.NBI', Program: 'de.NBI', biologicalreplicate: "2", 
  metagenomes: "ecological metagenome", ecologicalmetagenomes: "soil metagenom" },

])
}
}
