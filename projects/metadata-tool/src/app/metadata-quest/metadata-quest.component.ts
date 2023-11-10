// metadata-quest.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-metadata-quest',
  templateUrl: './metadata-quest.component.html',
  styleUrls: ['./metadata-quest.component.scss'],
})
export class MetadataQuestComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Define your form structure here
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // Handle form submission
    }
  }
}
