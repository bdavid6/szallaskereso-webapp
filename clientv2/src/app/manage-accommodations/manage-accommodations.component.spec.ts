import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccommodationsComponent } from './manage-accommodations.component';

describe('ManageAccommodationsComponent', () => {
  let component: ManageAccommodationsComponent;
  let fixture: ComponentFixture<ManageAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAccommodationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
