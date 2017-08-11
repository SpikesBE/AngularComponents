import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpikesTimelineDemoComponent } from './spikes-timeline-demo.component';

describe('SpikesTimelineDemoComponent', () => {
  let component: SpikesTimelineDemoComponent;
  let fixture: ComponentFixture<SpikesTimelineDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpikesTimelineDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpikesTimelineDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
