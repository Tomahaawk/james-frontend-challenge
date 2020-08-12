import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'james-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @HostBinding('class.james-button__green') isPrimary: boolean;
  @HostBinding('class.james-button__default') isDefault: boolean;

  @Input() disabled: boolean = false;
  @Input() text: string;
  @Input() type: ButtonTypes;
  @Input() set class(value: ButtonClass) {
    if (value === 'primary') {
      this.isPrimary = true;
    } else {
      this.isDefault = true;
    }
  }
  @Output() click: EventEmitter<Event> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(event: Event) {
    if (!this.disabled) {
      this.click.emit(event);
    }
  }
}

type ButtonTypes = 'submit' | 'button';
type ButtonClass = 'primary' | 'default';
