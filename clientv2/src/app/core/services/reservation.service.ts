import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient
  ) { }

  getReservationsByUserId(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('/api/reservations');
  }

  getReservationsByAccommodationId(accommodationId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('/api/reservations/accommodation/' + accommodationId);
  }

  reserveAccommodation(reservation: Reservation, accommodationId: number): Observable<Reservation> {
    return this.http.post<Reservation>('/api/reservations/accommodation/' + accommodationId, reservation);
  }

  /*deleteReservationByAccommodationId(accommodationId: number): Observable<Reservation> {
    return this.http.delete<Reservation>('/api/reservations/accommodation/' + accommodationId);
  }*/

  deleteReservationById(reservationId: number): Observable<Reservation> {
    return this.http.delete<Reservation>('/api/reservations/' + reservationId);
  }
}
