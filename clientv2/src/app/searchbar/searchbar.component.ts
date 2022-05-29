import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { SearchService } from '../core/services/search.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  filterForm!: FormGroup;
  servicesData = [
    { type: 'ingyen wifi' },
    { type: 'saját parkoló' },
    { type: 'edzőterem' },
    { type: 'étterem' },
    { type: 'akadálymentesített' },
    { type: 'állatbarát' },
    { type: 'medence' },
    { type: 'szauna' },
    { type: 'wellness' },
    { type: 'vízparti' },
    { type: 'esemény szervezés' },
    { type: 'gyerekprogramok' },
    //szoba
    { type: 'szobaszerviz' },
    { type: 'légkondi' },
    { type: 'tv' },
    { type: 'felszerelt konyha' },
  ];

  myDate = new Date(new Date().setMonth(new Date().getMonth()))
  myDate2 = new Date(new Date().setMonth(new Date().getMonth()))

  random!: number;
  idArray: number[] = [];

  myControl = new FormControl();
  searchText = '';
  dateText = ''; // távozás
  dateText1 = ''; // érkezés
  filteredOptions?: Observable<string[]>

  constructor(
    private ss: SearchService,
    private datepipe: DatePipe,
    private router: Router,
    private ahs: AuthService,
    private ns: NotificationService,
    private fb: FormBuilder
  ) {
    this.fetchData();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filterForm = this.fb.group({
      services: this.fb.array([]),
    });
  }

  //filterForm onchange
  onChange(services: string, isChecked: boolean) {
    const checkedServices = (this.filterForm.controls.services as FormArray);
    if (isChecked) {
      checkedServices.push(new FormControl(services));
    } else {
      const index = checkedServices.controls.findIndex(x => x.value === services);
      checkedServices.removeAt(index);
    }
  }

  fetchData(): void {
    this.ss.getAccommodationsBySearch('', '').subscribe(
      (response) => {
        for (let i = 0; i < response.length; i++) {
          let included = false;
          for (let j = 0; j < i; j++) {
            if (response[i].place == this.ss.options[j]) {
              included = true;
            }
          }
          if (!included) {
            this.ss.options.push(response[i].place)
          }
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

  servicesText(): string {
    return this.filterForm.get('services')!.value;
  }

  date1Changed(): void {
    const date1 = this.datepipe.transform(this.dateText1, 'yyyy-MM-dd');
    if (this.dateText1 == null) {
      localStorage.setItem('date1', '');
    } else {
      localStorage.setItem('date1', String(date1));;
    }
    //a távozási idő resetelése
    this.dateText = '';
  }

  clearSearch() {
    /*this.searchText = '';
    this.dateText = '';
    this.dateText1 = '';*/
  }

  randomIdButton(): void {
    if (this.ahs.isLoggedIn) {
      localStorage.clear();
      this.idArray = [];
      this.ss.getAccommodationsBySearch('', '').subscribe(
        (response) => {
          //fill idArray
          for (let i = 0; i < response.length; i++) {
            this.idArray.push(response[i].id);
          }
          //pick a random
          let length = this.idArray.length
          if (length == 0) {
            this.router.navigate(['/']);
            this.ns.showNotification("error", "Nincs ilyen szállás", 1200);

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
        },
        (error) => {
          console.log(error);
        });
    } else {
      this.ns.showNotification("error", "Bejelentkezés szükséges", 1200);
    }
  }

  randomIdWithFilterButton(): void {

    const filter = this.searchText.charAt(0).toUpperCase() + this.searchText.slice(1).toLowerCase();

    if (this.ahs.isLoggedIn) {

      if (filter) {
        localStorage.clear();
        this.idArray = [];
        this.ss.getAccommodationsBySearch(filter, this.dateText).subscribe(
          (response) => {
            //fill idArray
            for (let i = 0; i < response.length; i++) {
              this.idArray.push(response[i].id);
            }
            //pick a random
            let length = this.idArray.length
            if (length == 0) {
              this.router.navigate(['/']);
              this.ns.showNotification("error", "Nincs ilyen szállás", 1200);

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
          },
          (error) => {
            console.log(error);
          });

      } else {
        this.ns.showNotification("error", "Adjon meg egy úticélt", 1200);
      }
    } else {
      this.ns.showNotification("error", "Bejelentkezés szükséges", 1200);
    }
    this.clearSearch();
  }
}
