import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation } from '../interfaces/accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(
    private http: HttpClient
  ) { }

  getAccommodationById(accommodationId: number): Observable<Accommodation> {
    return this.http.get<Accommodation>('/api/accommodations/' + accommodationId);
  }

  createAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.post<Accommodation>('/api/accommodations', accommodation);
  }

  getReservedAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('/api/reservations');
  }

  getCreatedAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('/api/accommodations');
  }

  changeAccommodationStatus(accommodationId: number): Observable<Accommodation> {
    return this.http.put<Accommodation>('/api/accommodations/' + accommodationId, '');
  }
}
