import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpikesTreeviewComponent } from './spikes-treeview.component';

describe('SpikesTreeviewComponent', () => {
  let component: SpikesTreeviewComponent;
  let fixture: ComponentFixture<SpikesTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpikesTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpikesTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
