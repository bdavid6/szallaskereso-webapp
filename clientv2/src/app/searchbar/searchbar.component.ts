import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  searchText = '';

  constructor() { }

  ngOnInit(): void {
  }

  formatSearchText(): string {
    const text = this.searchText.replace(/\s/g, "");
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  selectedServices(): void {
    
  }

  clearSearch() {
    this.searchText = '';
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
