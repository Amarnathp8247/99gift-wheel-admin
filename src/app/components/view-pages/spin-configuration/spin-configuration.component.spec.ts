import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinConfigurationComponent } from './spin-configuration.component';

describe('SpinConfigurationComponent', () => {
  let component: SpinConfigurationComponent;
  let fixture: ComponentFixture<SpinConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
