import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreationComponent } from './recipe-creation.component';

describe('RecipeCreationComponent', () => {
  let component: RecipeCreationComponent;
  let fixture: ComponentFixture<RecipeCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeCreationComponent]
    });
    fixture = TestBed.createComponent(RecipeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
