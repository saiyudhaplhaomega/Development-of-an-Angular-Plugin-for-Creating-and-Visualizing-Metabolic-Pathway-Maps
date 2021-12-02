import {Component, OnInit} from '@angular/core';
import {ProphaneJobStateService} from '../../services/prophane-job-state-service/prophane-job-state.service';

@Component({
  selector: 'app-job-submit',
  templateUrl: './job-submit.component.html',
  styleUrls: ['./job-submit.component.css']
})
export class JobSubmitComponent implements OnInit {

  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) { }

  getEvalue(optstr) {
    return optstr.filter(el => el.valueType === 'evalue')[0].defaultValue;
  }

  optionstringToString(optstr) {
    const s = [];
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

  ngOnInit(): void {
    console.log(this.prophaneJobState);
  }

  hasAdvancedOpts() {
    let advanced = false;
    this.prophaneJobState.currentProphaneJob.parameters.annotationTasks.forEach(
      task => {
        console.log(task.optionstring);
        if (task.optionstring.filter(i => i.isDefault === '0').length > 0) {
          advanced = true;
        }
      }
    );
    return advanced;
  }
}
