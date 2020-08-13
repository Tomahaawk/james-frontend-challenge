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
import { FieldType } from '../../enums/field-type.enum';
import { Subject } from 'rxjs';
import { Patterns } from 'src/app/utils/patterns';
import { Utils } from '../../utils/utils';
import { cpfCnpjValidator } from '../../validators/validators';
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

  cpfCnpjErrors = [
    { key: 'invalid-cpf', value: 'CPF inválido' },
    { key: 'invalid-cnpj', value: 'CNPJ inválido' },
  ];

  emailErrors = [{ key: 'pattern', value: 'Email inválido' }];

  constructor(
    private establishmetsService: EstablishmentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.getEstablishmentData(id);
      }
    });
  }

  initForm(): void {
    this.establishmentForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.pattern(Patterns.EMAIL)]],
      bank: [''],
      account_type: [''],
      cpf_cnpj: ['', [cpfCnpjValidator(), Validators.minLength(11)]],
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

  saveData(values): void {
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

  onChangeCpfCnpj(value: string): void {
    value = value.replace(Patterns.DIGITS, '');
    if (value.length <= 11) {
      this.cpfCnpjMask.next('000.000.000-000');
    } else {
      this.cpfCnpjMask.next('00.000.000/0000-00');
    }
  }

  handleFileChange(files: FileList) {
    const file = files[0];
    console.log(file.size);
    if (file.size < 5000000) {
      // ~5MB
      Utils.toBase64(file).then((base64) => {
        const updatedValues = { ...this.establishment, picture: base64 };
        this.establishmetsService
          .saveEstablishmentData(updatedValues)
          .then((key) => {
            this.getEstablishmentData(key);
          });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Arquivo muito grande!',
        text: 'Somente arquivos menores do que 5MB são aceitos.',
      });
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/home');
  }
}
