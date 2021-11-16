import { Component} from '@angular/core';
import {ProphaneJobStateService} from '../prophane-job-submission-main/prophane-job-state-service/prophane-job-state.service';

@Component({
  selector: 'app-job-quantification',
  templateUrl: './job-quantification.component.html',
  styleUrls: ['./job-quantification.component.css']
})
export class JobQuantificationComponent {

  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) { }

}
