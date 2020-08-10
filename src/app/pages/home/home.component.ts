import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from 'src/app/services/establishments.service';
import { Establishment } from 'src/app/model/establishment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  establishments: Establishment[];

  constructor(
    private establishmetsService: EstablishmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.establishmetsService
      .getEstablishments()
      .subscribe((res) => (this.establishments = res));
  }

  navigate(item: Establishment): void {
    this.router.navigate(['/establishment', item.id]);
  }
}
