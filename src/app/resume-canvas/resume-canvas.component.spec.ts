import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCanvasComponent } from './resume-canvas.component';

describe('ResumeCanvasComponent', () => {
  let component: ResumeCanvasComponent;
  let fixture: ComponentFixture<ResumeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
