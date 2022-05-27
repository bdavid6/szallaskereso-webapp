import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../core/interfaces/accommodation';
import { AccommodationService } from '../core/services/accommodation.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-confirm-accommodations',
  templateUrl: './confirm-accommodations.component.html',
  styleUrls: ['./confirm-accommodations.component.scss']
})
export class ConfirmAccommodationsComponent implements OnInit {
  
  accommodations!: Accommodation[];

  page: number = 1;

  pageSize: number = 3;

  itemCount: number = 0;

  constructor(
    private as: AccommodationService,
    private ns: NotificationService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.as.confirmAccommodations().subscribe(
      (response) => {
        this.accommodations = response;
      },
      (error) => {
        console.log(error);
      });
  }

  onDataChange(event: any) {
    this.page = event;
    this.fetchData();
  }

  confirmAccommodation(accommodationId: number): void {
    this.as.confirmAccommodation(accommodationId).subscribe(
      (response) => {
      },
      (status: any) => {
        if(status.status == 200) {
          this.ns.showNotification("success", "Sikeres művelet", 1000);
        } else if(status.status == 409) {
          this.ns.showNotification("error", "Sikertelen művelet", 1000);
        } else {
          console.log(status.status)
        }
      });
    //reload
    setTimeout(() => {
      this.fetchData();
    }, 500);
  }

  deleteAccommodation(accommodationId: number): void {
    this.as.deleteAccommodationById(accommodationId).subscribe(
      (response) => {
      },
      (status: any) => {
        if(status.status == 200) {
          this.ns.showNotification("success", "Sikeres művelet", 1000);
        } else if(status.status == 409) {
          this.ns.showNotification("error", "Sikertelen művelet", 1000);
        } else {
          console.log(status.status)
        }
      });
    //reload
    setTimeout(() => {
      this.fetchData();
    }, 500);
  }

}
