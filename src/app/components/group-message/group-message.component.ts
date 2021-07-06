import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.scss']
})
export class GroupMessageComponent {
  @Input() message: any = {};
  userId: string = '2';
  constructor() { }

}

