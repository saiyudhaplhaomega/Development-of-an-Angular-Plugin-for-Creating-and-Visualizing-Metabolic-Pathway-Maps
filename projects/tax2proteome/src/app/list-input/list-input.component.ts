import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NamesService} from '../names.service';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.css']
})
export class ListInputComponent implements OnInit {

  @ViewChild('bindingInput') bindingInput: ElementRef;

  constructor(
      private namesService: NamesService,
  ) { }

  ngOnInit(): void { }

  getTaxIDValue(): any {
    const splitted = this.bindingInput.nativeElement.value.split(/\s*[,;]\s*|\s/).map(Number).filter(Boolean);
    this.namesService.getNames(splitted).catch((err) => console.log('error: ', err));
  }
}
