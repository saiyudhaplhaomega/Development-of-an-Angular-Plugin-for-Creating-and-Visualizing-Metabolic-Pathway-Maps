import {
  Group,
  GroupingOptions,
  PeptideJSON,
  PeptideObject,
  ProteinGroupJSON, ProteinGroupObject,
  ProteinJSON,
  PsmJSON,
  Spectrum
} from '../objects/tableobjects';

export interface DistributionParams {
  numberOfMainGroups: number;
  subGroupsPerMainGroup: number;
}


interface InputLists {
  peptideList: PeptideJSON[];
  proteinList: ProteinJSON[];
  psmList: PsmJSON[];
  spectrumIDs: string[];
}


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


function createNewPsm(peptideID: string, spectrumID: string): PsmJSON {
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


function createNewProtein(peptideNodes: string[]): ProteinJSON {

  return {
    proteinID: Math.random().toString(36).substring(7),
    name: Math.random().toString(36).substring(7),
    peptideNodes: peptideNodes,
  };
}


function createProteinList(peptideList: PeptideJSON[], length: number): ProteinJSON[] {

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


function createProteinGroupFromInputLists(groupId: string,
                                          groupingOption: Group,
                                          experimentId: string,
                                          inputLists: InputLists,
                                          parent: string,
                                          children?: string[]): ProteinGroupJSON {

  const proteinGroupObject: ProteinGroupJSON = {
    grouptype: groupingOption,

    proteinGroupID: groupId,
    experimentID: experimentId,
    peptideList: inputLists.peptideList,
    proteinList: inputLists.proteinList,
    psmList: inputLists.psmList,
    spectrumIDs: inputLists.spectrumIDs,

    // representativeAccession: Math.random().toString(36).substring(7),
    // representativeDescription: Math.random().toString(36).substring(7)
  };

  if (parent !== '') {
    proteinGroupObject.parentProteinGroupID = '';
    return proteinGroupObject;
  }

  proteinGroupObject.childProteinGroupIDs = children;
  return proteinGroupObject;
}


function createNewProteinSubGroup(groupId: string,
                                  parentId: string,
                                  experimentID: string,
                                  groupingOption: GroupingOptions): ProteinGroupJSON {

  const subGroupOption = groupingOption === GroupingOptions.OCCAM ? Group.OCCAMSUBGROUP : Group.ANTIOCCAMSUBGROUP;

  const spectrumList = createSpectrumList(400);
  const peptideList = createPeptideList(200);

  const inputLists: InputLists = {
    spectrumIDs: spectrumList,
    peptideList: peptideList,
    psmList: createPsmList(peptideList, spectrumList),
    proteinList: createProteinList(peptideList, 100),
  };

  return createProteinGroupFromInputLists(groupId, subGroupOption, experimentID, inputLists, parentId);
}


function createMainFromSubGroups(groupId: string,
                                 childGroups: ProteinGroupJSON[],
                                 experimentID: string,
                                 groupingOption: GroupingOptions): ProteinGroupJSON {

  const mainGroupOption = groupingOption === GroupingOptions.OCCAM ? Group.OCCAMGROUP : Group.ANTIOCCAMGROUP;

  const inputLists: InputLists = {
    spectrumIDs: [],
    peptideList: [],
    psmList: [],
    proteinList: [],
  };

  const children = [];

  childGroups.forEach(childGroup => {
    children.push(childGroup.proteinGroupID);

    inputLists.spectrumIDs.push(...childGroup.spectrumIDs);
    inputLists.peptideList.push(...childGroup.peptideList);
    inputLists.psmList.push(...childGroup.psmList);
    inputLists.proteinList.push(...childGroup.proteinList);
  });

  return createProteinGroupFromInputLists(groupId, mainGroupOption, experimentID, inputLists, '', children);
}


export function createProteinGroupData(
  experimentID: string,
  groupingOption: GroupingOptions,
  distribution: DistributionParams): ProteinGroupObject[] {

  const {numberOfMainGroups, subGroupsPerMainGroup} = distribution;
  const proteinGroups = [];
  const subGroups = [];

  for (let subGroupIndex = 0; subGroupIndex < numberOfMainGroups * subGroupsPerMainGroup; subGroupIndex++) {
    const groupId = Math.random().toString(36).substring(7);
    subGroups.push(createNewProteinSubGroup(groupId, 'noParent', experimentID, groupingOption));
  }

  for (let mainGroupIndex = 0; mainGroupIndex < numberOfMainGroups; mainGroupIndex++) {
    const groupId = Math.random().toString(36).substring(7);
    const children = [];

    for (let subGroupIterator = 0; subGroupIterator < subGroupsPerMainGroup; subGroupIterator++) {
      const subGroup = subGroups[mainGroupIndex * subGroupsPerMainGroup + subGroupIterator];
      subGroup.parentProteinGroupID = groupId;

      children.push(subGroup);
    }

    proteinGroups.push(createMainFromSubGroups(groupId, children, experimentID, groupingOption), ...children);
  }

  return proteinGroups;
}
