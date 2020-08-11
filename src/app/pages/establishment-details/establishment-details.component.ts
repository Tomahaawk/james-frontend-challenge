import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from 'src/app/services/establishments.service';
import { Establishment } from 'src/app/model/establishment';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldType } from '../../model/field-type.enum';

@Component({
  selector: 'app-establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.scss'],
})
export class EstablishmentDetailsComponent implements OnInit {
  establishment: Establishment;
  establishmentForm: FormGroup;

  readonly NUMBER = FieldType.NUMBER;

  withdrawOptions: { name: string; value: boolean }[] = [
    { name: 'Sim', value: true },
    { name: 'Não', value: false },
  ];

  selectStyleGuide = {
    caretClass: 'caret',
    selectBoxClass: 'dropdown-wrapper',
    selectMenuClass: 'dropdown',
    optionsClass: 'option',
  };

  constructor(
    private establishmetsService: EstablishmentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.getEstablishmentData(id);
      }
    });
    this.initForm();
  }

  initForm() {
    this.establishmentForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      bank: [''],
      account_type: [''],
      cpf_cnpj: [''],
      agency: [''],
      agency_digit: [''],
      account_number: [''],
      account_number_digit: [''],
      automated_withdraw: [false],
    });
  }

  getEstablishmentData(id): void {
    this.establishmetsService.getEstablishmentById(id).then((res) => {
      this.establishment = res;
      this.establishmentForm.patchValue(this.establishment);
    });
  }

  saveData(values) {
    const updatedValues = { ...this.establishment, ...values };
    this.establishmetsService
      .saveEstablishmentData(updatedValues)
      .then((key) => {
        console.log(key);
      });
  }
}
