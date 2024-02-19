import {Component} from '@angular/core';
import {ProphaneJobStateService} from '../../../../services/prophane-job-state.service';

@Component({
  selector: 'app-job-submit',
  templateUrl: './job-submit.component.html',
  styleUrls: ['./job-submit.component.scss']
})
export class JobSubmitComponent {

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

  hasAdvancedOpts() {
    let advanced = false;
    this.prophaneJobState.currentProphaneJob.parameters.annotationTasks.forEach(
      task => {
        if (task.optionstring.filter(i => i.isDefault === '0').length > 0) {
          advanced = true;
        }
      }
    );
    return advanced;
  }

  get_lca_threshold(lcaTask) {
    return lcaTask.optionstring.filter(i => i.param == 'threshold')[0].defaultValue
  }
  get_advanced_lca_options(lcaTask) {
    console.log(lcaTask.optionstring.filter(i => i.param != 'threshold'))
    return lcaTask.optionstring.filter(i => i.param != 'threshold')
  }
  isCustomMapWithoutFile(customMaps){
    return customMaps.filter(cm =>cm.optionstring.param == 'path').optionstring.defaultValue.length >0
  }
}

