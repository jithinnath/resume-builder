import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDashboardComponent } from './template-dashboard.component';

describe('TemplateDashboardComponent', () => {
  let component: TemplateDashboardComponent;
  let fixture: ComponentFixture<TemplateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
