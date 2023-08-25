import { Injectable } from '@angular/core';
import { ColumnData } from './metadata-columnData'; 

@Injectable({
  providedIn: 'root'
})
export class MetaDataInputService {
  getColumnData(): Promise<ColumnData[]> {
    return Promise.resolve([
     { Counter: 1, Sourcename: "biogas sample", ProjectIdentifier: "ISAS_SDRF", Study: "", Project: "", Program: "", 
      BiologicalReplicate: 1, Metagenomes: "ecological metagenome", EcologicalMetagenomes: "biogas metagenom", AnalyticalFraction: "", TemperatureCondtions: "",
      Pressure: "", pH: "", CarbonSource: "", ElectronSource: "", CountIdentifiedSpezies: "", 
      AssayName: "Assay 1", ExperimentType: "heat shock", TechnologyType: "", TechnicalReplicate: 1, Label: "label 1", FractionIdentifier: 1,
      CleavantAgentDetails: "", Instrument: "", ModificationParameters: "", ModificationParameters1: "", ModificationParameters2: "", 
      DissociationMethod: "", PrecursorMassTolerance: "", FragmentMassTolerance: "", DataFile: "datafile path 1", FileUri: "file uri 1", mzID:"mzID 1",
      mzML: "mzML 1", Comment: "", FactorValue: "heat shock"},

      { Counter: 2, Sourcename: "biogas sample", ProjectIdentifier: "ISAS_SDRF", Study: "", Project: "", Program: "", 
      BiologicalReplicate: 2, Metagenomes: "ecological metagenome", EcologicalMetagenomes: "biogas metagenom", AnalyticalFraction: "", TemperatureCondtions: "",
      Pressure: "", pH: "", CarbonSource: "", ElectronSource: "", CountIdentifiedSpezies: "", 
      AssayName: "Assay 1", ExperimentType: "heat shock", TechnologyType: "", TechnicalReplicate: 2, Label: "label 1", FractionIdentifier: 1,
      CleavantAgentDetails: "", Instrument: "", ModificationParameters: "", ModificationParameters1: "", ModificationParameters2: "", 
      DissociationMethod: "", PrecursorMassTolerance: "", FragmentMassTolerance: "", DataFile: "datafile path 2", FileUri: "file uri 2", mzID:"mzID 2",
      mzML: "mzML 2", Comment: "", FactorValue: "heat shock"},

      { Counter: 3, Sourcename: "biogas sample", ProjectIdentifier: "ISAS_SDRF", Study: "", Project: "", Program: "", 
      BiologicalReplicate: 3, Metagenomes: "ecological metagenome", EcologicalMetagenomes: "biogas metagenom", AnalyticalFraction: "", TemperatureCondtions: "",
      Pressure: "", pH: "", CarbonSource: "", ElectronSource: "", CountIdentifiedSpezies: "", 
      AssayName: "Assay 1", ExperimentType: "heat shock", TechnologyType: "", TechnicalReplicate: 3, Label: "label 1", FractionIdentifier: 1,
      CleavantAgentDetails: "", Instrument: "", ModificationParameters: "", ModificationParameters1: "", ModificationParameters2: "", 
      DissociationMethod: "", PrecursorMassTolerance: "", FragmentMassTolerance: "", DataFile: "datafile path 3", FileUri: "file uri 3", mzID:"mzID 3",
      mzML: "mzML 3", Comment: "", FactorValue: "heat shock"},

      { Counter: 4, Sourcename: "biogas sample", ProjectIdentifier: "ISAS_SDRF", Study: "", Project: "", Program: "", 
      BiologicalReplicate: 4, Metagenomes: "ecological metagenome", EcologicalMetagenomes: "biogas metagenom", AnalyticalFraction: "", TemperatureCondtions: "",
      Pressure: "", pH: "", CarbonSource: "", ElectronSource: "", CountIdentifiedSpezies: "", 
      AssayName: "Assay 1", ExperimentType: "heat shock", TechnologyType: "", TechnicalReplicate: 1, Label: "label 1", FractionIdentifier: 1,
      CleavantAgentDetails: "", Instrument: "", ModificationParameters: "", ModificationParameters1: "", ModificationParameters2: "", 
      DissociationMethod: "", PrecursorMassTolerance: "", FragmentMassTolerance: "", DataFile: "datafile path 4", FileUri: "file uri 4", mzID:"mzID 4",
      mzML: "mzML 4", Comment: "", FactorValue: "heat shock"}

])
}
}
