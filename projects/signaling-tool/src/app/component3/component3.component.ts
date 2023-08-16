import {Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Select with no option ripple */
@Component({
  selector: 'Component3Component',
  templateUrl: 'component3.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
}) 
export class Component3Component {
  selectedOption: number;
}