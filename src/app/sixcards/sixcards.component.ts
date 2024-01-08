import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-sixcards',
  templateUrl: './sixcards.component.html',
  styleUrl: './sixcards.component.scss'
})
export class SixcardsComponent implements AfterViewInit{
  @ViewChildren(CardComponent) cards!: QueryList<CardComponent>;

  cardObjects = [
    { backImage: './assets/sam1.jpg' },
    { backImage: './assets/maxi.jpg' },
    { backImage: './assets/jaddu.jpg' },
    { backImage: './assets/sam1.jpg' },
    { backImage: './assets/maxi.jpg' },
    { backImage: './assets/jaddu.jpg' }
  ];
  moves=0;
  misses=0;
  correctMoves = 0; 
  count=0;
  
  clickedCards: string[] = [];

  ngAfterViewInit() {
    // Subscribe to changes in the QueryList
    this.cards.changes.subscribe((cards: QueryList<CardComponent>) => {
      // Now 'cards' is the updated list of CardComponent instances
    });
  }

  hasWon: boolean = false;
  

  // Add a method to check if all cards are hidden
  

  onCardClicked(image: string) {
    if (image !== './assets/face.jpg') {
      this.clickedCards.push(image);
      
      if (this.clickedCards.length === 2) {
        this.moves++;
        if (this.clickedCards[0] === this.clickedCards[1]) {
          this.correctMoves++;
          // Cards match, hide the matched cards
          setTimeout(() => {
            this.cards.forEach(card => {
              if (card.backImage === this.clickedCards[0]) {
                card.hideCard();
                this.count=this.count+1;
                console.log(this.count)
              }});this.clickedCards = [];
            }, 1000);
        } else {
          this.misses++;
          // Cards don't match, reset the flipped cards after a short delay
          setTimeout(() => {
            this.cards.forEach(card => card.resetCard());
            this.clickedCards = [];
          }, 1000); // Adjust the delay as needed
        }
      }
    }
  }
  getAccuracy():number{
    return this.moves === 0 ? 0 : (this.correctMoves / this.moves) * 100;
  }
  resetGame() {
    // Implement logic to reset the game state
    // For example, reset moves, misses, and card visibility
    this.count=0;
    this.moves = 0;
    this.misses = 0;
    this.cards.forEach(card => {
      card.isHidden = false; // Set isHidden to false to show the front face
      card.flipped = false;
    });
  }
}



