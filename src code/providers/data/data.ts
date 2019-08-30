import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {








  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');

  }

  hometext() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().hometext) || ' ';

    });
  }

  homeButtontext() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().homeButtontext) || ' ';

    });
  }

  interpreteText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().interpreteText) || ' ';

    });
  }
  interpreteButtonText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().interpreteButtonText) || ' ';

    });
  }

  abouttext() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().abouttext) || ' ';

    });
  }

  prescriptionText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().prescriptiontext) || ' ';

    });
  }

  referralText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().referraltext) || ' ';

    });
  }
  counsellingText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().counsellingtext) || ' ';

    });
  }
  callText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().calltext) || ' ';

    });
  }

  consultDisclaimerText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().consultDisclaimerText) || ' ';

    });
  }

  resultsDisclaimerText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().resultsDisclaimerText) || ' ';

    });
  }

  referDisclaimerText() {
    return firebase.database().ref().child("appstrings")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().refersDisclaimerText) || ' ';

    });
  }


}
