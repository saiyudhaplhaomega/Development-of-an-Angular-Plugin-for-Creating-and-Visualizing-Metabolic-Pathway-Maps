import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

type experimentType = 'metaprotemic' | 'proteomic'; // Assuming Vals is defined like this

@Component({
  selector: 'app-metadata-quest',
  templateUrl: './metadata-quest.component.html',
  styleUrls: ['./metadata-quest.component.scss'],
})
export class MetadataQuestComponent implements OnInit {
  form: FormGroup;

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: this.fb.control<experimentType>('proteomic'), // Default value 'a'
      selectMetaproteome: [
        null,
        this.validateIf('type', 'a', [Validators.required]),
      ],
      helloB: [null, this.validateIf('type', 'b', [Validators.required])],
      helloAnotherB: [
        null,
        this.validateIf('type', 'b', [
          Validators.required,
          Validators.minLength(4),
        ]),
      ],
    });
  }

  validateIf(fieldName: string, fieldValue: experimentType, validators: any[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const field = control.root.get(fieldName);

      if (field && field.value === fieldValue) {
        for (let validator of validators) {
          const result = validator(control);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // Handle form submission
    }
  }
}
