import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB0oaQ94WOdbYp323AlQJuJQjfXt47JVqw',
  authDomain: 'collapporation.firebaseapp.com',
  databaseURL: 'https://collapporation.firebaseio.com',
  projectId: 'collapporation',
  storageBucket: 'collapporation.appspot.com',
  messagingSenderId: '756136153245',
  appId: '1:756136153245:web:abd0375d9d943eb0058474',
  measurementId: 'G-N9TV5Y97ZJ'
}

firebase.initializeApp(firebaseConfig)
