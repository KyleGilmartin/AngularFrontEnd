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


    this.playerService.getPlayer().subscribe({
      next: (value: IPlayer[]) => this.playerList = value,
      complete: () => console.log('player service finished'),
      error: (mess) => this.message = mess
    })
  }

  clicked(player: IPlayer): void {
    this.currentPlayer = player;
  }
  openAddPlayer(): void {
    this.currentPlayer = null;
    this.showPlayerForm = true;
  }

  openEditPlayer(): void {
    this.showPlayerForm = true;
  }
   openDeletePlayer(): void {
    this.showPlayerForm = true;
  }

playerFormClose(player: IPlayer): void{
  this.showPlayerForm = null;
  console.table(player);
  if (player == null){
    this.currentPlayer = null;
  }
  else if (this.currentPlayer == null){
    this.addNewPlayer(player);
  }
  else {
    console.log('need to update player with id ' + this.currentPlayer.isbn);
    this.updatePlayer(this.currentPlayer.isbn, player)
  }
}
  
  
playerFormClose2(player: IPlayer): void{
  this.showPlayerForm = null;
  console.table(player);
  if (player == null){
    this.currentPlayer = null;
  }
  else if (this.currentPlayer == null){
    this.addNewPlayer(player);
  }
  else {
    console.log('need to update player with id ' + this.currentPlayer.isbn);
    this.deletePlayer(this.currentPlayer.isbn, player)
  }
}
  
updatePlayer (isbn: string, player: IPlayer){
  this.playerService.updatePlayer(isbn, player)
  .subscribe({
    next: player => this.message = "player has been modified",
    error: (err) => this.message = err
  });

// so the updated list appears

    this.playerService.getPlayer().subscribe({
      next: (value: IPlayer[]) => this.playerList = value,
      complete: () => console.log('player service finished'),
      error: (mess) => this.message = mess
    })
}

  deletePlayer (isbn: string, player: IPlayer){
  this.playerService.updatePlayer(isbn, player)
  .subscribe({
    next: player => this.message = "player has been Deleted",
    error: (err) => this.message = err
  });

// so the updated list appears

    this.playerService.getPlayer().subscribe({
      next: (value: IPlayer[]) => this.playerList = value,
      complete: () => console.log('player service finished'),
      error: (mess) => this.message = mess
    })
}
  addNewPlayer(newPlayer: IPlayer): void {
    console.log('adding new Player ' + JSON.stringify(newPlayer));
    this.playerService.addPlayer({ team: 'team', ...newPlayer })
      .subscribe({
        next: player => {
          console.log(JSON.stringify(player) + ' has been added');
        this.message = "new player has been added";},
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