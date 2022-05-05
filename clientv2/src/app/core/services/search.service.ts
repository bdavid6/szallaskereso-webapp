import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation } from '../interfaces/accommodation';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  clicked: boolean = false;
  
  constructor(
    private http: HttpClient
  ) { }

  /*this.idArray = [];
      for (let i = 0; i < this.accommodations.length; i++) {
        this.idArray.push(this.accommodations[i].id);*/

  
  //FONTOS: url-t majd átirni (levenni a +3at)
  getAccommodationsBySearch(filterText: string): Observable<Accommodation[]> {
    let accommodations;
    if (filterText) {
      const modifiedFilterText = filterText.charAt(0).toUpperCase() + filterText.slice(1).toLowerCase();
      accommodations = this.http.get<Accommodation[]>('/api/search/'+3,
        {
          params: {
            filter: modifiedFilterText
          },
        });
    } else {
      accommodations = this.http.get<Accommodation[]>('/api/search/'+3);
    }
    return accommodations;
  }
}
