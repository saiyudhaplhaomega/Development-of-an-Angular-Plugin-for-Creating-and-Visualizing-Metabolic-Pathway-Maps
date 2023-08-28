import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {JobLabel} from '../components/prophane-job-submission-main/prophane-job-submission-main.component';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-job-stepper',
  templateUrl: './job-stepper.component.html',
  styleUrls: ['./job-stepper.component.css']
})
export class JobStepperComponent implements OnInit, OnDestroy {

  @Input() expertView: boolean;
  @Input() jobLabelData: JobLabel[];
  @Input() resetStepper: Observable<void>;
  @Output() currentStepLabel = new EventEmitter<string>();

  // fetches DOM element MatStepper
  @ViewChild('jobStepper') stepper: MatStepper;

  private resetStepperSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.resetStepperSubscription = this.resetStepper.subscribe(
      () => this.stepper.selectedIndex = 0);
  }

  ngOnDestroy() {
    this.resetStepperSubscription.unsubscribe();
  }

  onStepSelection() {
    this.currentStepLabel.emit(this.stepper.selected.label);
  }

  nextStep() {
    this.stepper.selectedIndex = this.stepper.selectedIndex + 1;
  }

  prevStep() {
    this.stepper.selectedIndex = this.stepper.selectedIndex - 1;
  }

}
