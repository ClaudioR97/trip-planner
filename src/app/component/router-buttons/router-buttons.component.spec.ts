import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterButtonsComponent } from './router-buttons.component';

describe('RouterButtonsComponent', () => {
  let component: RouterButtonsComponent;
  let fixture: ComponentFixture<RouterButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
