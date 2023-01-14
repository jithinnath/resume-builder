import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDashboardComponent } from './resume-dashboard.component';

describe('ResumeDashboardComponent', () => {
  let component: ResumeDashboardComponent;
  let fixture: ComponentFixture<ResumeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
