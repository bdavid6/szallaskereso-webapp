import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { Reservation } from '../core/interfaces/reservation';
import { AccommodationService } from '../core/services/accommodation.service';
import { ReservationService } from '../core/services/reservation.service';

@Component({
  selector: 'app-manage-accommodations',
  templateUrl: './manage-accommodations.component.html',
  styleUrls: ['./manage-accommodations.component.scss']
})
export class ManageAccommodationsComponent implements OnInit {

  accommodations!: Accommodation[];

  reservations!: Reservation[];

  constructor(
    private as: AccommodationService,
    private rs: ReservationService,
    private router: Router
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
}
