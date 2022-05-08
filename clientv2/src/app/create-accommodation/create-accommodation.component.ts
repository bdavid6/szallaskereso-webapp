import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { AccommodationService } from '../core/services/accommodation.service';
import { SearchService } from '../core/services/search.service';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.scss']
})
export class CreateAccommodationComponent implements OnInit {
  myDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
  accommodationForm!: FormGroup;
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

  get name(): FormControl {
    return this.accommodationForm.get('name') as FormControl;
  }

  get place(): FormControl {
    return this.accommodationForm.get('place') as FormControl;
  }

  get phone_number(): FormControl {
    return this.accommodationForm.get('phone_number') as FormControl;
  }

  get description(): FormControl {
    return this.accommodationForm.get('description') as FormControl;
  }

  get adult_price(): FormControl {
    return this.accommodationForm.get('adult_price') as FormControl;
  }

  get child_price(): FormControl {
    return this.accommodationForm.get('child_price') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private as: AccommodationService,
    private ss: SearchService
  ) {

  }

  ngOnInit(): void {
    this.accommodationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      place: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.required, Validators.minLength(9)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      information: [''],
      services: this.fb.array([]),
      res_end_date: [''],
      adult_price: ['', Validators.required],
      child_price: ['', Validators.required],
    });
  }

  onChange(services: string, isChecked: boolean) {
    const checkedServices = (this.accommodationForm.controls.services as FormArray);

    if (isChecked) {
      checkedServices.push(new FormControl(services));
    } else {
      const index = checkedServices.controls.findIndex(x => x.value === services);
      checkedServices.removeAt(index);
    }
  }

  createButton(formDirective: FormGroupDirective) {
    //date format ha nem üres
    if (this.accommodationForm.controls['res_end_date'].value !== "") {
      let transformedDate = this.datepipe.transform(this.accommodationForm.controls['res_end_date'].value, 'yyyy-MM-dd');
      this.accommodationForm.controls['res_end_date'].setValue(transformedDate);
    }
    //send
    this.accommodationForm.markAllAsTouched();
    if (this.accommodationForm.valid) {
      this.as.createAccommodation(this.accommodationForm.value).subscribe(
        (response) => { },
        (status: any) => {
          console.log(status.status);
        });

      //beletenni a search-autocomplete listába
      this.ss.options.push(this.accommodationForm.controls['place'].value)
      //clear
      formDirective.resetForm();
      this.accommodationForm.reset();

    } else {
      return;
    }
  }
}
