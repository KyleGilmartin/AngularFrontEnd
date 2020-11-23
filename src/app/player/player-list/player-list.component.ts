import { Component, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/model/player';
import { PlayerService } from 'src/app/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  playerList: IPlayer[];
  message: string;
  showPlayerForm: boolean = false;

  currentPlayer: IPlayer;

  constructor(private playerService:PlayerService ) { }

  ngOnInit(): void {


    this.playerService.getBooks().subscribe({
      next: (value: IPlayer[]) => this.playerList = value,
      complete: () => console.log('player service finished'),
      error: (mess) => this.message = mess
    })
  }

  clicked(player: IPlayer): void {
    this.currentPlayer = player;
  }
  openAddBook(): void {
    this.currentPlayer = null;
    this.showPlayerForm = true;
  }

  openEditBook(): void {
    this.showPlayerForm = true;
  }

playerFormClose(player: IPlayer): void{
  this.showPlayerForm = null;
  console.table(player);
  if (player == null){
    this.currentPlayer = null;
  }
  else if (this.currentPlayer == null){
    this.addNewBook(player);
  }
  else {
    console.log('need to update player with id ' + this.currentPlayer.isbn);
    this.updateBook(this.currentPlayer.isbn, player)
  }
}
  
updateBook (isbn: string, player: IPlayer){
  this.playerService.updateBook(isbn, player)
  .subscribe({
    next: player => this.message = "player has been modified",
    error: (err) => this.message = err
  });

// so the updated list appears

    this.playerService.getBooks().subscribe({
      next: (value: IPlayer[]) => this.playerList = value,
      complete: () => console.log('player service finished'),
      error: (mess) => this.message = mess
    })
}

  addNewBook(newPlayer: IPlayer): void {
    console.log('adding new book ' + JSON.stringify(newPlayer));
    this.playerService.addBook({ team: 'team', ...newPlayer })
      .subscribe({
        next: book => {
          console.log(JSON.stringify(book) + ' has been added');
        this.message = "new book has been added";},
        error: (err) => this.message = err
      });
  }

  isSelected(player: IPlayer): boolean{
    if (!player || !this.currentPlayer) {
      return false;
    }
    else {
      return player.isbn === this.currentPlayer.isbn;
    }
  }

}