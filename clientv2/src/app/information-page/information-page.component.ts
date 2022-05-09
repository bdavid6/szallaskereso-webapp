import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-information-page',
  templateUrl: './information-page.component.html',
  styleUrls: ['./information-page.component.scss']
})
export class InformationPageComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.ahs.isLoggedIn;
  }

  constructor(
    private ahs: AuthService
  ) { }

  ngOnInit(): void {
  }

}
