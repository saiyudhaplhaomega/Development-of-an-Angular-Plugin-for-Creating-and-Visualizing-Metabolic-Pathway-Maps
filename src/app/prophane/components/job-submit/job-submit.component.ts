import { Component } from '@angular/core';
import {ProphaneJobStateService} from '../prophane-job-submission-main/prophane-job-state-service/prophane-job-state.service';

@Component({
  selector: 'app-job-submit',
  templateUrl: './job-submit.component.html',
  styleUrls: ['./job-submit.component.css']
})
export class JobSubmitComponent {

  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) { }

  getEvalue(optstr) {
    return optstr.filter(el => el.valueType === 'evalue')[0].defaultValue;
  }

  optionstringToString(optstr) {
    let s = [];
    let i;
    if (optstr.length === 1) {
      return '-';
    }
    for (i = 0; i < optstr.length; i++) {
      if (optstr[i].valueType === 'none') {
        s.push(optstr[i].param);
      } else if (optstr[i].param !== 'evalue') {
        s.push(optstr[i].param + '=' + optstr[i].defaultValue);
      }
    }
    return s.sort().join('; ');
  }

}
