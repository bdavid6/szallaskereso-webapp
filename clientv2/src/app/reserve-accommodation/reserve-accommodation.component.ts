import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AccommodationService } from '../core/services/accommodation.service';
import { DatePipe } from '@angular/common'
import { ReservationService } from '../core/services/reservation.service';
import { NotificationService } from '../core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-reserve-accommodation',
  templateUrl: './reserve-accommodation.component.html',
  styleUrls: ['./reserve-accommodation.component.scss']
})
export class ReserveAccommodationComponent implements OnInit {
  myDate = new Date(new Date().setMonth(new Date().getMonth()))

  accommodation?: Accommodation;

  accommodationId!: number;

  reserveForm: FormGroup = this.fb.group({
    start_date: [localStorage.getItem('date1'), Validators.required],
    end_date: [localStorage.getItem('date'), Validators.required],
    adults: [1, Validators.required],
    children: [0, Validators.required],
  });

  get start_date(): AbstractControl {
    return this.reserveForm.get('start_date') as AbstractControl;
  }

  get end_date(): AbstractControl {
    return this.reserveForm.get('end_date') as AbstractControl;
  }

  get adults(): AbstractControl {
    return this.reserveForm.get('adults') as AbstractControl;
  }

  get children(): AbstractControl {
    return this.reserveForm.get('children') as AbstractControl;
  }

  constructor(
    private as: AccommodationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private rs: ReservationService,
    private ns: NotificationService,
    private router: Router,
    private dialog: MatDialog,
    public ahs: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accommodationId = parseInt(params.get('accommodationId')!);
      this.fetchData();
    });
  }

  fetchData(): void {
    this.as.getAccommodationById(this.accommodationId).subscribe(
      (response) => {
        this.accommodation = response;
      },
      (error) => {
        console.log(error);
      });
  }

  reserveButton(formDirective: FormGroupDirective): void {
    let transformedStartDate = this.datepipe.transform(this.reserveForm.controls['start_date'].value, 'yyyy-MM-dd');
    this.reserveForm.controls['start_date'].setValue(transformedStartDate);
    let transformedEndDate = this.datepipe.transform(this.reserveForm.controls['end_date'].value, 'yyyy-MM-dd');
    this.reserveForm.controls['end_date'].setValue(transformedEndDate);

    //send
    this.reserveForm.markAllAsTouched();
    if (this.reserveForm.valid) {

      const dialogRef = this.dialog.open(PaymentComponent, {
        height: '380px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'true') {

          this.rs.reserveAccommodation(this.reserveForm.value, this.accommodation!.id).subscribe(
            (response) => { },
            (status: any) => {
              if (status.status == 405) {
                console.log(status.status);
                this.ns.showNotification("error", "Ez a te szállásod", 1800);
              }
              if (status.status == 200) {
                console.log(status.status);
                this.ns.showNotification("success", "Sikeres foglalás", 1200);
                this.router.navigate(['reserved-accommodations']);
              }
              if (status.status == 409) {
                console.log(status.status);
                this.ns.showNotification("error", "Már foglalát időpontot", 1800);
                this.router.navigate(['reserved-accommodations']);
              }
            });
        }
        //reset
        formDirective.resetForm();
        this.reserveForm.reset({
          'adults': 1,
          'children': 0,
          'start_date': '',
          'end_date': '',
        });
      });
    } else {
      return;
    }
  }

  message() {
    this.ns.showNotification("error", "Adminoknak nem elérhető", 1000);
  }

  backButton() {
    this.router.navigate(['search'],
      {
        queryParams: {
          filter: localStorage.getItem('filter'), page: localStorage.getItem('page'), date: localStorage.getItem('date'),
          services: JSON.parse(localStorage.getItem("services")!)
        }
      })
    localStorage.clear();
  }
}
