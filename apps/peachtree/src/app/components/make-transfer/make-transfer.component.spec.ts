import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BbUIModule } from '@bb/bb-ui';

import { MakeTransferComponent } from './make-transfer.component';

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeTransferComponent],
      imports: [ReactiveFormsModule, BbUIModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('to account field validity', () => {
    let errors: Record<string, unknown> = {};
    const toAccount = component.toAccount;

    // To Account is required
    errors = toAccount.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set some value to To Account
    toAccount.setValue('Backbase');
    errors = toAccount.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('amount field validity', () => {
    component.balance = 1000;
    component.allowedMinBalance = -500;

    let errors: Record<string, unknown> = {};

    const amount = component.amount;

    // Amount is required
    errors = amount.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set some negative value to amount
    amount.setValue(-200);
    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeTruthy();

    // Set some positive value
    amount.setValue(500);
    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeFalsy();
    expect(errors['notEnough']).toBeFalsy();

    // Set value above min balance requirement
    amount.setValue(2000);
    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeFalsy();
    expect(errors['notEnough']).toBeTruthy();
  });

  it('should trigger event', () => {
    jest.spyOn(component.submitForm, 'emit');
    component.balance = 1000;

    // without valid form should not submit
    component.triggerSubmit();
    expect(component.submitForm.emit).toHaveBeenCalledTimes(0);

    component.toAccount.setValue('Backbase');
    component.amount.setValue(500);
    // here it should call the submit
    component.triggerSubmit();
    expect(component.submitForm.emit).toHaveBeenCalledTimes(1);
  });

  it('should reset the form', () => {
    component.toAccount.setValue('Backbase');
    component.amount.setValue(1000);

    component.reset();
    expect(component.toAccount.value).toBeFalsy();
    expect(component.amount.value).toBeFalsy();
  });
});
