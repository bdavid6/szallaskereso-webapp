import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AccommodationService } from '../core/services/accommodation.service';

@Component({
  selector: 'app-reserve-accommodation',
  templateUrl: './reserve-accommodation.component.html',
  styleUrls: ['./reserve-accommodation.component.scss']
})
export class ReserveAccommodationComponent implements OnInit {

  accommodation?: Accommodation

  accommodationId!: number;

  constructor(
    private as: AccommodationService,
    private route: ActivatedRoute,
    private router: Router
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
        this.accommodation = response;;
      },
      (error) => {
        console.log(error);
      });
  }

  reserveButton(): void {

  }
}
