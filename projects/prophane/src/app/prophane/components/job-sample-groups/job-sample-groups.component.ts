import { Component, OnInit } from '@angular/core';
import {ProphaneJobStateService} from '../../services/prophane-job-state-service/prophane-job-state.service';
import {ProphaneSampleGroupObject} from '../../objects/prophanesamplegroupjson';

@Component({
  selector: 'app-job-sample-groups',
  templateUrl: './job-sample-groups.component.html',
  styleUrls: ['./job-sample-groups.component.css']
})
export class JobSampleGroupsComponent implements OnInit {

  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) { }

  getNewSample() {
    this.prophaneJobState.sampleCount++;
    return {
      id: this.prophaneJobState.sampleCount,
      name: 'Sample ' + this.prophaneJobState.sampleCount,
      biocat: 'Biological sample category ' + this.prophaneJobState.sampleCount,
      bioname: 'Biological sample name ' + this.prophaneJobState.sampleCount
    };
  }

  getNewGroupItem() {
    this.prophaneJobState.groupCount++;
    return {
      id: this.prophaneJobState.groupCount,
      groupname: 'New Group ' + this.prophaneJobState.groupCount,
      groupmembers: [],
      groupmembersGUI: [this.getNewSample()]};
  }

  addSampleGroup() {
    this.prophaneJobState.currentProphaneJob.parameters.sampleGroups.push(this.getNewGroupItem());
  }

  removeSampleGroup(removeGroup: ProphaneSampleGroupObject) {
    this.prophaneJobState.currentProphaneJob.parameters.sampleGroups =
      this.prophaneJobState.currentProphaneJob.parameters.sampleGroups.filter(obj => obj !== removeGroup);
  }

  showScaffoldSampleInput(groupId?: number, sampleId?: number) {
    if (this.prophaneJobState.currentProphaneJob.parameters.reportStyle &&
      this.prophaneJobState.currentProphaneJob.parameters.reportStyle.id === 2) {
      if (groupId && sampleId) {
        console.log('groupId: ' + groupId);
        console.log('sampleId: ' + sampleId);
        this.setSampleName(groupId, sampleId);
      }
      return true;
    } else {
      return false;
    }
  }

  setSampleName(groupId: number, sampleId: number) {
    this.prophaneJobState.currentProphaneJob.parameters.sampleGroups.forEach(
      (group) => {
        if (group.id === groupId) {
          group.groupmembersGUI.forEach(sample => {
            if (sample.id === sampleId) {
              sample.name = sample.biocat.trim() + '::' + sample.bioname.trim();
            }
          });
        }
    });
  }

  addNewSample(group: ProphaneSampleGroupObject) {
    group.groupmembersGUI.push(this.getNewSample());
  }

  removeSample(id: number, group: ProphaneSampleGroupObject) {
    group.groupmembersGUI = group.groupmembersGUI.filter(obj => obj.id !== id);
  }

  ngOnInit(): void {
    console.log(this.prophaneJobState);
  }

}
