import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpikesTreeviewItemComponent } from './spikes-treeview-item.component';

describe('SpikesTreeviewItemComponent', () => {
  let component: SpikesTreeviewItemComponent;
  let fixture: ComponentFixture<SpikesTreeviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpikesTreeviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpikesTreeviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
