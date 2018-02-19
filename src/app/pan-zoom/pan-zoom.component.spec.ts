import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanZoomComponent } from './pan-zoom.component';

describe('PanZoomComponent', () => {
  let component: PanZoomComponent;
  let fixture: ComponentFixture<PanZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
