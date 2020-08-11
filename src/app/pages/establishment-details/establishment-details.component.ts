import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from 'src/app/services/establishments.service';
import { Establishment } from 'src/app/model/establishment';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldType } from '../../model/field-type.enum';
import { Subject } from 'rxjs';
import { Patterns } from 'src/app/utils/patterns';
import { Location } from '@angular/common';

@Component({
  selector: 'app-establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.scss'],
})
export class EstablishmentDetailsComponent implements OnInit {
  readonly NUMBER = FieldType.NUMBER;

  establishment: Establishment;
  establishmentForm: FormGroup;

  cpfCnpjMask: Subject<string> = new Subject();

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
    private fb: FormBuilder,
    private location: Location,
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

    this.establishmentForm.get('cpf_cnpj').valueChanges.subscribe((value) => {
      this.onChangeCpfCnpj(value);
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

  onChangeCpfCnpj(value: string) {
    value = value.replace(Patterns.DIGITS, '');
    if (value.length <= 11) {
      this.cpfCnpjMask.next('000.000.000-000');
    } else {
      this.cpfCnpjMask.next('00.000.000/0000-00');
    }
  }

  goBack() {
    this.location.back();
  }
}
