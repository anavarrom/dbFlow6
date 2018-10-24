import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionNotificationsComponent } from './collection-notifications.component';

describe('CollectionNotificationsComponent', () => {
  let component: CollectionNotificationsComponent;
  let fixture: ComponentFixture<CollectionNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
