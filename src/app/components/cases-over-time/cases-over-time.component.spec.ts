import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesOverTimeComponent } from './cases-over-time.component';

describe('CasesOverTimeComponent', () => {
  let component: CasesOverTimeComponent;
  let fixture: ComponentFixture<CasesOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesOverTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
