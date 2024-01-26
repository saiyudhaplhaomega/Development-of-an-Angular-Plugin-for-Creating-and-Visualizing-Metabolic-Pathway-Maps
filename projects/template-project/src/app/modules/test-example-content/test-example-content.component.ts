import { Component, OnInit } from '@angular/core';
import { AuthService, UserToken } from 'shared-lib';

@Component({
  selector: 'app-test-example-content',
  templateUrl: './test-example-content.component.html',
  styleUrls: ['./test-example-content.component.scss']
})
export class TestExampleContentComponent implements OnInit {

  user: string = "Unknown";

  constructor(private auth: AuthService) {
  }


  ngOnInit(): void {
    console.log("Init Content Page");
    this.auth._guestemail.subscribe((email: string) => {
        console.log("new User!");
        this.user = email;
    });
  }

}
