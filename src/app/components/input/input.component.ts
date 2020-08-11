import { Component, Self, forwardRef, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NgControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FieldType } from '../../model/field-type.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() set type(value: FieldType) {
    this._type = value || FieldType.TEXT;
  }
  @Input() set mask(value: string | Subject<string>) {
    if(typeof(value) !== 'string') {
      this.async = true;
    }
    this._mask = value;
  }

  async: boolean = false;
  _type: FieldType;
  _mask: string | Subject<string>;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {}

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
