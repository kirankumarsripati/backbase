import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Transfer } from '../../api-interfaces';

@Component({
  selector: 'bb-review-transfer',
  templateUrl: './review-transfer.component.html',
  styleUrls: ['./review-transfer.component.scss'],
})
export class ReviewTransferComponent {
  public event: EventEmitter<Transfer> = new EventEmitter<Transfer>();
  transferData!: Transfer;

  constructor(public bsModalRef: BsModalRef) {}
}
