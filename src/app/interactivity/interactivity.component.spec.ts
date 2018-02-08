import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractivityComponent } from './interactivity.component';

describe('InteractivityComponent', () => {
  let component: InteractivityComponent;
  let fixture: ComponentFixture<InteractivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
