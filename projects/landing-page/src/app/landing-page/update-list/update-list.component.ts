import { Component, Input } from '@angular/core';

@Component({
  selector: 'update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss'],
})
export class UpdateListComponent {
  @Input() updates: any[];

  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  ngOnInit() {
    console.log(this.updates);
  }
}
