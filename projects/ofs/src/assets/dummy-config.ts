export const dummyConfig = {
  job: {
    jobId: '193f2ca9-bb1b-4236-9dd5-ad029da045be',
    state: 'CREATED',
  },
  configData: {
    overviewConfig: {
      overviewJobId: '0efc7f6d-f165-43bc-a43b-139aa14e9d64',
      groups: [
        {
          groupName: 'control',
          groupPrefix: 'C',
        },
        {
          groupName: 'test',
          groupPrefix: 'NASH',
        },
      ],
      groupSelectionOptions: 'select by prefix',
      inputCSVID: '9f799f06-a287-4b08-a408-907d7884ee3f',
      data: 'inputCSV.csv',
    },
    preprocessingConfig: {
      preprocessingJobId: '193f2ca9-bb1b-4236-9dd5-ad029da045be',
      controlGroup: 'control',
      testGroup: 'test',
      repeats: 2,
      folds: 5,
    },
    wrapperConfig: {
      wrapperJobId: '193f2ca9-bb1b-4236-9dd5-ad029da045be',
      repeats: 2,
      folds: 5,
      pvalCutoff: 0.0001,
    },
    classifierConfig: {
      classifierJobId: '193f2ca9-bb1b-4236-9dd5-ad029da045be',
      selectedFeatures: [
        {
          featureID: 'Meta-Protein 25657',
        },
        {
          featureID: 'Meta-Protein 13733',
        },
        {
          featureID: 'Meta-Protein 12945',
        },
      ],
    },
  },
  responseData: {
    overviewResponse: {
      classDistribution: 'classSizeImage.html',
      dataSparsity: 'sparsityImage.html',
      testGroups: ['test'],
      controlGroup: 'control',
    },
    preprocessingResponse: {
      predictivePerformance: 'filterImage.html',
    },
    wrapperResponse: {
      wrapperPanel: 'wrapperPanelImage.html',
      wrapperSingleMolecule: 'wrapperSingleMoleculeImage.html',
      featureSelection: [
        {
          featureID: 'Meta-Protein 2559',
        },
        {
          featureID: 'Meta-Protein 14320',
        },
        {
          featureID: 'Meta-Protein 20865',
        },
        {
          featureID: 'Meta-Protein 540',
        },
        {
          featureID: 'Meta-Protein 13253',
        },
        {
          featureID: 'Meta-Protein 14325',
        },
        {
          featureID: 'Meta-Protein 220',
        },
        {
          featureID: 'Meta-Protein 14469',
        },
        {
          featureID: 'Meta-Protein 13732',
        },
        {
          featureID: 'Meta-Protein 25657',
        },
        {
          featureID: 'Meta-Protein 24',
        },
        {
          featureID: 'Meta-Protein 24025',
        },
        {
          featureID: 'Meta-Protein 26305',
        },
        {
          featureID: 'Meta-Protein 13733',
        },
        {
          featureID: 'Meta-Protein 42673',
        },
        {
          featureID: 'Meta-Protein 12945',
        },
        {
          featureID: 'Meta-Protein 36586',
        },
        {
          featureID: 'Meta-Protein 1539',
        },
        {
          featureID: 'Meta-Protein 13424',
        },
        {
          featureID: 'Meta-Protein 130',
        },
        {
          featureID: 'Meta-Protein 13246',
        },
        {
          featureID: 'Meta-Protein 13543',
        },
        {
          featureID: 'Meta-Protein 17441',
        },
        {
          featureID: 'Meta-Protein 25520',
        },
        {
          featureID: 'Meta-Protein 27685',
        },
        {
          featureID: 'Meta-Protein 14318',
        },
        {
          featureID: 'Meta-Protein 14319',
        },
        {
          featureID: 'Meta-Protein 13549',
        },
        {
          featureID: 'Meta-Protein 13546',
        },
        {
          featureID: 'Meta-Protein 14316',
        },
        {
          featureID: 'Meta-Protein 14317',
        },
        {
          featureID: 'Meta-Protein 16',
        },
        {
          featureID: 'Meta-Protein 15',
        },
      ],
      featureSelectionProfiles: [
        {
          profileID:
            'Meta-Protein 12945, Meta-Protein 13733, Meta-Protein 25657, ',
          features: [
            {
              featureID: 'Meta-Protein 12945',
            },
            {
              featureID: 'Meta-Protein 13733',
            },
            {
              featureID: 'Meta-Protein 25657',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 14317, Meta-Protein 14469, Meta-Protein 24, Meta-Protein 27685, Meta-Protein 42673, ',
          features: [
            {
              featureID: 'Meta-Protein 14317',
            },
            {
              featureID: 'Meta-Protein 14469',
            },
            {
              featureID: 'Meta-Protein 24',
            },
            {
              featureID: 'Meta-Protein 27685',
            },
            {
              featureID: 'Meta-Protein 42673',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13246, Meta-Protein 13546, Meta-Protein 14319, Meta-Protein 1539, Meta-Protein 24025, Meta-Protein 42673, ',
          features: [
            {
              featureID: 'Meta-Protein 13246',
            },
            {
              featureID: 'Meta-Protein 13546',
            },
            {
              featureID: 'Meta-Protein 14319',
            },
            {
              featureID: 'Meta-Protein 1539',
            },
            {
              featureID: 'Meta-Protein 24025',
            },
            {
              featureID: 'Meta-Protein 42673',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13253, Meta-Protein 14319, Meta-Protein 14469, Meta-Protein 16, Meta-Protein 17441, ',
          features: [
            {
              featureID: 'Meta-Protein 13253',
            },
            {
              featureID: 'Meta-Protein 14319',
            },
            {
              featureID: 'Meta-Protein 14469',
            },
            {
              featureID: 'Meta-Protein 16',
            },
            {
              featureID: 'Meta-Protein 17441',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 14319, Meta-Protein 2559, Meta-Protein 25657, Meta-Protein 540, ',
          features: [
            {
              featureID: 'Meta-Protein 14319',
            },
            {
              featureID: 'Meta-Protein 2559',
            },
            {
              featureID: 'Meta-Protein 25657',
            },
            {
              featureID: 'Meta-Protein 540',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 12945, Meta-Protein 130, Meta-Protein 13246, Meta-Protein 13424, Meta-Protein 14320, Meta-Protein 20865, Meta-Protein 25520, Meta-Protein 36586, ',
          features: [
            {
              featureID: 'Meta-Protein 12945',
            },
            {
              featureID: 'Meta-Protein 130',
            },
            {
              featureID: 'Meta-Protein 13246',
            },
            {
              featureID: 'Meta-Protein 13424',
            },
            {
              featureID: 'Meta-Protein 14320',
            },
            {
              featureID: 'Meta-Protein 20865',
            },
            {
              featureID: 'Meta-Protein 25520',
            },
            {
              featureID: 'Meta-Protein 36586',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13543, Meta-Protein 14316, Meta-Protein 14325, Meta-Protein 14469, Meta-Protein 220, Meta-Protein 26305, ',
          features: [
            {
              featureID: 'Meta-Protein 13543',
            },
            {
              featureID: 'Meta-Protein 14316',
            },
            {
              featureID: 'Meta-Protein 14325',
            },
            {
              featureID: 'Meta-Protein 14469',
            },
            {
              featureID: 'Meta-Protein 220',
            },
            {
              featureID: 'Meta-Protein 26305',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13246, Meta-Protein 14319, Meta-Protein 25657, Meta-Protein 540, ',
          features: [
            {
              featureID: 'Meta-Protein 13246',
            },
            {
              featureID: 'Meta-Protein 14319',
            },
            {
              featureID: 'Meta-Protein 25657',
            },
            {
              featureID: 'Meta-Protein 540',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13246, Meta-Protein 13732, Meta-Protein 14469, Meta-Protein 17441, Meta-Protein 2559, ',
          features: [
            {
              featureID: 'Meta-Protein 13246',
            },
            {
              featureID: 'Meta-Protein 13732',
            },
            {
              featureID: 'Meta-Protein 14469',
            },
            {
              featureID: 'Meta-Protein 17441',
            },
            {
              featureID: 'Meta-Protein 2559',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 12945, Meta-Protein 13549, Meta-Protein 14318, Meta-Protein 15, Meta-Protein 17441, Meta-Protein 24, Meta-Protein 42673, ',
          features: [
            {
              featureID: 'Meta-Protein 12945',
            },
            {
              featureID: 'Meta-Protein 13549',
            },
            {
              featureID: 'Meta-Protein 14318',
            },
            {
              featureID: 'Meta-Protein 15',
            },
            {
              featureID: 'Meta-Protein 17441',
            },
            {
              featureID: 'Meta-Protein 24',
            },
            {
              featureID: 'Meta-Protein 42673',
            },
          ],
        },
      ],
    },
    classifierResponse: {
      pcaImage: 'pcaImage.jpg',
      hacImage: 'hacImage.html',
      scatterPlotImage: 'scatterPlotImage.jpg',
      downloadLink: 'results.zip',
    },
  },
};
