import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../core/interfaces/message';
import { Reservation } from '../core/interfaces/reservation';
import { MessageService } from '../core/services/message.service';
import { ReservationService } from '../core/services/reservation.service';

@Component({
  selector: 'app-list-reserved-accommodations',
  templateUrl: './list-reserved-accommodations.component.html',
  styleUrls: ['./list-reserved-accommodations.component.scss']
})
export class ListReservedAccommodationsComponent implements OnInit {

  reservations?: Reservation[];

  messages?: Message[];

  constructor(
    private rs: ReservationService,
    private router: Router,
    private ms: MessageService
  ) { }

  ngOnInit(): void {
    this.fetchData1();
    this.fetchData2();
  }

  fetchData1(): void {
    this.rs.getReservationsByUserId().subscribe(
      (response) => {
        this.reservations = response;
      },
      (error) => {
        console.log(error);
      });
  }

  fetchData2(): void {
    this.ms.getMessagesByUserId().subscribe(
      (response) => {
        this.messages = response;
      },
      (error) => {
        console.log(error);
      });
  }

  resignButton(reservationId: number): void {
    this.rs.deleteReservationById(reservationId).subscribe(
      (response) => {
      },
      (status: any) => {
        console.log(status.status);
      });
    //reload page
    /*const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });*/
    setTimeout(() => {
      this.fetchData1();
    }, 500);
  }

  deleteMessageButton(messageId: number): void {
    this.ms.deleteMessageById(messageId).subscribe(
      (response) => {
      },
      (status: any) => {
        console.log(status.status);
      });
    //reload
    setTimeout(() => {
      this.fetchData2();
    }, 500);
  }
}
