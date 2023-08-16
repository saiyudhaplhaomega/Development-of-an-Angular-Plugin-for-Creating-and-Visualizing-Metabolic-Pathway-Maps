import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ProteinGroupJSON,
  ProteinGroupObject,
  PsmObject,
} from '../../objects/tableobjects';
import {
  GroupSelection,
  MpaTableDataService,
} from '../../services/mpa-table-data.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-mpa-table',
  templateUrl: './mpa-table.component.html',
  styleUrls: ['./mpa-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ visibility: 'hidden'})),
      state('expanded', style({ height: '*' })),
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
  ],
})
export class MpaTableComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'expandButton',
    'proteinGroupID',
    'groupType',
    'quantification',
    'representativeAccession',
    'representativeDescription',
    'checkbox'
  ];
  dataSource: MatTableDataSource<ProteinGroupObject>;
  showDetails: boolean = false;
  selectedAll: boolean = false;

  expandedElement: string = 'none';
  GroupSelection = GroupSelection;                 // make enum available to use in html

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() experimentUUID: string;

  constructor(public mpaTableDataService: MpaTableDataService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.mpaTableDataService.mpaTableData.subscribe((mpaTableData) => {
      //TODO sort IDs -> integer sort, then pass to dataSource.data
      this.dataSource.data = mpaTableData;
    });

    this.mpaTableDataService.selectedProteinGroup.subscribe((proteinGroup) => {
      if (typeof proteinGroup !== 'undefined') {
        this.showDetails = true;
      }
    });
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    applyFilter(event: EventTarget): void {
      // TODO: figure out how to do this with or without the event
      // event.target.value;
      // filterValue = filterValue.trim(); // Remove whitespace
      // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      // this.dataSource.filter = filterValue;
    }

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  //
  // toggleRow(row) {
  //   this.selection.toggle(row);
  // }

  onExpand(row: ProteinGroupObject): void {
    if (this.expandedElement === row.proteinGroupID) {
      this.expandedElement = 'none';
    }else{
      this.expandedElement = row.proteinGroupID;
    }
  }

  onClick(row: ProteinGroupObject): void {
    this.mpaTableDataService.resetCompleteSelection();
    this.mpaTableDataService.selectedProteinGroup.next(row);
    console.log(row)
  }

  onGroupSelection(): void {
    this.selectedAll = false;
    this.mpaTableDataService.onGroupSelection();
    this.onSelectAllGroups();
  }

  getRowtype(row: ProteinGroupObject) {
    return 'parentProteinGroupID' in row ? 'subgroup' : 'maingroup';
  }

  getQuantification(row: ProteinGroupObject) {
    let spectrumIDs = Array.from(new Set(row.psmList.map(psm => psm.spectrumID)))
    return spectrumIDs.length;
  }

  downloadProteinTable(): void {
    this.mpaTableDataService.downloadProteinTableData()
  }

  downloadProteinGroupDetails(): void {
    //TODO wait for decision on batching and simplification of getProteinGroups()
  }

  downloadSelectedGroups(): void {
    //TODO wait for decision on batching and simplification of getProteinGroups()
  }

  onSelectAllGroups(): void {
    this.dataSource.data.map(group => {
      group.isSelected = this.selectedAll;
      if(this.mpaTableDataService.groupSelection == GroupSelection.HIERARCHICAL) {
        group.proteinSubGroupList.map(subgroup => {
          subgroup.isSelected = this.selectedAll;
        })
      }
    })
  }

  //makes sure to select all subgroups, if a maingroup is selected in hierarchical view
  onSelectGroup(row: ProteinGroupObject): void {
    if (this.mpaTableDataService.groupSelection == GroupSelection.HIERARCHICAL) {
      row.proteinSubGroupList.map(subgroup => {
        subgroup.isSelected = row.isSelected;
      })
    }
  }

  selectionTests(): void {
    this.dataSource.data.map(group => {
      if(group.isSelected){
        this.mpaTableDataService.groupSelection == GroupSelection.SUBGROUPS ? console.log(group.proteinGroupID) : console.log(group.proteinGroupID)
      }
      if(this.mpaTableDataService.groupSelection == GroupSelection.HIERARCHICAL) {
        group.proteinSubGroupList.map(subgroup => {
          subgroup.isSelected == true ? console.log(subgroup.proteinGroupID) : '';
        })
      }
    })
  }

  hideSelectedGroups(): void {
    const elements = document.getElementsByClassName('checkbox-selected');
    for (let i = 0; i<elements.length; i++) {
      let element = elements[i] as HTMLElement;
      element.style.opacity = "0";
    }
    // actually remove selected rows from view after animation has finished
    elements.length > 0 ? setTimeout(()=>{this.mpaTableDataService.onHideSelectedGroups()},1000) : {};
    }

  resetHiddenGroups(): void {
    this.mpaTableDataService.onResetHiddenGroups();
  }
}
