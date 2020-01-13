import {Component, OnInit, ViewChild} from '@angular/core';
import {FileUploaderService} from '../../../core/services/file-uploader.service';
import {MatRadioChange} from '@angular/material/radio';
import {HttpEventType} from '@angular/common/http';
import {ProphaneAnnotationTaskObject} from '../../objects/prophaneannotationtaskjson';
import {ProphaneSampleGroupObject} from '../../objects/prophanesamplegroupjson';
import {ViewEncapsulation} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';

import {ProphaneParamObject, ProphaneParamJSON} from '../../objects/prophaneparamjson';
import {ProphaneJobObject} from '../../objects/prophanejobjson';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticatedSerializableObjectUploaderService} from '../../../core/services/authenticated-serializable-object-uploader.service';
import {Router} from '@angular/router';

import {ProphaneReportStyle} from './prophane-job-submission-formdata';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prophane-job-page',
  templateUrl: './prophane-job-submission.component.html',
  styleUrls: ['./prophane-job-submission.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbTooltipConfig]
})

export class ProphaneJobSubmissionComponent implements OnInit {

  // Website related variables
  expertView = false;
  jobCard: number;
  currentProphaneJob: ProphaneJobObject;


  currentParams: ProphaneParamObject = new ProphaneParamObject();

  // TODO: better solution for this
  jobUnavailableMessage = 'No connection to server or queue full';
  // global variable that should be able to disable the website (because no server connection or server busy)
  // TODO: two variables doing the same thing?
  prophaneJobIDReady = false;
  jobUnavailable = false;
  // TODO: is this necessary? is there really a distinction between file and string here?
  fastaFile: File;
  proteinReportFile: File;
  // TODO: progress bars are currently unused, but all the code is there
  csvProgress: number;
  fastaProgress: number;

  // prophane server job related variables

  // prophane parameters related variables
  // Main options
  // TODO: job object
  //selectedLevel;

  // TODO: form options should be unified and simplified
  // +----
  // TODO: all 3 --> job object
  contval: string;
  contaminationLabel = {valueString: '', regex: ''};
  selectedContaminationOption;

  prophaneReportStyles: ProphaneReportStyle[] = [
    {id: 0, name: 'MetaProteomeAnalyzer (MPA)', valueString: 'mpa'},
    {id: 1, name: 'Scaffold', valueString: 'scaffold'},
    {id: 2, name: 'Generic Format', valueString: 'generic'},
    // {id: 3, name: 'Proteome Discoverer'}
  ];

  // TODO: form options should be unified and simplified
  contaminationdata: object[] = [
    {id: 0, name: 'accessions starting with', valueString: 'start'},
    {id: 1, name: 'accessions ending with', valueString: 'end'},
    {id: 2, name: 'accessions matching to', valueString: 'regex'},
    {id: 3, name: 'none', valueString: 'none'}
  ];

  // Advanced Options
  // TODO: check if we can get around these counters ...
  sampleCount = 0;
  groupCount = 0;
  taxtasks = 1;
  functasks = 1;
  taskCounter = 3;

  // TODO: both --> job object
  jobLabel: string;
  selectedQuant;

  // TODO: form options should be unified and simplified
  quantdata: object[] = [
    {id: 0, name: 'NSAF (normalized to longest metaprotein sequence)', valueString: 'max_nsaf'},
    {id: 1, name: 'NSAF (normalized to shortest metaprotein sequence)', valueString: 'min_nsaf'},
    {id: 2, name: 'NSAF (normalized to mean metaprotein sequence)', valueString: 'mean_nsaf'},
    {id: 3, name: 'Raw value (no normalization)', valueString: 'raw'},
  ];

  // TODO: form options should be unified and simplified
  databaseOptions: object[] = [
    {id: 0, scope: 'Function', database: 'eggnog', name: 'EggNog', algorithm: ['emapper']},
    {id: 1, scope: 'Function', database: 'pfams', name: 'PFAMs', algorithm: ['hmmsearch', 'hmmscan']},
    {id: 2, scope: 'Function', database: 'tigrfams', name: 'TIGRFAMs', algorithm: ['hmmsearch', 'hmmscan']},
    {id: 3, scope: 'Function', database: 'dbcan', name: 'CAzY/dbCAN', algorithm: ['hmmsearch', 'hmmscan']},
    {id: 4, scope: 'Function', database: 'resfams_full', name: 'ResFAMs (full)', algorithm: ['hmmsearch', 'hmmscan']},
    {id: 5, scope: 'Function', database: 'resfams_core', name: 'ResFAMs (core)', algorithm: ['hmmsearch', 'hmmscan']},
    {id: 6, scope: 'Taxonomy', database: 'ncbi_nr', name: 'NCBI protein nr', algorithm: ['diamond blastp']},
    {id: 7, scope: 'Taxonomy', database: 'uniprot_complete', name: 'UniprotKB (Swiss-Prot & TrEMBL)', algorithm: ['diamond blastp']},
    {id: 8, scope: 'Taxonomy', database: 'uniprot_sp', name: 'Swiss-Prot', algorithm: ['diamond blastp']},
    {id: 9, scope: 'Taxonomy', database: 'uniprot_tr', name: 'TrEMBL', algorithm: ['diamond blastp']},
  ];
// TODO: move into job object, new class required

  selectedOptionString = [
    {param: 'header', valueType: 'none', defaultValue: ''},
    {param: 'strand', valueType: 'enum', defaultValue: 'both', values: ['both', 'minus', 'plus']},
    {param: 'top', valueType: 'number', defaultValue: '0.0'}];

// TODO: form options should be unified and simplified
  optionStrings: object[] = [
    {dbitem: 'emapper', options: [
        {param: 'guessdb', valueType: 'none', defaultValue: ''},
        {param: 'tax_scope', valueType: 'none', defaultValue: ''},
        {param: 'target_orthologs', valueType: 'enum', defaultValue: 'one2one',
          values: ['one2one', 'many2one', 'one2many', 'many2many', 'all']},
        {param: 'go_evidence', valueType: 'enum', defaultValue: 'experimental',
          values: ['experimental', 'non-electronic']},
        {param: 'hmm_maxhits', valueType: 'int', defaultValue: '1'},
        {param: 'hmm_evalue', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0'},
        {param: 'hmm_score', valueType: 'number', defaultValue: '0.0'},
        {param: 'hmm_maxseqlen', valueType: 'int', defaultValue: '1'},
        {param: 'hmm_qcov', valueType: 'number', defaultValue: '0.0'},
        {param: 'Z', valueType: 'int', defaultValue: '1'},
        {param: ' target_orthologs', valueType: 'enum', defaultValue: 'BLOSUM62',
          values: ['BLOSUM62', 'BLOSUM90', 'BLOSUM80', 'BLOSUM50', 'BLOSUM45', 'PAM250', 'PAM70', 'PAM30']},
        {param: 'gapopen', valueType: 'number', defaultValue: '0.0'},
        {param: 'gapextend', valueType: 'number', defaultValue: '0.0'},
        {param: 'seed_ortholog_evalue', valueType: 'number', defaultValue: '0.0'},
        {param: 'seed_ortholog_score', valueType: 'number', defaultValue: '0.0'},
        {param: 'm', valueType: 'enum', defaultValue: 'diamond',
          values: ['diamond', 'hmmer']},
      ]},
    {dbitem: 'hmmscan', options: [
        // TODO: this 'evalue' seems wrong
        {param: 'E', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0'},
        {param: 'T', valueType: 'number', defaultValue: '0.0'},
        {param: 'domE', valueType: 'number', defaultValue: '0.0'},
        {param: 'domT', valueType: 'number', defaultValue: '0.0'},
        {param: 'incE', valueType: 'number', defaultValue: '0.0'},
        {param: 'incT', valueType: 'number', defaultValue: '0.0'},
        {param: 'incdomE', valueType: 'number', defaultValue: '0.0'},
        {param: 'incdomT', valueType: 'number', defaultValue: '0.0'},
        {param: 'F1', valueType: 'number', defaultValue: '0.0'},
        {param: 'F2', valueType: 'number', defaultValue: '0.0'},
        {param: 'F3', valueType: 'number', defaultValue: '0.0'},
        {param: 'nobias', valueType: 'none', defaultValue: ''},
        {param: 'nonull2', valueType: 'none', defaultValue: ''},
        {param: 'Z', valueType: 'int', defaultValue: '1'},
        {param: 'domZ', valueType: 'int', defaultValue: '1'},
        {param: 'seed', valueType: 'int', defaultValue: '1'},
        {param: 'evalue', valueType: 'evalue', defaultValue: '0.01'},
        {param: 'cut_ga', valueType: 'none', defaultValue: ''},
        {param: 'cut_nc', valueType: 'none', defaultValue: ''},
        {param: 'cut_tc', valueType: 'none', defaultValue: ''}
      ]},
    {dbitem: 'diamond blastp', options: [
        {param: 'header', valueType: 'none', defaultValue: ''},
        {param: 'strand', valueType: 'enum', defaultValue: 'both', values: ['both', 'minus', 'plus']},
        {param: 'top', valueType: 'number', defaultValue: '0.0'},
        {param: 'range-culling', valueType: 'none', defaultValue: ''},
        {param: 'min-score', valueType: 'number', defaultValue: '0.0'},
        {param: 'id', valueType: 'number', defaultValue: '0.0'},
        {param: 'sensitive', valueType: 'none', defaultValue: ''},
        {param: 'more-sensitive', valueType: 'none', defaultValue: ''},
        {param: 'block-size', valueType: 'number', defaultValue: '0.0'},
        {param: 'index-chunks', valueType: 'int', defaultValue: '1'},
        {param: 'gapopen', valueType: 'number', defaultValue: '0.0'},
        {param: 'gapextend', valueType: 'number', defaultValue: '0.0'},
        {param: 'frameshift', valueType: 'number', defaultValue: '0.0'},
        {param: 'matrix', valueType: 'string', defaultValue: ''},
        {param: 'custom-matrix', valueType: 'string', defaultValue: ''},
        {param: 'lambda', valueType: 'number', defaultValue: '0.0'},
        {param: 'K', valueType: 'number', defaultValue: '0.0'},
        {param: 'comp-based-stats', valueType: 'enum', defaultValue: '0', values: [0, 1]},
        {param: 'masking', valueType: 'enum', defaultValue: '0', values: [0, 1]},
        {param: 'taxonmap', valueType: 'string', defaultValue: ''},
        {param: 'taxonlist', valueType: 'string', defaultValue: ''},
        {param: 'algo', valueType: 'enum', defaultValue: '0', values: [0, 1]},
        {param: 'bin', valueType: 'int', defaultValue: '1'},
        {param: 'min-orf', valueType: 'none', defaultValue: ''},
        {param: 'freq-sd', valueType: 'number', defaultValue: '0.0'},
        {param: 'id2', valueType: 'number', defaultValue: '0.0'},
        {param: 'window', valueType: 'number', defaultValue: '0.0'},
        {param: 'xdrop', valueType: 'number', defaultValue: '0.0'},
        {param: 'ungapped-score', valueType: 'number', defaultValue: '0.0'},
        {param: 'hit-band', valueType: 'string', defaultValue: ''},
        {param: 'hit-score', valueType: 'number', defaultValue: '0.0'},
        {param: 'gapped-xdrop', valueType: 'number', defaultValue: '0.0'},
        {param: 'band', valueType: 'string', defaultValue: ''},
        {param: 'shapes', valueType: 'int', defaultValue: '1'},
        {param: 'shape-mask', valueType: 'int', defaultValue: '1'},
        {param: 'index-mode', valueType: 'enum', defaultValue: '0', values: [0, 1]},
        {param: 'rank-ratio', valueType: 'none', defaultValue: ''},
        {param: 'rank-ratio2', valueType: 'none', defaultValue: ''},
        {param: 'max-hsps', valueType: 'int', defaultValue: '1'},
        {param: 'range-cover', valueType: 'number', defaultValue: '0.0'},
        {param: 'dbsize', valueType: 'int', defaultValue: '1'},
        {param: 'evalue', valueType: 'evalue', defaultValue: '0.0'},
        {param: 'query-cover', valueType: 'number', defaultValue: '0.0'},
        {param: 'max-target-seqs', valueType: 'int', defaultValue: '1'},
      ]}];

  // TODO: move to job object
  sampleGroups: ProphaneSampleGroupObject[] = [];

  // TODO: form options should be unified and simplified
  annotationTasks: ProphaneAnnotationTaskObject[] =
    [
      {
        scope: 'Function', database: 'eggnog', databaseversion: 'latest', algorithm: 'emapper',
        optionstring: '-m diamond', evalue: '0.01', tasklabel: 'Functional Annotation Task 1'
      },
      {
        scope: 'Taxonomy', database: 'ncbi_nr', databaseversion: 'latest', algorithm: 'diamond blastp',
        optionstring: '--more-sensitive', evalue: '0.01', tasklabel: 'Taxonomic Annotation Task 1'
      }];

// TODO: form options should be unified and simplified
  evalueOptions: object[] = [
    {id: 0, numerical: '0.01', text: 'Relaxed'},
    {id: 1, numerical: '0.001', text: 'Mid-Range'},
    {id: 2, numerical: '0.0005', text: 'Strict'}
  ];

  // constructor and init
  constructor(private uploaderService: FileUploaderService, private jsonUpload: AuthenticatedSerializableObjectUploaderService,
              tooltipConfig: NgbTooltipConfig, private router: Router, private modalService: NgbModal) {

    this.prophaneJobIDReady = false;
    this.csvProgress = 0;
    this.fastaProgress = 0;
    this.selectedContaminationOption = this.contaminationdata[3];
    tooltipConfig.placement = 'top';
    tooltipConfig.triggers = 'hover';
  }

  //

  ngOnInit(): void {
    // TODO: more inits?
    this.currentProphaneJob = new ProphaneJobObject();
    this.currentProphaneJob.parameters = new ProphaneParamObject();
    this.currentParams = this.currentProphaneJob.parameters;
    this.jobLabel = 'Yet another Prophane job';
    this.currentProphaneJob.parameters.reportStyle = this.prophaneReportStyles[0].valueString;
    this.selectedContaminationOption = this.contaminationdata[3];
    this.selectedQuant = this.quantdata[0];
    this.requestNewJob();
  }

  // debug methods
  killAllJobs() {
    this.jsonUpload.postObj<ProphaneParamObject>(this.currentProphaneJob.parameters, 'mpacloud/v1/prophaneKillJobs').subscribe(d => {
      console.log(d);
    });
  }

  // Server job related methods

  // method is called on init, checks server connection and if server is full
  requestNewJob(): void {
    // TODO: this is cumbersome, just use one variable: the job object
    this.currentProphaneJob.parameters = new ProphaneParamObject();
    this.currentProphaneJob.parameters.jobLabel = this.jobLabel;
    this.currentProphaneJob = new ProphaneJobObject();
    this.currentProphaneJob.prophaneJobUUID = ''; // empty, the request should return a job id
    this.currentProphaneJob.status = ''; // the status is set exclusively by the server
    this.currentProphaneJob.csvFilename = '';
    this.currentProphaneJob.fastaFilename = '';
    this.currentProphaneJob.downloadURL = '';
    // request new job creates a job with status 0 now, status 1 when files are send (start job method)
    console.log('ID: ' + this.currentProphaneJob);
    this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneRequestJob').subscribe(res => {
      console.log('returned object: ' + res);
      this.currentProphaneJob = res;
      this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID === '');
      if (res.status === 'JOB_REJECTED') {
        this.jobUnavailable = true;
      } else {
        this.jobUnavailable = false;
      }
      console.log(this.prophaneJobIDReady);
      console.log(this.currentProphaneJob);
    });

  }

  // this is the submit button
  startButton(): void {
    console.log('start button pressed');
    this.openUploadDialog();
    this.uploadCSV();
    this.uploadFasta();
    this.startProphaneJob();
    // TODO: add redirect to Job Control
    this.router.navigateByUrl('/jobs');
  }

  openUploadDialog(): void {
    this.modalService.open(
      "<h2 mat-dialog-title>Please be patient while your data is being uploaded:</h2>" +
      "<div>" + this.proteinReportFile.name + ": " +
      "<mat-progress-bar *ngIf=\"csvProgress > 0\" mode=\"determinate\" [value]=\"csvProgress\"></mat-progress-bar>" +
      "</div>" +
      "<div>" + this.fastaFile.name + ": " +
      "<mat-progress-bar *ngIf=\"fastaProgress > 0\" mode=\"determinate\" [value]=\"fastaProgress\"></mat-progress-bar>" +
      "</div>",
      { centered: true, keyboard: false });
  }

  uploadFasta(): void {
    console.log('upload triggered ' + this.fastaFile);
    if (this.fastaFile) {
      this.uploaderService.postFile(this.fastaFile,
        'mpacloud/v1/prophaneFasta' + '?name=' + this.currentProphaneJob.prophaneJobUUID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fastaProgress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any;
            response = event.body;
            this.fastaProgress = 0;
            console.log('Response to upload fasta:' + response);
          }
        }
      );
    }
  }

  uploadCSV(): void {
    console.log('upload triggered ' + this.proteinReportFile);
    if (this.proteinReportFile) {
      this.uploaderService.postFile(this.proteinReportFile,
        'mpacloud/v1/prophaneCSV' + '?name=' + this.currentProphaneJob.prophaneJobUUID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.csvProgress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any;
            response = event.body;
            this.csvProgress = 0;
            console.log('Response to upload csv:' + response);
          }
        }
      );
    }
  }

  startProphaneJob(): void {
    console.log(this.currentProphaneJob);
    // TODO add minor check to integrity of parameters
    // adding form values into parameters object
    //this.currentProphaneJob.parameters.reportStyle = this.selectedLevel.valueString;
    this.currentProphaneJob.parameters.contaminationLabel = this.contaminationLabel.regex;
    this.currentProphaneJob.parameters.contaminationPosition = this.selectedContaminationOption.valueString;
    this.currentProphaneJob.parameters.jobLabel = this.jobLabel;
    this.currentProphaneJob.parameters.quantification = this.selectedQuant.valueString;
    this.sampleGroups.forEach(sampleGroup => {
      sampleGroup.groupmembersGUI.forEach(sample => {
        if (this.currentProphaneJob.parameters.reportStyle == 'scaffold') {
          sample.name = sample.biocat.trim() + '::' + sample.bioname.trim();
        }
        sampleGroup.groupmembers.push(sample.name);
      });
    });
    this.currentProphaneJob.parameters.sampleGroups = this.sampleGroups;
    this.currentProphaneJob.parameters.annotationTasks = [];
    this.annotationTasks.forEach((atask: ProphaneAnnotationTaskObject) => {
      this.currentProphaneJob.parameters.annotationTasks.push(atask);
    });
    // reassigning the parameterobject to the jobobject (unnessecary?)
    this.currentProphaneJob.parameters = this.currentProphaneJob.parameters;
    this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneStartJob').subscribe(d => {
      console.log(d);
    });
  }

  requestUserJobList(): void {
    this.jsonUpload.postObj<ProphaneJobObject[]>([], 'mpacloud/v1/prophaneJobList').subscribe(d => {
      console.log(d);
    });
  }

  // methods for website functionality

  setDefaultOptionString(event, task) {
    switch (event.value) {
      case 'hmmscan': {
        task.optionstring = '';
        break;
      }
      case 'hmmsearch' : {
        task.optionstring = '';
        break;
      }
      case 'emapper' : {
        task.optionstring = '-m diamond';
        break;
      }
      case 'diamond blastp' : {
        task.optionstring = '--more-sensitive';
        break;
      }
      default : {
        console.log('Nothingness');
      }
    }
  }

  setContaminationLabel(val) {
    if (val === false) {
      val = this.contaminationLabel.valueString;
    }
    if (this.selectedContaminationOption.valueString === 'start') {
      this.contaminationLabel = {valueString: val, regex: '^' + val};
    } else if (this.selectedContaminationOption.valueString === 'end') {
      this.contaminationLabel = {valueString: val, regex: val + '$'};
    } else if (this.selectedContaminationOption.valueString === 'regex') {
      this.contaminationLabel = {valueString: val, regex: val};
    } else if (this.selectedContaminationOption.valueString === 'none') {
      this.contaminationLabel = {valueString: '', regex: '[|]{10000}'};
    }
  }

  getNewGroupItem() {
    this.groupCount++;
    return {id: this.groupCount, groupname: 'New Group ' + this.groupCount, groupmembers: [], groupmembersGUI: [this.getNewSample()]};
  }

  addSampleGroup() {
    this.sampleGroups.push(this.getNewGroupItem());
  }

  removeSampleGroup(removeGroup) {
    this.sampleGroups = this.sampleGroups.filter(obj => obj !== removeGroup);
  }

  getNewSample() {
    this.sampleCount++;
    return {
      id: this.sampleCount,
      name: 'Sample ' + this.sampleCount,
      biocat: 'Biological sample category ' + this.sampleCount,
      bioname: 'Biological sample name ' + this.sampleCount
    };
  }

  setSampleName(groupid, sampleid) {
    this.sampleGroups.forEach(function iter(group) {
      if (group.id == groupid) {
        group.groupmembersGUI.forEach(sample => {
          if (sample.id === sampleid) {
            sample.name = sample.biocat.trim() + '::' + sample.bioname.trim();
          }
        });
      }
    });
  }

  addNewSample(group) {
    group.groupmembersGUI.push(this.getNewSample());
  }

  removeSample(id, group) {
    group.groupmembersGUI = group.groupmembersGUI.filter(obj => obj.id !== id);
  }

  filterAnnotationTasks(scope): any[] {
    return this.annotationTasks.filter(i => i.scope === scope);
  }

  addTaxTask() {
    this.taxtasks++;
    this.taskCounter++;
    this.annotationTasks.push({
      scope: 'Taxonomy', database: 'ncbi_nr', databaseversion: 'latest', algorithm: 'diamond blastp',
      optionstring: '--more-sensitive', evalue: '0.01', tasklabel: 'Taxonomic Annotation Task ' + this.taxtasks
    });
  }

  addFuncTask() {
    this.functasks++;
    this.taskCounter++;
    this.annotationTasks.push({
      scope: 'Function', database: 'eggnog', databaseversion: 'latest', algorithm: 'emapper',
      optionstring: '-m diamond', evalue: '0.01', tasklabel: 'Functional Annotation Task ' + this.functasks
    });
  }

  removeAnnotationTask(removeTask) {
    this.annotationTasks = this.annotationTasks.filter(obj => obj !== removeTask);
    this.taskCounter--;
  }

  @ViewChild('jobStepper') stepper: MatStepper;

  onViewChange(view) {
    if (view === false) {
      if (this.stepper.selectedIndex == 5) {
        this.moveStepper(1);
      } else {
        this.moveStepper(0);
      }
    } else {
      if (this.stepper.selectedIndex > 0) {
        setTimeout(() => this.moveStepper(5), 10);
      } else {
        this.moveStepper(0);
      }
    }
  }

  nextStep() {
    this.stepper.selectedIndex++;
  }

  prevStep() {
    this.stepper.selectedIndex--;
  }

  moveStepper(step: number) {
    if (this.expertView === false && step > 0) {
      step = 1;
    }
    this.stepper.selectedIndex = step;
    this.jobCard = step;
  }


  showJobCard() {
    this.jobCard = this.stepper.selectedIndex;
  }

  moveStepperToLast() {
    this.stepper.selectedIndex = 5;
  }


  onFastaChange(files: FileList) {
    this.fastaFile = files[0];
  }

  onCSVChange(files: FileList) {
    this.proteinReportFile = files[0];
    // this.currentProphaneJob.prophaneJobUUID = 'e078eef0-0788-11ea-a792-b5c08a0d06a4';
    // this.uploadCSV();
  }

  onSourceChange() {
    this.proteinReportFile = null;
  }

  addOptionString(paramName: string) {
    this.optionStrings.forEach(obj => {
      // if (obj.dbitem === 'diamond blastp') {
      //   obj.options.forEach(option => {
      //
      //   });
      // }
    });
  }

  removeOptionString() {
    // TODO: implement me
  }

}
