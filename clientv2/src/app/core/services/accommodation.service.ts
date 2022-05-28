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
    const formData = new FormData();
    formData.append("name", accommodation.name)
    formData.append("place", accommodation.place)
    formData.append("phone_number", String(accommodation.phone_number))
    formData.append("description", accommodation.description)
    formData.append("information", accommodation.information)
    formData.append("services", JSON.stringify(accommodation.services))
    formData.append("res_end_date", accommodation.res_end_date)
    formData.append("adult_price", String(accommodation.adult_price))
    formData.append("child_price", String(accommodation.child_price))
    //title, name ?
    formData.append("image", accommodation.image)
    return this.http.post<Accommodation>('/api/accommodations', formData);
  }

  getCreatedAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('/api/accommodations/all/MEMBER');
  }

  changeAccommodationStatus(accommodationId: number): Observable<Accommodation> {
    return this.http.put<Accommodation>('/api/accommodations/' + accommodationId, '');
  }

  confirmAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('/api/accommodations/all/ADMIN');
  }

  deleteAccommodationById(accommodationId: number): Observable<Accommodation> {
    return this.http.delete<Accommodation>('/api/accommodations/' + accommodationId);
  }

  confirmAccommodation(accommodationId: number): Observable<Accommodation> {
    return this.http.put<Accommodation>('/api/accommodations/confirm/' + accommodationId, '');
  }
}
