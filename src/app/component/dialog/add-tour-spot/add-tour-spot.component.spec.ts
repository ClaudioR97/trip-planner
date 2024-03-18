import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTourSpotComponent } from './add-tour-spot.component';

describe('AddTourSpotComponent', () => {
  let component: AddTourSpotComponent;
  let fixture: ComponentFixture<AddTourSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTourSpotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTourSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
