import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/model/player';

@Component({
  selector: 'app-player-row',
  templateUrl: './player-row.component.html',
  styleUrls: ['./player-row.component.css']
})
export class PlayerRowComponent implements OnInit {
 @Input() player: IPlayer;
  constructor() { }

  ngOnInit(): void {
  }

}
