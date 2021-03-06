import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserService extends Component {
  baseUrl = 'http://192.168.0.171:3000/';

  constructor(props) {
    super(props);
  }

  login = async (email, password) => {
    return await fetch(this.baseUrl + 'guest/login', {
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
      .then(async data => {
        if (data) {
          AsyncStorage.setItem('TOKEN', data.token);
          AsyncStorage.setItem('userId', data.user);
          AsyncStorage.setItem('isDetails', data.isDetails.toString());
          AsyncStorage.setItem('isAdmin', data.isAdmin.toString());
          AsyncStorage.setItem('email', data.email);
          return data;
        }
      })
      .catch(error => {
        console.log('POST error: ' + error);
      });
  };

  changeDetails = async id => {
    return await fetch(this.baseUrl + 'user/update/details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => console.log(response))

      .catch(error => {
        console.log('POST error: ' + error);
      });
  };

  changePassword = async (email, password, newPassword) => {
    return await fetch(this.baseUrl + 'user/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        newPassword,
      }),
    })
      .then(response => console.log(response))
      .then(async data => {
        return data;
      })
      .catch(error => {
        console.log('POST error: ' + error);
      });
  };

  changeDate = async (id, weight, activity, purpose) => {
    return await fetch(this.baseUrl + 'details/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        weight,
        activity,
        purpose,
      }),
    })
      .then(response => console.log(response))
      .then(async data => {
        return data;
      })
      .catch(error => {
        console.log('POST error: ' + error);
      });
  };

  signup = async (email, password) => {
    await fetch(this.baseUrl + 'guest/signup', {
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
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
  };
}
