import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPlayer } from 'src/app/model/player';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

   @Input() player : IPlayer;

  @Output() playerFormClose = new EventEmitter<IPlayer>();

  message: string = '';
  isNewPlayerForm: boolean = false;
  playerForm: FormGroup;

  

  get name() {
    return this.playerForm.get('name');
  }
  get isbn() {
    return this.playerForm.get('isbn');
  }
 
  get last() {
    return this.playerForm.get('last');
  }

  get age() {
    return this.playerForm.get('age');
  }
  get team() {
    return this.playerForm.get('team');
  }
  get position() {
    return this.playerForm.get('position');
  }
  get wage() {
    return this.playerForm.get('wage');
  }
  get skill() {
    return this.playerForm.get('skill');
  }
  get weekFoot() {
    return this.playerForm.get('weekFoot');
  }

  constructor() { }

  ngOnInit(): void {
    console.table(this.player);
   if (this.player == null) {
      this.player = { isbn: '', name: '', last: '', age: '', team: '', position: '', wage: '', skill: '', weekFoot: '' };
      this.isNewPlayerForm = true;
    }

    this.playerForm = new FormGroup({
     isbn: new FormControl(this.player.isbn, [Validators.required]),
    name: new FormControl(this.player.name, [Validators.required, Validators.minLength(2)]),
    last: new FormControl(this.player.last, [Validators.required]),
    age: new FormControl(this.player.age, [Validators.required]),
    team: new FormControl(this.player.team, [Validators.required]),
    position: new FormControl(this.player.position, [Validators.required]),
    wage: new FormControl(this.player.wage, [Validators.required]),
    skill: new FormControl(this.player.skill, [Validators.required]),
    weekFoot: new FormControl(this.player.weekFoot, [Validators.required])
    });
  }

  onSubmit() {
    this.playerFormClose.emit(this.playerForm.value)
  }

  closeForm(){
    this.playerFormClose.emit(null)
  }


}