import {Component, OnInit, ViewChild} from '@angular/core';
import {UserInputService} from '../user-input.service';
import {PowerInputComponent} from '../power-input/power-input.component';
import {TaxData} from '../user-input.service';
import {ConfigService} from '../config.service';
// import { Router } from '@angular/router';
import {NavBarComponent} from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-create-menubar',
  templateUrl: './create-menubar.component.html',
  styleUrls: ['./create-menubar.component.css']
})

export class CreateMenubarComponent implements OnInit {
  activeButton: string;
  buttonClicked = null;
  iconClicked = null;
  taxon: TaxData;
  @ViewChild(PowerInputComponent) powerInput;

  constructor(
      public UserInService: UserInputService,
      private configService: ConfigService,
      private navBar: NavBarComponent,
      // private router: Router,
  ) { }

  ngOnInit(): void {
    this.activeButton = 'power_input';
    this.highlight('0');
  }
  // button highlight
  highlight(id){
    if (this.buttonClicked != null)
      {
        this.buttonClicked.style.background = 'white';
        this.iconClicked.style.color = '#9E9E9E';
      }
    this.buttonClicked  = document.getElementById(id);
    this.iconClicked = document.getElementById(id + '1');
    this.buttonClicked.style.background =  '#106cc8';
    this.iconClicked.style.color =  'white';
    }

// receive power-input event
  receiveTaxEntry($event) {
    this.taxon = $event;
    this.taxon.name = this.taxon.name.replace(/ *\(taxid:[^)]*\)*/g, '');
    this.UserInService.addTaxa(this.taxon);
  }

  // get all user input data from UserInputService
  sendGetRequest(){
    this.navBar.selectedTab = 1;
    // this.router.navigate(['/result']);
    this.configService.generateConfig().catch((err) => console.log('error: ', err));
  }
}
