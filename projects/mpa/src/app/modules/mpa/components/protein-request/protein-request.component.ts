import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MpaTableDataService, PGRequestStatus } from '../../services/mpa-table-data.service';

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
export class ProteinRequestComponent implements OnInit{
  
  @Input() currentTargetFDR: string;
  @Output() updateTargetFdr = new EventEmitter<string>();
  targetFdr: number = 0.01;
  protReqStatus: PGRequestStatus;

  constructor(
    private mpaDataService: MpaTableDataService,
  ) {}

  ngOnInit(): void {
   this.mpaDataService.proteinGroupRequestStatus.subscribe((status) => {
    this.protReqStatus = status;
   })
   this.targetFdr = parseFloat(this.currentTargetFDR);
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
          adjustedInput = parseFloat(value.toPrecision(2))
        }
        this.targetFdr = adjustedInput;
        break;
      }
    }
  }

  submit() {
    this.updateTargetFdr.emit(this.targetFdr.toString());
    this.mpaDataService.requestProteinGroups(this.targetFdr.toString()).subscribe(() => {
      this.mpaDataService.proteinGroupRequestStatus.next(PGRequestStatus.FULFILLED)
    });
  }
}