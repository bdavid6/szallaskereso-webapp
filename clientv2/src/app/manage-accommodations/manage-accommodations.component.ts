import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Accommodation } from '../core/interfaces/accommodation';
import { Reservation } from '../core/interfaces/reservation';
import { AccommodationService } from '../core/services/accommodation.service';
import { NotificationService } from '../core/services/notification.service';
import { ReservationService } from '../core/services/reservation.service';

@Component({
  selector: 'app-manage-accommodations',
  templateUrl: './manage-accommodations.component.html',
  styleUrls: ['./manage-accommodations.component.scss']
})
export class ManageAccommodationsComponent implements OnInit {

  accommodations!: Accommodation[];

  reservations!: Reservation[];

  statusControl = new FormControl('', Validators.required);

  constructor(
    private as: AccommodationService,
    private rs: ReservationService,
    private ns: NotificationService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.as.getCreatedAccommodations().subscribe(
      (response) => {
        this.accommodations = response;
      },
      (error) => {
        console.log(error);
      });
  }

  deleteButton(reservationId: number): void {
    this.rs.deleteReservationById(reservationId).subscribe(
      (response) => {
      },
      (error) => {
        console.log(error);
      });
    setTimeout(() => {
      this.fetchData();
    }, 500);
  }

  changeStatus(accommodationId: number): void {
    this.statusControl.markAllAsTouched();
    if (this.statusControl.valid) {
      this.as.changeAccommodationStatus(accommodationId).subscribe(
        (response) => {
        },
        (status: any) => {
          if (status.status == 409) {
            this.ns.showNotification("error", "Nem sikerült a változtatás", 1200);
          } else if (status.status == 200) {
            this.ns.showNotification("success", "Sikeres státusz változtatás", 1200);
          } else {
            console.log(status.status)
          };
        });
      //reload page
      setTimeout(() => {
        this.fetchData();
      }, 500);
      //reset form
      this.statusControl.reset();
    } else {
      return;
    }
  }
}
