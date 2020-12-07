import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediaAddComponent } from './multimedia-add.component';

describe('MultimediaAddComponent', () => {
  let component: MultimediaAddComponent;
  let fixture: ComponentFixture<MultimediaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultimediaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultimediaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
