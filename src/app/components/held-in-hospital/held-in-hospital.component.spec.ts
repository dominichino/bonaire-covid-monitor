import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldInHospitalComponent } from './held-in-hospital.component';

describe('HeldInHospitalComponent', () => {
  let component: HeldInHospitalComponent;
  let fixture: ComponentFixture<HeldInHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeldInHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeldInHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
