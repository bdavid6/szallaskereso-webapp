import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAccommodationsComponent } from './confirm-accommodations.component';

describe('ConfirmAccommodationsComponent', () => {
  let component: ConfirmAccommodationsComponent;
  let fixture: ComponentFixture<ConfirmAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAccommodationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
