import {PeptideJSON, PeptideNode, ProteinGroupJSON, ProteinJSON, PsmJSON, Spectrum} from '../objects/tableobjects';

export function createNewProtein(id: number): ProteinJSON {

  const peptides: string[] = [];

  for (let i = 1; i <= 100; i++) {
    peptides.push(Math.random().toString(36).substring(7));
  }

  return {
    proteinID: id.toString(),
    name: Math.random().toString(36).substring(7),
    peptideNodes: peptides,
  };
}

function createNewPeptide(): PeptideJSON {

  return {
    id: Math.random().toString(36).substring(7),
  };
}

function createNewPsm(): PsmJSON {
  return {
    psmID: Math.random().toString(36).substring(7),
    peptideID: Math.random().toString(36).substring(7),
    spectrumID: Math.random().toString(36).substring(7)
  };
}

function createSpectrum(): Spectrum {
  return{
    spectrumID: Math.random().toString(36).substring(7)
  };
}

export function createNewProteinGroup(experimentID: string): ProteinGroupJSON {

  const peptides = [];
  for (let i = 0; i <= 100; i++) {
    peptides.push(createNewPeptide());
  }

  const proteins = [];
  for (let i = 0; i < 100; i++) {
    proteins.push(createNewProtein(i));
  }

  const psmList = [];
  for (let i = 0; i < 100; i++) {
    psmList.push(createNewPsm());
  }

  const spectrumList = [];
  for (let i = 0; i < 100; i++) {
    spectrumList.push(Math.random().toString(36).substring(7));
  }

  return {
    proteinGroupID: Math.random().toString(36).substring(7),
    experimentID: experimentID,
    peptideList: peptides,
    proteinList: proteins,
    psmList: psmList,
    spectrumIDs: spectrumList,

    // representativeAccession: Math.random().toString(36).substring(7),
    // representativeDescription: Math.random().toString(36).substring(7)
  };
}
