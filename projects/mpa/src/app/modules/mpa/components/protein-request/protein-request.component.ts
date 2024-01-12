import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Output} from '@angular/core';
import { MpaTableDataService } from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-protein-request',
  templateUrl: './protein-request.component.html',
  styleUrls: ['./protein-request.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ visibility: 'hidden', height: 0, opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ]
})
export class ProteinRequestComponent{

  @Output("calculateExperimentStats") calculateExperimentStats: EventEmitter<any> = new EventEmitter();
  
  expanded: boolean = false;
  targetFdr: number = 0.01;

  constructor(
    private mpaDataService: MpaTableDataService 
  ) {}

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  checkInput(value: number, target:string) {
    var adjustedInput: number;
    switch (target) {
      case 'targetFdr': {
        if (value < 0) {
          adjustedInput = 0;
        } else if (value > 1) {
          adjustedInput = 1;
        } else if (value == undefined) {
          adjustedInput = 0.01;
        } else {
          adjustedInput = parseFloat(value.toPrecision(4))
        }
        this.targetFdr = adjustedInput;
        break;
      }
    }
  }

  submit() {
    this.mpaDataService.requestProteinGroups(this.targetFdr).subscribe(() => {
      this.calculateExperimentStats.emit();
    });
  }

}
