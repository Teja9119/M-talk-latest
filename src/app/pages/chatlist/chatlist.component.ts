import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IInbox } from 'src/app/models/inbox.model';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { InboxService } from 'src/app/services/inbox.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss'],
})
export class ChatlistComponent implements OnInit, OnDestroy {
  @ViewChild('messages', { static: true }) messages: ElementRef | null = null;
  searchText = '';
  user = {} as IUser;
  inboxes = [] as IInbox[];
  hideChatList = false;
  showPartipets: boolean = false;

  private subs = new SubSink();

  constructor(
    private inbox: InboxService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const nativeElement = this.messages?.nativeElement;

        if (nativeElement?.children.length >= 2) {
          this.hideChatList = true;
        } else {
          this.hideChatList = false;
        }
      }
    });

    const href = window.location.href;

    if (href.split('/').length >= 5) {
      this.hideChatList = true;
    }

    this.subs.sink = this.auth.getUser((user: IUser) => {
      if (!user) {
        return;
      }

      this.user = user;
      this.inbox.subscribe(user);
      this.inbox.getAll(this.user);
    });

    this.subs.sink = this.inbox.getInboxes((inboxes: IInbox[]) => {
      if (!inboxes) {
        return;
      }

      this.inboxes = inboxes;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
