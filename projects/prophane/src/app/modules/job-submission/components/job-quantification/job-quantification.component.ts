import { Component} from '@angular/core';
import {ProphaneJobStateService} from '../../../../services/prophane-job-state.service';

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
