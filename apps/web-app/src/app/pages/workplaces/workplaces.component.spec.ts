import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplacesComponent } from './workplaces.component';

describe('WorkplacesComponent', () => {
  let component: WorkplacesComponent;
  let fixture: ComponentFixture<WorkplacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkplacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
