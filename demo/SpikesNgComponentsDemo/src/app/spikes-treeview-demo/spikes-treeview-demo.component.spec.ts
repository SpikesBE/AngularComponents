import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpikesTreeviewDemoComponent } from './spikes-treeview-demo.component';

describe('SpikesTreeviewDemoComponent', () => {
  let component: SpikesTreeviewDemoComponent;
  let fixture: ComponentFixture<SpikesTreeviewDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpikesTreeviewDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpikesTreeviewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
