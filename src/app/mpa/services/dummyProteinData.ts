import {PeptideJSON, ProteinGroupJSON, ProteinJSON, PsmJSON} from '../objects/tableobjects';

function createNewPeptide(): PeptideJSON {

  return {
    id: Math.random().toString(36).substring(7),
  };
}

function createPeptideList(length: number): PeptideJSON[] {

  const peptideList = [];
  for (let i = 0; i < length; i++) {
    peptideList.push(createNewPeptide());
  }

  return(peptideList);
}

function createNewSpectrum(): string {
  return Math.random().toString(36).substring(7);
}

function createSpectrumList(length: number): string[] {
  const spectrumList = [];
  for (let i = 0; i < length; i++) {
    spectrumList.push(createNewSpectrum());
  }
  return spectrumList;
}

export function createNewPsm(peptideID: string, spectrumID: string): PsmJSON {
  return {
    psmID: Math.random().toString(36).substring(7),
    peptideID: peptideID,
    spectrumID: spectrumID
  };
}

function createPsmList(peptideList: PeptideJSON[], spectrumList: string[]): PsmJSON[] {

  const psmList = [];
  const psmsPerPeptide = Math.floor(spectrumList.length / peptideList.length);

  let peptideIndex = 0;
  for (let i = 0; i < spectrumList.length; i++) {
    if (i > 0 && i % psmsPerPeptide === 0 && peptideIndex < peptideList.length) {
      peptideIndex++;
    }

    psmList.push(createNewPsm(peptideList[peptideIndex].id, spectrumList[i]));
  }

  return psmList;
}

export function createNewProtein(peptideNodes: string[]): ProteinJSON {

  return {
    proteinID: Math.random().toString(36).substring(7),
    name: Math.random().toString(36).substring(7),
    peptideNodes: peptideNodes,
  };
}

export function createProteinList(peptideList: PeptideJSON[], length: number): ProteinJSON[] {

  const proteinList = [];
  const peptidesPerProtein = Math.floor(peptideList.length / length);

  let proteinIndex = 0;
  let peptideNodes = [];

  for (let i = 0; i < peptideList.length; i++) {
    if (i > 0 && i % peptidesPerProtein === 0 && proteinIndex < length) {
      proteinList.push(createNewProtein([...peptideNodes]));
      peptideNodes = [];
      proteinIndex++;
    }

    peptideNodes.push(peptideList[i].id);
  }

  if (peptideNodes.length > 0) {
    proteinList.push(createNewProtein([...peptideNodes])); // add remaining peptides if any
  }

  return proteinList;
}

export function createNewProteinGroup(experimentID: string): ProteinGroupJSON {

  const spectrumList = createSpectrumList(400);
  const peptideList = createPeptideList(200);
  const psmList = createPsmList(peptideList, spectrumList);
  const proteinList = createProteinList(peptideList, 100);

  return {
    proteinGroupID: Math.random().toString(36).substring(7),
    experimentID: experimentID,
    peptideList: peptideList,
    proteinList: proteinList,
    psmList: psmList,
    spectrumIDs: spectrumList,

    // representativeAccession: Math.random().toString(36).substring(7),
    // representativeDescription: Math.random().toString(36).substring(7)
  };
}
