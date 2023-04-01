export const dummyConfig = {
  job: { jobId: 'cc2d2415-2a70-4cf6-92ed-827e85181871', state: 'CREATED' },
  configData: {
    overviewConfig: {
      groups: [
        { groupName: 'control', groupPrefix: 'C' },
        { groupName: 'test', groupPrefix: 'NASH' },
      ],
      groupSelectionOptions: 'select by prefix',
    },
    preprocessingConfig: {
      controlGroup: 'control',
      testGroup: 'test',
      repeats: 2,
      folds: 5,
    },
    wrapperConfig: { repeats: 2, folds: 5, pvalCutoff: 0.0001 },
    classifierConfig: {},
  },
  responseData: {
    overviewResponse: {
      classDistribution: 'Class-Sizes-C-vs-NASH.jpg',
      dataSparsity: 'Overview-Molecule-Sparsity-C-vs-NASH.jpg',
      testGroups: ['test'],
      controlGroup: 'control',
    },
    preprocessingResponse: {
      pvaluesMolecules: 'Overview-Molecule-pValue-C-vs-NASH.jpg',
      predictivePerformance: 'Filter-Results-C-vs-NASH.jpg',
    },
    wrapperResponse: {
      wrapperPanel: 'Wrapper-Results-Panel-C-vs-NASH.jpg',
      wrapperSingleMolecule: 'Wrapper-Results-Single-Molecule-C-vs-NASH.jpg',
      featureSelection: [
        { featureID: 'Meta-Protein 20527' },
        { featureID: 'Meta-Protein 540' },
        { featureID: 'Meta-Protein 14320' },
        { featureID: 'Meta-Protein 14325' },
        { featureID: 'Meta-Protein 220' },
        { featureID: 'Meta-Protein 25657' },
        { featureID: 'Meta-Protein 16144' },
        { featureID: 'Meta-Protein 24100' },
        { featureID: 'Meta-Protein 12949' },
        { featureID: 'Meta-Protein 26305' },
        { featureID: 'Meta-Protein 13735' },
        { featureID: 'Meta-Protein 42673' },
        { featureID: 'Meta-Protein 113' },
        { featureID: 'Meta-Protein 15321' },
        { featureID: 'Meta-Protein 330' },
        { featureID: 'Meta-Protein 13424' },
        { featureID: 'Meta-Protein 130' },
        { featureID: 'Meta-Protein 13246' },
        { featureID: 'Meta-Protein 32043' },
        { featureID: 'Meta-Protein 54033' },
        { featureID: 'Meta-Protein 27685' },
        { featureID: 'Meta-Protein 14319' },
        { featureID: 'Meta-Protein 14316' },
        { featureID: 'Meta-Protein 14317' },
        { featureID: 'Meta-Protein 16' },
        { featureID: 'Meta-Protein 15' },
        { featureID: 'Meta-Protein 313' },
      ],
      featureSelectionProfiles: [
        {
          profileID:
            'Meta-Protein 13424, Meta-Protein 14316, Meta-Protein 14325, Meta-Protein 24100, Meta-Protein 25657, Meta-Protein 330, Meta-Protein 540, ',
          features: [
            { featureID: 'Meta-Protein 13424' },
            { featureID: 'Meta-Protein 14316' },
            { featureID: 'Meta-Protein 14325' },
            { featureID: 'Meta-Protein 24100' },
            { featureID: 'Meta-Protein 25657' },
            { featureID: 'Meta-Protein 330' },
            { featureID: 'Meta-Protein 540' },
          ],
        },
        {
          profileID:
            'Meta-Protein 13735, Meta-Protein 14316, Meta-Protein 32043, Meta-Protein 42673, ',
          features: [
            { featureID: 'Meta-Protein 13735' },
            { featureID: 'Meta-Protein 14316' },
            { featureID: 'Meta-Protein 32043' },
            { featureID: 'Meta-Protein 42673' },
          ],
        },
        {
          profileID:
            'Meta-Protein 15321, Meta-Protein 27685, Meta-Protein 42673, Meta-Protein 540, Meta-Protein 54033, ',
          features: [
            { featureID: 'Meta-Protein 15321' },
            { featureID: 'Meta-Protein 27685' },
            { featureID: 'Meta-Protein 42673' },
            { featureID: 'Meta-Protein 540' },
            { featureID: 'Meta-Protein 54033' },
          ],
        },
        {
          profileID:
            'Meta-Protein 14319, Meta-Protein 16, Meta-Protein 16144, Meta-Protein 24100, ',
          features: [
            { featureID: 'Meta-Protein 14319' },
            { featureID: 'Meta-Protein 16' },
            { featureID: 'Meta-Protein 16144' },
            { featureID: 'Meta-Protein 24100' },
          ],
        },
        {
          profileID: 'Meta-Protein 15, Meta-Protein 540, ',
          features: [
            { featureID: 'Meta-Protein 15' },
            { featureID: 'Meta-Protein 540' },
          ],
        },
        {
          profileID:
            'Meta-Protein 13246, Meta-Protein 14317, Meta-Protein 20527, ',
          features: [
            { featureID: 'Meta-Protein 13246' },
            { featureID: 'Meta-Protein 14317' },
            { featureID: 'Meta-Protein 20527' },
          ],
        },
        {
          profileID:
            'Meta-Protein 130, Meta-Protein 220, Meta-Protein 313, Meta-Protein 32043, Meta-Protein 330, ',
          features: [
            { featureID: 'Meta-Protein 130' },
            { featureID: 'Meta-Protein 220' },
            { featureID: 'Meta-Protein 313' },
            { featureID: 'Meta-Protein 32043' },
            { featureID: 'Meta-Protein 330' },
          ],
        },
        {
          profileID:
            'Meta-Protein 14319, Meta-Protein 14320, Meta-Protein 540, ',
          features: [
            { featureID: 'Meta-Protein 14319' },
            { featureID: 'Meta-Protein 14320' },
            { featureID: 'Meta-Protein 540' },
          ],
        },
        {
          profileID:
            'Meta-Protein 113, Meta-Protein 13735, Meta-Protein 15321, Meta-Protein 26305, Meta-Protein 42673, ',
          features: [
            { featureID: 'Meta-Protein 113' },
            { featureID: 'Meta-Protein 13735' },
            { featureID: 'Meta-Protein 15321' },
            { featureID: 'Meta-Protein 26305' },
            { featureID: 'Meta-Protein 42673' },
          ],
        },
        {
          profileID:
            'Meta-Protein 12949, Meta-Protein 13246, Meta-Protein 14319, Meta-Protein 540, ',
          features: [
            { featureID: 'Meta-Protein 12949' },
            { featureID: 'Meta-Protein 13246' },
            { featureID: 'Meta-Protein 14319' },
            { featureID: 'Meta-Protein 540' },
          ],
        },
      ],
    },
    classifierResponse: {},
  },
};
