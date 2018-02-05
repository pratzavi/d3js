import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingDataComponent } from './binding-data.component';

describe('BindingDataComponent', () => {
  let component: BindingDataComponent;
  let fixture: ComponentFixture<BindingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
