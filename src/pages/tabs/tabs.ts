import { NotificationsPage } from './../notifications/notifications';
import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
// import { DelegatesPage } from '../delegates/delegates';
// import { SocialPage } from '../social/social';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = NotificationsPage;
  tab4Root = NotificationsPage;

  constructor() {

  }
}
