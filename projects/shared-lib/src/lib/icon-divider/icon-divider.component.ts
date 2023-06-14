import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-icon-divider',
  templateUrl: './icon-divider.component.html',
  styleUrls: ['./icon-divider.component.scss'],
})
export class IconDividerComponent implements OnInit {
  constructor() {}

  @Input() showIcon: boolean = true;

  ngOnInit(): void {}
}
