import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AccommodationService } from '../core/services/accommodation.service';
import { ReservationService } from '../core/services/reservation.service';

@Component({
  selector: 'app-list-reserved-accommodations',
  templateUrl: './list-reserved-accommodations.component.html',
  styleUrls: ['./list-reserved-accommodations.component.scss']
})
export class ListReservedAccommodationsComponent implements OnInit {

  accommodations?: Accommodation[];

  constructor(
    private as: AccommodationService,
    private rs: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.as.getReservedAccommodations().subscribe(
      (response) => {
        this.accommodations = response;;
      },
      (error) => {
        console.log(error);
      });
  }

  resignButton(accommodationId: number): void {
    this.rs.deleteReservationByAccommodationId(accommodationId).subscribe(
      (response) => { },
      (status: any) => {
        console.log(status.status);
      });
    //reload page
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
