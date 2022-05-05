import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccommodationsComponent } from './list-accommodations.component';

describe('ListAccommodationsComponent', () => {
  let component: ListAccommodationsComponent;
  let fixture: ComponentFixture<ListAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccommodationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
