import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IChat } from 'src/app/models/chat.model';
// import { IInbox, Inbox } from 'src/app/models/inbox.model';
import { GInbox, GroupInbox } from 'src/app/models/group.model';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { InboxService } from 'src/app/services/inbox.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-group-messages',
  templateUrl: './group-messages.component.html',
  styleUrls: ['./group-messages.component.scss'],
})
export class GroupMessagesComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('view', { static: true }) private view: any;

  user: IUser = {} as IUser;
  currentInbox: GroupInbox = {} as GInbox;
  sender: any = {};
  messages: any = [];
  enableMemberList: boolean = false;

  private subs = new SubSink();

  constructor(
    private chat: ChatService,
    private inbox: InboxService,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const paramId = params.get('id');

      this.inbox.setCurrent(paramId);
    });

    this.subs.sink = this.auth.getUser((user: IUser) => {
      if (!user) {
        return;
      }

      this.user = user;
    });

    this.subs.sink = this.inbox.getCurrent((inbox: GInbox) => {
      console.log(inbox, '..inbox...');
      inbox = {
        objectId: '1',
        userId: '123',
        senderId: '234',
        sender: {
          objectId: '1',
          groupname: 'Group1',
          description: 'Group Description',
          members: [
            {memberId: "5Lzl4TeyL2b70bbBiIWwgwhG0qz1", memberName: "albert son"},
            {memberId: "BCQPUuYMicVB0RzfL9ycIpjzNpD2", memberName: "abois abois"}
          ]
        },
        lastMessage: 'hellow',
        inboxHash: 'asdd',
        deleted: false
      };
      // if (!inbox) {
      //   return;
      // }

      // this.chat.fetchAll(inbox);
      // this.chat.subscribe(inbox);
      this.currentInbox = inbox;
     // this.sender = inbox.sender as IUser;
       this.sender = inbox.sender
    });

    // this.subs.sink = this.chat.getMessages((messages: IChat[]) => {
    //   console.log(this.messages, '...this.messages.....');
    //   this.messages = [{
    //     objectId: '2',
    //     inboxHash: 'abc',
    //     senderId: '2',
    //     receiverId: '2',
    //     message: 'Hi',
    //     deletedUserId: '2'
    //   }];

    //   if (!messages) {
        
    //     return;
    //   }

    //   this.messages = messages;
    //   console.log(this.messages, '...this.messages..')
    // });

    this.messages = [{
      objectId: '1',
      senderId: '1',
      senderName: 'Albert Son',
      message: 'Hellow'
    },
    {
      objectId: '2',
      senderId: '2',
      senderName: 'Abois Abois',
      receiverId: '2',
      message: 'Hi'
    },
    {
      objectId: '3',
      senderId: '1',
      senderName: 'Albert Son',
      receiverId: '2',
      message: 'How are you. What are you doing now.'
    }];

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      this.view.nativeElement.scrollTop = this.view.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage(message: string) {
   // this.chat.sendMessage(message, this.currentInbox, this.user);
   this.messages.push({
    objectId: '2',
    senderId: '2',
    senderName: 'Abois Abois',
    receiverId: '2',
    message: message
  })
    this.scrollToBottom();
  }

  opemMemberList() {
    this.enableMemberList = true;
  }

  closeMemberList() {
    this.enableMemberList = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
