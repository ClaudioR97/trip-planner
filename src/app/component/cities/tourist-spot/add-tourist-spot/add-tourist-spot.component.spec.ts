import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTouristSpotComponent } from './add-tourist-spot.component';

describe('AddTouristSpotComponent', () => {
  let component: AddTouristSpotComponent;
  let fixture: ComponentFixture<AddTouristSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTouristSpotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTouristSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
