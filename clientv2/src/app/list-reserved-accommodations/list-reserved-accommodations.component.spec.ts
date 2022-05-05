import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservedAccommodationsComponent } from './list-reserved-accommodations.component';

describe('ListReservedAccommodationsComponent', () => {
  let component: ListReservedAccommodationsComponent;
  let fixture: ComponentFixture<ListReservedAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservedAccommodationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservedAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
