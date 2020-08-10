import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Establishment } from 'src/app/model/establishment';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.scss'],
})
export class EstablishmentCardComponent implements OnInit {
  @Input() establishment: Establishment;
  @Output() select = new EventEmitter<Establishment>();

  constructor() {}

  ngOnInit(): void {}

  handleItemClick() {
    this.select.emit(this.establishment);
  }
}
