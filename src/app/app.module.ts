import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
  NgbDropdownModule,
  NgbAlertModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './services/token-interceptor.service';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactFilterPipe } from './pipe/contact-filter.pipe';
import { ChatlistComponent } from './pages/chatlist/chatlist.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessagesComponent } from './pages/chatlist/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { MessageDirective } from './directives/message.directives';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { InboxFilterPipe } from './pipe/inbox-filter.pipe';
import { GroupFilterPipe } from './pipe/group-filter.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GroupsComponent } from './pages/groups/groups.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupMessagesComponent } from './pages/groups/group-messages/group-messages.component';
import { GroupComponent } from './components/group/group.component';
import { GroupMessageComponent } from './components/group-message/group-message.component';
import { ToastComponent } from './components/toast/toast.component';
import { ChatDatePipe } from './pipe/chat-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    ContactsComponent,
    ContactFilterPipe,
    InboxFilterPipe,
    ChatlistComponent,
    ChatComponent,
    MessagesComponent,
    MessageComponent,
    MessageDirective,
    MessageFormComponent,
    GroupsComponent,
    GroupMessagesComponent,
    GroupComponent,
    GroupFilterPipe,
    GroupMessageComponent,
    ToastComponent,
    ChatDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgbDropdownModule,
    NgbAlertModule,
    NgbToastModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:300',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
