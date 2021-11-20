import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserService extends Component {
  baseUrl = 'http://192.168.0.171:3000/';

  constructor(props) {
    super(props);
  }

  login = async (email, password) => {
    return await fetch(this.baseUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      // .then(async data => {
      //   if (data) {
      //     AsyncStorage.setItem('TOKEN', data.token);
      //     AsyncStorage.setItem('userId', JSON.stringify(data.user));
      //     console.log(
      //       'test service ' + (await AsyncStorage.getItem('user_id')),
      //     );
      //     return data;
      //   }
      // })
      .catch(error => {
        console.log('POST error: ' + error);
      });
  };

  signup = async (email, password) => {
    await fetch(this.baseUrl + 'signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(response => console.log(response));
  };

  logout = () => {
    AsyncStorage.removeItem('TOKEN');
    AsyncStorage.removeItem('userId');
  };
}
