import {Component, OnInit} from '@angular/core';
import {prophaneReportStyleLabels, prophaneReportStyles} from '../../objects/prophaneFormData';
import {ProphaneSampleGroupObject} from '../../objects/prophanesamplegroupjson';
import {ProphaneJobStateService} from '../prophane-job-submission-main/prophane-job-state-service/prophane-job-state.service';
import {ProphaneReportStyle} from '../prophane-job-submission-main/prophane-job-submission-formdata';
import {FileInputComponent} from '../../../core/components/file-input/file-input.component';

@Component({
  selector: 'app-job-input',
  templateUrl: './job-input.component.html',
  styleUrls: ['./job-input.component.css']
})
export class JobInputComponent implements OnInit {

  readonly reportStyles = prophaneReportStyles;
  readonly reportOptions = prophaneReportStyleLabels;

  constructor(
    public prophaneJobState: ProphaneJobStateService) { }

  ngOnInit() {
    console.log(this.prophaneJobState.currentProphaneJob.parameters.reportStyle.valueString);
  }

  // methods for website functionality
  compareByID(o1: ProphaneReportStyle, o2: ProphaneReportStyle) {
    return o1.id === o2.id;
  }

  onSourceChange() {
    this.prophaneJobState.proteinReportFile = undefined;
    // reset Sample groups
    this.prophaneJobState.currentProphaneJob.parameters.sampleGroups = [] as ProphaneSampleGroupObject[];
    this.prophaneJobState.sampleCount = 0;
    this.prophaneJobState.groupCount = 0;
  }

  onFastaChange(files: FileList) {
    this.prophaneJobState.fastaFile = files[0];
  }

  onCSVChange(files: FileList) {
    this.prophaneJobState.proteinReportFile = files[0];
  }

  escapeRegExp(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  setContaminationLabel(val) {
    console.log(val);
    if (val === false) {
      val = this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.valueString;
    }
    if (this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.valueString === 'start') {
      this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.label = val;
      this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.regex = '^' + this.escapeRegExp(val);
    } else if (this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.valueString === 'end') {
      this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.label = val;
      this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.regex = this.escapeRegExp(val) + '$';
    } else if (this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.valueString === 'regex') {
      this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.label = val;
      this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.regex = val;
    } else if (this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.valueString === 'none') {
      this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.label = '';
      this.prophaneJobState.currentProphaneJob.parameters.contaminationOption.regex = '';
    }
  }
}
