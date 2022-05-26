import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation } from '../interfaces/accommodation';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  options: string[] = [];
  
  constructor(
    private http: HttpClient
  ) { }

  /*this.idArray = [];
      for (let i = 0; i < this.accommodations.length; i++) {
        this.idArray.push(this.accommodations[i].id);*/

  
  getAccommodationsBySearch(filterText: string, date: string): Observable<Accommodation[]> {
    let accommodations;
    if (filterText && date) {
      const modifiedFilterText = filterText.charAt(0).toUpperCase() + filterText.slice(1).toLowerCase();
      accommodations = this.http.get<Accommodation[]>('/api/search/',
        {
          params: {
            filter: modifiedFilterText,
            date: date
          },
        });
    } else if (filterText) {
      const modifiedFilterText = filterText.charAt(0).toUpperCase() + filterText.slice(1).toLowerCase();
      accommodations = this.http.get<Accommodation[]>('/api/search/',
        {
          params: {
            filter: modifiedFilterText
          },
        });
    } else if (date) {
      accommodations = this.http.get<Accommodation[]>('/api/search/',
        {
          params: {
            date: date
          },
        });
    } else {
      accommodations = this.http.get<Accommodation[]>('/api/search/');
    }
    return accommodations;
  }
}
