import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';
import { SearchService } from '../core/services/search.service';

@Component({
  selector: 'app-list-accommodations',
  templateUrl: './list-accommodations.component.html',
  styleUrls: ['./list-accommodations.component.scss']
})
export class ListAccommodationsComponent implements OnInit {

  accommodations?: any;

  filterText = '';

  dateText = '';

  services: string[] = [];

  page: number = 1;

  pageSize: number = 3;

  itemCount: number = 0;

  get isLoggedIn(): boolean {
    return this.ahs.isLoggedIn;
  }

  constructor(
    private ahs: AuthService,
    private ss: SearchService,
    private route: ActivatedRoute,
    private ns: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.filterText = params.filter;
        this.dateText = params.date;
        this.page = params.page;
        this.services = params.services;
        this.fetchData();
      });
  }

  fetchData(): void {
    this.ss.getAccommodationsBySearch(this.filterText, this.dateText).subscribe(
      (response) => {
        //this.accommodations = response;
        this.accommodations = this.filter(response);
      },
      (error) => {
        console.log(error);
      });
  }

  filter(array: any) {
    if (this.services) {
      let counter;
      let filteredArray = [];
      for (let i = 0; i < array.length; i++) {
        counter = 0;
        for (let j = 0; j < array[i].services.length; j++) {
          for (let z = 0; z < this.services.length; z++) {
            if (array[i].services[j] == this.services[z]) {
              counter++;
            }
          }
        }
        if (counter == this.services.length) {
          filteredArray.push(array[i]);
        }
      }
      return filteredArray;
    } else {
      return array;
    }
    /*if (this.services) {
      let counter;
      this.filteredAccommodations = [];
      for (let i = 0; i < response.length; i++) {
        counter = 0;
        for (let j = 0; j < response[i].services.length; j++) {
          for (let z = 0; z < this.servicesss.length; z++) {
            if (response[i].services[j] == this.servicesss[z]) {
              counter++;
              console.log("counter")
            }
          }
        }
        if (counter == this.servicesss.length) {
          this.filteredAccommodations.push(response[i]);
        }
      }
      this.accommodations = this.filteredAccommodations;
      console.log(this.filteredAccommodations)
    } else {
      this.accommodations = response;
      this.accommodations = response;
      return;
    }*/
  }

  onDataChange(event: any) {
    this.page = event;
    this.fetchData();
  }

  alert(): void {
    this.ns.showNotification("error", "Bejelentkezés szükséges", 1200);
  }

  save(): void {
    //vissza gombhoz elmenteni
    if (this.filterText == undefined) {
      localStorage.setItem('filter', '');
    } else {
      localStorage.setItem('filter', this.filterText);
    }
    if (this.dateText == undefined) {
      localStorage.setItem('date', '');
    } else {
      localStorage.setItem('date', this.dateText);
    }
    if (this.page == undefined) {
      localStorage.setItem('page', '1');
    } else {
      localStorage.setItem('page', String(this.page));
    }
    localStorage.setItem('services', JSON.stringify(this.services));
  }
}
