import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { MetaDataService } from "../../services/metaddata-input.service";

@Component({
  selector: "app-metadata-quest",
  templateUrl: "./metadata-quest.component.html",
  styleUrls: ["./metadata-quest.component.scss"]
})
export class MetadataQuestFormComponent {
  // This is the data for the first step
  @Output() questCompleted = new EventEmitter<boolean>();

  options: FormlyFormOptions = {};
  model = {};
  specificMetagenomeOptions = [
    { value: "gut", label: "Gut" },
    { value: "human", label: "Human" }
    // ... other options
  ];

  metagenomeTypeOptions = [
    { value: "ecological", label: "Ecological" },
    { value: "organism", label: "Organism" },
    { value: "synthetic", label: "Synthetic" },
    { value: "metagenome", label: "Metagenome" }
    // Added for conditional display of the next field
  ];

  // This is the data for the second step
  technologyTypeOptions = [
    { value: "shotgun", label: "Shotgun" }
    // Add other technology types as needed
  ];

  digestionMethodOptions = [
    { value: "inGel", label: "In Gel" },
    { value: "FASP", label: "FASP" }
    // Add other digestion methods as needed
  ];

  // This is the Logic for the first step
  firstFieldGroup = {
    props: { label: "Experiment Settings" },
    fieldGroup: [
      {
        key: "experimentType",
        type: "select",
        templateOptions: {
          info: "This is additional information",
          customTooltip: "This is a custom tooltip for the example field",
          label: "Experiment Type",
          description: "What kind of experiment was done?",
          options: [
            { value: "metaproteomics", label: "Metaproteomics" },
            { value: "proteomics", label: "Proteomics" } // This can be added later as per your requirement
          ]
        }
      },
      {
        key: "metagenomes",
        type: "select",
        templateOptions: {
          label: "Which Metaproteom?",
          options: this.metagenomeTypeOptions
        },
        hideExpression: "model.experimentType !== 'metaproteomics'"
      },
      {
        key: "ecologicalMetagenomes",
        type: "select",
        templateOptions: {
          label: "Specific Metagenome?",
          options: this.specificMetagenomeOptions
        },
        hideExpression: "model.metaproteomeType !== 'metagenome'"
      },
      // You can add more conditional fields here as needed
      ,
    ]
  };

  secondFieldGroup = {
    props: { label: " Measurement Settings" },
    fieldGroup: [
      {
        key: "technologyType",
        type: "select",
        description:
          "Methods, which are used to quantify the protein concentration of the analyzed samples. e.g., BCA, Lowry, Bradford, …",
        templateOptions: {
          label: "What kind of Metaproteomics (technology type)?",
          options: this.technologyTypeOptions
        }
      },
      {
        key: "instrument",
        type: "input",
        templateOptions: {
          label: "Which instruments were used for measurement?",
          placeholder: "e.g., Orbitrap, TimsTOF"
        }
      },
      {
        key: "cleavantAgentDetails",
        type: "select",
        templateOptions: {
          label: "What digestion method did you use?",
          options: this.digestionMethodOptions,
          description:
            "Methods, which are used to proteolytic digest the protein to peptides for LC-MS/MS analysis. E.g., FASP digestion, in-gel digestion, S-trap, …"
        }
      },
      {
        key: "modificationParameters",
        type: "input",
        templateOptions: {
          label: "Which enzyme (cleavant agent) did you use for digestion?",
          placeholder: "e.g., Trypsin"
        }
      }
      // Add additional fields for Modification Parameters, Dissociation method, etc.
    ]
  };

  thirdFieldGroup = {
    props: { label: "Questions for Experiment" },
    fieldGroup: [
      {
        key: "assayName",
        type: "input",
        templateOptions: {
          label: "What assay was used?",
          placeholder: "Enter the assay used"
        }
      },
      {
        key: "label",
        type: "input",
        templateOptions: {
          label: "Labels used?",
          placeholder: "Enter any labels used"
        }
      }
    ]
  };

  fourthFieldGroup = {
    props: { label: "About the Project" },
    fieldGroup: [
      {
        key: "group",
        type: "input",
        templateOptions: {
          label: "Group",
          placeholder: "Enter the group name"
        }
      },
      {
        key: "project",
        type: "input",
        templateOptions: {
          label: "Project",
          placeholder: "Enter the project name"
        }
      },
      {
        key: "program",
        type: "input",
        templateOptions: {
          label: "Program",
          placeholder: "Enter the program name"
        }
      }
    ]
  };

  fifthFieldGroup = {
    props: { label: "Variable Under Investigation (Factor Value)" },
    fieldGroup: [
      {
        key: "factorValue",
        type: "input",
        templateOptions: {
          label: "Which is the variable under investigation (factor value)?",
          placeholder: "Enter the factor value"
          // description:
          //   'The factor values for an experiment are the values of the variables (parameters) under investigation. For example, an experiment studying the effect of different temperature (heat stress) on a cell culture would have “temperature” as an experimental variable.',
        }
      }
    ]
  };

  form = new FormGroup({});

  // This is the setup for the stepper
  fields: FormlyFieldConfig[] = [
    {
      type: "stepper",
      fieldGroup: [
        this.firstFieldGroup,
        this.secondFieldGroup,
        this.thirdFieldGroup,
        this.fourthFieldGroup,
        this.fifthFieldGroup
      ]
    }
  ];

  constructor(private dataService: MetaDataService) {}

  onSubmit(model) {
    console.log("Model:", JSON.stringify(model));
    this.dataService.updateAllMetaDataUploadJson(model);

    // Emit the event
    this.questCompleted.emit(true);
  }
}
