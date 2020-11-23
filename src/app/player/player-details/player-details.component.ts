import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/model/player';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

   @Input() player: IPlayer;
  constructor() { }

  ngOnInit(): void {
  }

}
