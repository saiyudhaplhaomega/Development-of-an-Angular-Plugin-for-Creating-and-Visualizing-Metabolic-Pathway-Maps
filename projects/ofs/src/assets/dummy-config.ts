export const dummyConfig = {
  job: {
    jobId: '4168bf8f-3280-4b93-834a-e4dcbbb62beb',
    state: 'CREATED',
  },
  configData: {
    overviewConfig: {
      overviewJobId: 'a4c139f5-ba1c-4b90-af8e-a96f7cedf030',
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
      inputCSVID: '621cd55e-070d-49d7-ae6b-7072a6d23d30',
      data: '',
    },
    preprocessingConfig: {
      preprocessingJobId: '4168bf8f-3280-4b93-834a-e4dcbbb62beb',
      controlGroup: 'control',
      testGroup: 'test',
      repeats: 2,
      folds: 5,
    },
    wrapperConfig: {
      wrapperJobId: '4168bf8f-3280-4b93-834a-e4dcbbb62beb',
      repeats: 2,
      folds: 5,
      pvalCutoff: 0.0001,
    },
    classifierConfig: {
      classifierJobId: '4168bf8f-3280-4b93-834a-e4dcbbb62beb',
      selectedFeatures: [
        {
          featureID: 'Meta-Protein 24100',
        },
        {
          featureID: 'Meta-Protein 13734',
        },
        {
          featureID: 'Meta-Protein 14316',
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
          featureID: 'Meta-Protein 540',
        },
        {
          featureID: 'Meta-Protein 13253',
        },
        {
          featureID: 'Meta-Protein 14325',
        },
        {
          featureID: 'Meta-Protein 24100',
        },
        {
          featureID: 'Meta-Protein 26305',
        },
        {
          featureID: 'Meta-Protein 13735',
        },
        {
          featureID: 'Meta-Protein 42673',
        },
        {
          featureID: 'Meta-Protein 13734',
        },
        {
          featureID: 'Meta-Protein 12947',
        },
        {
          featureID: 'Meta-Protein 12945',
        },
        {
          featureID: 'Meta-Protein 796',
        },
        {
          featureID: 'Meta-Protein 17525',
        },
        {
          featureID: 'Meta-Protein 15322',
        },
        {
          featureID: 'Meta-Protein 278',
        },
        {
          featureID: 'Meta-Protein 531',
        },
        {
          featureID: 'Meta-Protein 36586',
        },
        {
          featureID: 'Meta-Protein 330',
        },
        {
          featureID: 'Meta-Protein 1539',
        },
        {
          featureID: 'Meta-Protein 352',
        },
        {
          featureID: 'Meta-Protein 13424',
        },
        {
          featureID: 'Meta-Protein 14315',
        },
        {
          featureID: 'Meta-Protein 130',
        },
        {
          featureID: 'Meta-Protein 13246',
        },
        {
          featureID: 'Meta-Protein 17441',
        },
        {
          featureID: 'Meta-Protein 32043',
        },
        {
          featureID: 'Meta-Protein 25520',
        },
        {
          featureID: 'Meta-Protein 13549',
        },
        {
          featureID: 'Meta-Protein 14316',
        },
        {
          featureID: 'Meta-Protein 13546',
        },
        {
          featureID: 'Meta-Protein 16',
        },
      ],
      featureSelectionProfiles: [
        {
          profileID:
            'Meta-Protein 13734, Meta-Protein 14316, Meta-Protein 24100, ',
          features: [
            {
              featureID: 'Meta-Protein 13734',
            },
            {
              featureID: 'Meta-Protein 14316',
            },
            {
              featureID: 'Meta-Protein 24100',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13253, Meta-Protein 17441, Meta-Protein 32043, Meta-Protein 540, ',
          features: [
            {
              featureID: 'Meta-Protein 13253',
            },
            {
              featureID: 'Meta-Protein 17441',
            },
            {
              featureID: 'Meta-Protein 32043',
            },
            {
              featureID: 'Meta-Protein 540',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 130, Meta-Protein 15322, Meta-Protein 36586, Meta-Protein 42673, Meta-Protein 540, ',
          features: [
            {
              featureID: 'Meta-Protein 130',
            },
            {
              featureID: 'Meta-Protein 15322',
            },
            {
              featureID: 'Meta-Protein 36586',
            },
            {
              featureID: 'Meta-Protein 42673',
            },
            {
              featureID: 'Meta-Protein 540',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 12945, Meta-Protein 13246, Meta-Protein 13546, Meta-Protein 25520, ',
          features: [
            {
              featureID: 'Meta-Protein 12945',
            },
            {
              featureID: 'Meta-Protein 13246',
            },
            {
              featureID: 'Meta-Protein 13546',
            },
            {
              featureID: 'Meta-Protein 25520',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 12947, Meta-Protein 13246, Meta-Protein 278, Meta-Protein 531, ',
          features: [
            {
              featureID: 'Meta-Protein 12947',
            },
            {
              featureID: 'Meta-Protein 13246',
            },
            {
              featureID: 'Meta-Protein 278',
            },
            {
              featureID: 'Meta-Protein 531',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13424, Meta-Protein 13549, Meta-Protein 14315, Meta-Protein 14316, Meta-Protein 17525, Meta-Protein 540, ',
          features: [
            {
              featureID: 'Meta-Protein 13424',
            },
            {
              featureID: 'Meta-Protein 13549',
            },
            {
              featureID: 'Meta-Protein 14315',
            },
            {
              featureID: 'Meta-Protein 14316',
            },
            {
              featureID: 'Meta-Protein 17525',
            },
            {
              featureID: 'Meta-Protein 540',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13735, Meta-Protein 14316, Meta-Protein 540, ',
          features: [
            {
              featureID: 'Meta-Protein 13735',
            },
            {
              featureID: 'Meta-Protein 14316',
            },
            {
              featureID: 'Meta-Protein 540',
            },
          ],
        },
        {
          profileID: 'Meta-Protein 1539, Meta-Protein 352, Meta-Protein 540, ',
          features: [
            {
              featureID: 'Meta-Protein 1539',
            },
            {
              featureID: 'Meta-Protein 352',
            },
            {
              featureID: 'Meta-Protein 540',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 14316, Meta-Protein 16, Meta-Protein 26305, Meta-Protein 42673, Meta-Protein 796, ',
          features: [
            {
              featureID: 'Meta-Protein 14316',
            },
            {
              featureID: 'Meta-Protein 16',
            },
            {
              featureID: 'Meta-Protein 26305',
            },
            {
              featureID: 'Meta-Protein 42673',
            },
            {
              featureID: 'Meta-Protein 796',
            },
          ],
        },
        {
          profileID:
            'Meta-Protein 13246, Meta-Protein 14316, Meta-Protein 14325, Meta-Protein 330, Meta-Protein 540, ',
          features: [
            {
              featureID: 'Meta-Protein 13246',
            },
            {
              featureID: 'Meta-Protein 14316',
            },
            {
              featureID: 'Meta-Protein 14325',
            },
            {
              featureID: 'Meta-Protein 330',
            },
            {
              featureID: 'Meta-Protein 540',
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
