import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AuthService } from '../core/services/auth.service';
import { SearchService } from '../core/services/search.service';

@Component({
  selector: 'app-list-accommodations',
  templateUrl: './list-accommodations.component.html',
  styleUrls: ['./list-accommodations.component.scss']
})
export class ListAccommodationsComponent implements OnInit {

  accommodations?: any;

  filterText = '';

  page: number = 1;

  pageSize: number = 3;

  itemCount: number = 0;

  get isLoggedIn(): boolean {
    return this.ahs.isLoggedIn;
  }

  constructor(
    private ahs: AuthService,
    private ss: SearchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.filterText = params.filter;
        this.fetchData();
      });
  }

  fetchData(): void {
    this.ss.getAccommodationsBySearch(this.filterText).subscribe(
      (response) => {
        this.accommodations = response;;
      },
      (error) => {
        console.log(error);
      });
  }

  onDataChange(event: any) {
    this.page = event;
    this.fetchData();
  }
}
