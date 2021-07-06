import { Component, Input } from '@angular/core';
import { GInbox } from 'src/app/models/group.model';
// import { IInbox } from 'src/app/models/inbox.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input() inbox: GInbox = {} as GInbox;

  constructor() { }

}
