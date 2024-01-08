import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() frontImage!: string;
  @Input() backImage!: string;

  flipped = false;
  isHidden = false;

  @Output() cardClicked = new EventEmitter<string>();
  @Output() cardHidden = new EventEmitter<void>();

  flipCard() {
    this.flipped = !this.flipped;
    this.cardClicked.emit(this.flipped ? this.backImage : this.frontImage);
  }

  resetCard() {
    this.flipped = false;
  }

  hideCard() {
    this.isHidden = true;
    this.cardHidden.emit(); // Emit the event when the card is hidden
  }
}



