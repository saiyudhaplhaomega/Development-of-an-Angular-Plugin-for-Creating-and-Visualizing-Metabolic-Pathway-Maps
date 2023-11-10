import { Component} from '@angular/core';
import {FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


@Component({
  selector: 'app-metadata-quest',
  templateUrl: './metadata-quest.component.html',
  styleUrls: ['./metadata-quest.component.scss'],
})
export class MetadataQuestFormComponent {
  // This is the data for the first step
  model: any = {};
  specificMetagenomeOptions = [
    { value: 'gut', label: 'Gut' },
    { value: 'human', label: 'Human' },
    // ... other options
  ];

  metagenomeTypeOptions = [
    { value: 'ecological', label: 'Ecological' },
    { value: 'organism', label: 'Organism' },
    { value: 'synthetic', label: 'Synthetic' },
    { value: 'metagenome', label: 'Metagenome' },
    // Added for conditional display of the next field
  ];

  // This is the data for the second step
  technologyTypeOptions = [
    { value: 'shotgun', label: 'Shotgun' },
    // Add other technology types as needed
  ];

  digestionMethodOptions = [
    { value: 'inGel', label: 'In Gel' },
    { value: 'FASP', label: 'FASP' },
    // Add other digestion methods as needed
  ];

  // This is the Logic for the first step
  firstFieldGroup = {
      props: { label: 'Experiment Setup' },
      fieldGroup: [
        {
          key: 'experimentType',
          type: 'select',
          templateOptions: {
            label: 'Experiment Type',
            options: [
              { value: 'metaproteomics', label: 'Metaproteomics' },
              { value: 'proteomics', label: 'Proteomics' }, // This can be added later as per your requirement
            ],
          },
        },
        {
          key: 'metaproteomeType',
          type: 'select',
          templateOptions: {
            label: 'Which Metaproteom?',
            options: this.metagenomeTypeOptions,
          },
          hideExpression: "model.experimentType !== 'metaproteomics'",
        },
        {
          key: 'specificMetagenome',
          type: 'select',
          templateOptions: {
            label: 'Specific Metagenome?',
            options: this.specificMetagenomeOptions,
          },
          hideExpression: "model.metaproteomeType !== 'metagenome'",
        },
        // You can add more conditional fields here as needed
        ,
      ],
    }


  secondFieldGroup = {
      props: { label: 'Experimental Settings/ Measurement Settings' },
      fieldGroup: [
        {
          key: 'technologyType',
          type: 'select',
          templateOptions: {
            label: 'What kind of Metaproteomics (technology type)?',
            options: this.technologyTypeOptions,
          },
        },
        {
          key: 'measurementInstrument',
          type: 'input',
          templateOptions: {
            label: 'Which instruments were used for measurement?',
            placeholder: 'e.g., Orbitrap, TimsTOF',
          },
        },
        {
          key: 'digestionMethod',
          type: 'select',
          templateOptions: {
            label: 'What digestion method did you use?',
            options: this.digestionMethodOptions,
          },
        },
        {
          key: 'enzymeUsed',
          type: 'input',
          templateOptions: {
            label: 'Which enzyme (cleavant agent) did you use for digestion?',
            placeholder: 'e.g., Trypsin',
          },
        },
        // Add additional fields for Modification Parameters, Dissociation method, etc.
      ],
    }


  form = new FormGroup({});

  // This is the setup for the stepper
  fields: FormlyFieldConfig[] = [
    {
      type: 'stepper',
      fieldGroup: [this.firstFieldGroup, this.secondFieldGroup],
    },
  ];

  onSubmit(model) {
    alert(JSON.stringify(this.model));
  }
}


