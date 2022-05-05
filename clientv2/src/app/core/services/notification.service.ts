import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  //styles: "success" / "error"
  public showNotification(style: string, message: any, duration: number): void {
    let config = new MatSnackBarConfig();
    config.duration = duration;
    config.panelClass= [style];
    this.snackBar.open(message, 'X', config);
  }
}
