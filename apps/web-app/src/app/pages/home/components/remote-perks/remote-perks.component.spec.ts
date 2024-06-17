import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotePerksComponent } from './remote-perks.component';

describe('RemotePerksComponent', () => {
  let component: RemotePerksComponent;
  let fixture: ComponentFixture<RemotePerksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemotePerksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemotePerksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
