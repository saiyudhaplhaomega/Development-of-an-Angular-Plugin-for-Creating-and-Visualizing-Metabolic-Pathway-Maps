import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  OnInit
} from "@angular/core";

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-pipeline-selection",
  templateUrl: "./pipeline-selection.component.html",
  styleUrls: ["../metadata-uploadpage.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionComponent),
      multi: true
    }
  ]
})
export class SelectionComponent implements ControlValueAccessor {
  @Input() entries: Pipeline[];
  @Input() label: string;
  @Output() selectedPipelineChange = new EventEmitter<Pipeline>();

  selectedPipeline: Pipeline;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this.selectedPipeline = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(newValue: Pipeline): void {
    this.selectedPipeline = newValue;
    this.onChange(newValue);
    this.selectedPipelineChange.emit(newValue);
  }
}
