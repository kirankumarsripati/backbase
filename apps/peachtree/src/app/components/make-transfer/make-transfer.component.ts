import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Transfer } from '../../api-interfaces';

@Component({
  selector: 'bb-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent {
  @Input() balance = 0;
  @Input() allowedMinBalance = 0;
  @Output() submitForm: EventEmitter<Transfer> = new EventEmitter();

  transferForm: FormGroup = this.fb.group({
    toAccount: ['', Validators.required],
    amount: [
      '',
      [
        Validators.required,
        Validators.min(0),
        this.notEnoughBalValidator().bind(this),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}

  get toAccount(): FormControl {
    return this.transferForm.get('toAccount') as FormControl;
  }

  get amount(): FormControl {
    return this.transferForm.get('amount') as FormControl;
  }

  notEnoughBalValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const bal = this.balance - parseFloat(control.value);
      return bal < this.allowedMinBalance
        ? { notEnough: { value: bal } }
        : null;
    };
  }

  triggerSubmit() {
    if (this.transferForm.valid) {
      this.submitForm.emit(this.transferForm.value);
    } else {
      // to raise errors
      this.transferForm.markAllAsTouched();
    }
  }

  public reset() {
    this.transferForm.reset();
  }
}
