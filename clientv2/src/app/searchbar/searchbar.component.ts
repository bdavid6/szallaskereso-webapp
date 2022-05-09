import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { SearchService } from '../core/services/search.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  myControl = new FormControl();
  searchText = '';
  dateText = '';
  dateText1 = '';
  filteredOptions?: Observable<string[]>

  constructor(
    private ss: SearchService,
    private datepipe: DatePipe
  ) {
    this.fetchData();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  fetchData(): void {
    this.ss.getAccommodationsBySearch('', '').subscribe(
      (response) => {
        for (let i = 0; i < response.length; i++) {
          this.ss.options.push(response[i].place)
        }
      },
      (error) => {
        console.log(error);
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.ss.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  formatSearchText(): string {
    const text = this.searchText.replace(/\s/g, "");
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  formatDateText(): string {
    const date = this.datepipe.transform(this.dateText, 'yyyy-MM-dd');
    return String(date);
  }

  date1Changed(): void {
    const date1 = this.datepipe.transform(this.dateText1, 'yyyy-MM-dd');
    if(this.dateText1 == null) {
      localStorage.setItem('date1', '');
    } else {
      localStorage.setItem('date1', String(date1));;
    }
  }

  clearSearch() {
    //this.searchText = '';
    //this.dateText = '';
  }

  async randomIdButton(): Promise<void> {

    /*this.ss.savedPage = -3;
    if (this.ahs.isLoggedIn) {
      this.idArray = await this.ss.getIdArray();
      length = this.idArray.length;

      if (length == 0) {
        this.router.navigate(['/']);

      } else if (length == 1) {
        this.router.navigate(['/accommodations/' + this.idArray[0]]);

      } else {
        let x = Math.floor(Math.random() * length);
        while (this.random == x) {
          x = Math.floor(Math.random() * length);
        }
        this.random = x;
        this.router.navigate(['/accommodations/' + this.idArray[x]]);
      }

    } else {
      this.ns.showNotification(1, "Bejelentkezés szükséges", 1200);
    }*/
  }

  async randomIdWithFilterButton(): Promise<void> {

    /*const filter = this.searchText.charAt(0).toUpperCase() + this.searchText.slice(1).toLowerCase();

    this.ss.savedPage = -3;
    if (this.ahs.isLoggedIn) {

      if (filter) {
        this.idArray = await this.ss.getIdArrayWithFilter(filter);
        length = this.idArray.length;

        if (length == 0) {
          this.router.navigate(['/']);
          console.log("elso")
        } else if (length == 1) {
          this.router.navigate(['/accommodations/' + this.idArray[0]]);
          console.log("masodik")
        } else {
          let x = Math.floor(Math.random() * length);
          while (this.random == x) {
            x = Math.floor(Math.random() * length);
          }
          this.random = x;
          this.router.navigate(['/accommodations/' + this.idArray[x]]);
          console.log("harmadik")
        }

      } else {
        this.ns.showNotification(1, "Adjon meg egy úticélt", 1200);
      }
    } else {
      this.ns.showNotification(1, "Bejelentkezés szükséges", 1200);
    }
    this.clearSearch();*/
  }
}
