import { NotificationsPage } from './../notifications/notifications';
import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
// import { ChatResultsPage } from '../chat-results/chat-results';
import { InterpretePage } from '../interprete/interprete';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = InterpretePage;
  tab3Root = NotificationsPage;
  tab4Root = NotificationsPage;

  constructor(public menuCtrl : MenuController) {

  }

  toggleMenu(){
    this.menuCtrl.toggle();
    }




}
