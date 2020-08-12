import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { EstablishmentsService } from 'src/app/services/establishments.service';
import { Establishment } from 'src/app/model/establishment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldType } from '../../model/field-type.enum';
import { Subject } from 'rxjs';
import { Patterns } from 'src/app/utils/patterns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstablishmentDetailsComponent implements OnInit {
  readonly NUMBER = FieldType.NUMBER;

  establishment: Establishment;
  establishmentForm: FormGroup;

  cpfCnpjMask: Subject<string> = new Subject();

  withdrawOptions: { name: string; value: boolean }[] = [
    { name: 'Não', value: false },
    { name: 'Sim', value: true },
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
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.getEstablishmentData(id);
      }
    });
  }

  initForm() {
    this.establishmentForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: [''],
      bank: [''],
      account_type: [''],
      cpf_cnpj: [''],
      agency: [''],
      agency_digit: [''],
      account_number: [''],
      account_number_digit: [''],
      automated_withdraw: [
        { name: 'Não', value: false },
        [Validators.required],
      ],
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
    console.log(this.establishmentForm);
    Swal.fire({
      icon: 'question',
      title: 'Deseja salvar as alterações?',
      showCancelButton: true,
      cancelButtonText: 'Fechar',
      confirmButtonText: 'Confirmar',
    }).then((action) => {
      if (action.value) {
        const updatedValues = { ...this.establishment, ...values };
        this.establishmetsService
          .saveEstablishmentData(updatedValues)
          .then((key) => {
            Swal.fire({
              icon: 'success',
              title: 'Alterações salvas!',
            });
          });
      }
    });
  }

  onChangeCpfCnpj(value: string) {
    value = value.replace(Patterns.DIGITS, '');
    if (value.length < 12) {
      this.cpfCnpjMask.next('000.000.000-00');
    } else {
      this.cpfCnpjMask.next('00.000.000/0000-00');
    }
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
