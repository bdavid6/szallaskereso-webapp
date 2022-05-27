import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  loading = false;

  paymentForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    cardnumber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(19), Validators.pattern(/^[0-9]\d*$/)]],
    date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[0-9]\d*$/)]],
    cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[0-9]\d*$/)]],
  });

  get name(): AbstractControl {
    return this.paymentForm.get('name') as AbstractControl;
  }

  get cardnumber(): AbstractControl {
    return this.paymentForm.get('cardnumber') as AbstractControl;
  }

  get date(): AbstractControl {
    return this.paymentForm.get('date') as AbstractControl;
  }

  get cvc(): AbstractControl {
    return this.paymentForm.get('cvc') as AbstractControl;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public payment: boolean
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.valid) {

      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.dialogRef?.close('true');
      }, 1750);
    }
  }

  cancel(): void {
    this.dialogRef?.close('false');
  }

}
