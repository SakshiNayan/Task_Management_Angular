import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackProgessComponent } from './track-progess.component';

describe('TrackProgessComponent', () => {
  let component: TrackProgessComponent;
  let fixture: ComponentFixture<TrackProgessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackProgessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackProgessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
