import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {prophaneReportStyles} from '../../objects/prophaneFormData';
import {ProphaneJobObject} from '../../objects/prophanejobjson';
import {ProphaneSampleGroupObject} from '../../objects/prophanesamplegroupjson';

@Component({
  selector: 'app-job-input',
  templateUrl: './job-input.component.html',
  styleUrls: ['./job-input.component.css']
})
export class JobInputComponent implements OnInit {

  @Input() prophaneJob: ProphaneJobObject;
  @Output() sourceChangeEvent = new EventEmitter<void>();

  readonly reportStyles = prophaneReportStyles;

  constructor() { }

  ngOnInit() {
    console.log(this.prophaneJob.parameters.reportStyle.valueString);
  }

  // methods for website functionality
  compareByID(o1, o2) {
    return parseInt(o1.id) === parseInt(o2.id);
  }

}
