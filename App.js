import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Picker
} from 'react-native';
import { Constants, WebBrowser } from 'expo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import MapViewDirections from 'react-native-maps-directions';
import {
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
  MaterialIcons,
  FontAwesome,Entypo
} from '@expo/vector-icons';import firebase from 'firebase';
import { Button, TextInput, Appbar, Card, Title, Paragraph, List,Font } from 'react-native-paper';
import MapView from 'react-native-maps';
 const config = {
    apiKey: "AIzaSyDPdeoOdkr_BpGXFI38YdaZUqjCY9ffax4",
    authDomain: "cabservice-42683.firebaseapp.com",
    databaseURL: "https://cabservice-42683.firebaseio.com",
    projectId: "cabservice-42683",
    storageBucket: "cabservice-42683.appspot.com",
    messagingSenderId: "690235608303",
    appId: "1:690235608303:web:d29f918c99592de4"
  };
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
class App extends React.Component{
   componentDidMount = async () => {
    Font.loadAsync({
      'k': require('./assets/Pacifico.ttf'), 
    });
  };
   render(){
     return(
       <View style={{flex:1}}>
    <View style={{flex:1,backgroundColor:'#1e4860'}}>
<Appbar.Action
       style={{marginTop:220,marginLeft:170}}
       icon='local-taxi'
       size={250}
       color='#37bfbf'
      />
      <Text style={{fontSize:30,textAlign:'center',color:'#37bfbf',marginTop:-115,marginLeft:90,marginRight:90,fontFamily:'k',fontWeight:'bold'}}>Smart CABS</Text>
            
          <View>
           <MaterialIcons
                  name="local-taxi" 
                  size={250}
                  color="white"
                  style={{ position: 'absolute', top: 15, left: 60, zIndex: 0}}/>  
               </View>
        <Button 
        mode="contained"
        style={{marginLeft:80,marginRight:113,marginTop:310,height:50,width:200,borderRadius:45,backgroundColor:'#37bfbf'}}
        onPress= {() => this.props.navigation.navigate('Login')}>
          <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,color:'#1e4860'}}>WELCOME</Text>
     </Button>
     </View>
     </View>
       );
      }
    }
class Login extends React.Component {
  constructor(){
    super();
    this.state = {email:'', email1: '', usertype: '',  status: true,
      alldata: [],  eye: 'visibility-off', password:'', loadingstate:false};
    }
  login() {
    this.setState({loadingstate:true});
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((data) => {
      let uid = data.user.uid;
      firebase.database().ref('users/'+uid).once('value', (da) => {
        if(da.val().usertype=='user'){
          this.props.navigation.navigate('Home');
          this.setState({loadingstate:false});
        }else if(da.val().usertype=='admin'){
          this.setState({loadingstate:false});
          this.props.navigation.navigate('Admin');
        }else if(da.val().usertype=='driver'){
          this.setState({loadingstate:false});
          this.props.navigation.navigate('Driver');
        }
      })
    })
    .catch((err) => {
      alert(err);
      this.setState({loadingstate:false});
    })
  }
  showPass() {
    if (this.state.status) {
      this.setState({ status: false });
      this.setState({ eye: 'visibility' });
    } else {
      this.setState({ status: true });
      this.setState({ eye: 'visibility-off' });
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#1e4860', padding: 20 }}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: 30, marginBottom: 30, textAlign: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#58ddc0' }}>Smart</Text>
            <Text style={{ color: '#58ddc0' }}> CABS</Text>
          </Text>
          <TextInput
           label="Email"
           mode='contained'
            style={{marginTop:15,borderRadius:10,backgroundColor:'white'}}
            onChangeText={(t) => this.setState({email:t})}
            value={this.state.email}
           />
            <Appbar.Action
                  icon="email"
                  color="black"
                  style={{ marginTop: -45, marginLeft: 270 }}
                />
          <TextInput 
          mode='contained'
                  label="Password"
                  style={{ marginTop: 30,borderRadius:10,backgroundColor:'white' }}
                  onChangeText={t => this.setState({ password: t })}
                  value={this.state.password}
                  secureTextEntry={this.state.status}
                />
           <Appbar.Action
                  icon={this.state.eye}
                  color="black"
                  style={{marginLeft: 275,marginTop:-40}}
                  onPress={() => this.showPass()}
                   />
 
          <Button
            mode="contained"
            onPress={() => this.login()}
            loading={this.state.loadingstate}
            style={{ marginTop: 20, backgroundColor: '#37bfbf' ,height:50,width:280,marginLeft:17,borderRadius:10}}>
            <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center'}}>Login</Text>
          </Button>
        
             <Button
                  style={{ marginTop: 10, marginLeft: -2}}
                  onPress={() => this.props.navigation.navigate('Forgot')}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 15 }}> {' '}
                    Forgot Password?
                  </Text>
                </Button>


          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={{color:'white',textAlign:'center', marginTop:30,fontSize:15,fontWeight:'bold'}}>   Not Registered Yet ?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
class Register extends React.Component {
  constructor() {
    super();
    this.state = { fullname: '', email: '', password: '',confirmedpassword: '',contact: '', address: '', usertype: 'user' ,ismatch: true,error: '',textfield: true,alldata: [],alldata1: [],
      visiblestyle: 'visibility-off', textfield1: true, visiblestyle1: 'visibility-off',
     loadingstate:false}; 
  }
  addUser() {
    if(this.state.fullname.length < 3){
      alert('Full Name Should be 3 characters long.');
    }else{
    this.setState({loadingstate:true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        let uid = data.user.uid;
        firebase
          .database()
          .ref('users/'+uid)
          .set({
            fullname: this.state.fullname,
             confirmedpassword: this.state.confirmedpassword,
            contact: this.state.contact,
            address: this.state.address,
            usertype: this.state.usertype,
          })
          .then(() => {
            alert('Register Successfully! You may login now');
            this.props.navigation.navigate('Login');
            this.setState({loadingstate:false});
          })
          .catch(er => {
            alert(er);
            this.setState({loadingstate:false});
          });
      })
      .catch(err => {
        alert(err);
        this.setState({loadingstate:false});
      });
    }
  }
  showPass() {
    if (this.state.textfield) {
      this.setState({ textfield: false });
      this.setState({ visiblestyle: 'visibility' });
    } else {
      this.setState({ textfield: true });
      this.setState({ visiblestyle: 'visibility-off' });
    }
  }
  showPass1() {
    if (this.state.textfield1) {
      this.setState({ textfield1: false });
      this.setState({ visiblestyle1: 'visibility' });
    } else {
      this.setState({ textfield1: true });
      this.setState({ visiblestyle1: 'visibility-off' });
    }
  }
   checkPassword(t) {
    this.setState({ confirmedpassword: t }, () => {
      if (this.state.password.length > 5) {
        if (this.state.password == this.state.confirmedpassword) {
          this.setState({ ismatch: false, error: '' });
        } else {
          this.setState({ ismatch: true, error: 'Password Mismatch' });
        }
      }
    });
  }
  render() {
    return ( 
      <View style={{ flex: 1, backgroundColor: '#1e4860', padding: 20 }}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: 30, marginBottom: 30, textAlign: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#58ddc0' }}>Smart</Text>
            <Text style={{ color: '#58ddc0' }}> CABS</Text>
          </Text>
          <TextInput
            label="Full Name"
            onChangeText={t => this.setState({ fullname: t })}
            value={this.state.fullname}
          />
           <Appbar.Action
                    icon="account-circle"
                    color="black"
                    style={{ marginTop: -45, marginLeft: 277 }}
                  />
          <TextInput
            label="Email"
            style={{marginTop:10}}
            onChangeText={t => this.setState({ email: t })}
            value={this.state.email}
          />
          <Appbar.Action 
         icon='email'
        color="black"
       style={{marginTop:-45,marginLeft:277}}
             />
          <TextInput
                    label="Password"
                    onChangeText={t => this.setState({ password: t })}
                    value={this.state.password}
                    secureTextEntry={this.state.textfield}
                    style={{ marginTop: 13 }}
                  />
                  <Appbar.Action
                    icon={this.state.visiblestyle}
                    color="black"
                    onPress={() => this.showPass()}
                    style={{ marginTop: -45, marginLeft: 277 }}
                  />
             <TextInput
                    label="ConfirmedPassword"
                    onChangeText={t => this.checkPassword(t)}
                    value={this.state.confirmedpassword}
                    secureTextEntry={this.state.textfield1}
                    style={{ marginTop: 13 }}
                  />
                  <Text>{this.state.error}</Text>
                  <Appbar.Action
                    icon={this.state.visiblestyle1}
                    color="black"
                    onPress={() => this.showPass1()}
                    style={{ marginTop: -50, marginLeft: 277 }}
                  />

          <TextInput
            label="Contact No."
            keyboardType='Numeric'
            style={{marginTop:10}}
            onChangeText={t => this.setState({ contact: t })}
            value={this.state.contact}
          />
           <Appbar.Action
                    icon="settings-phone"
                    color="black"
                    style={{ marginTop: -45, marginLeft: 277 }}
                  />
          <TextInput
            label="Address"
            style={{marginTop:10}}
            onChangeText={t => this.setState({ address: t })}
            value={this.state.address}
          />
            <Appbar.Action
                    icon="room"
                    color="black"
                    style={{ marginTop: -45, marginLeft: 277 }}
                  />
          <Button
            mode="contained"
            loading={this.state.loadingstate}
            onPress={() => this.addUser()}
            style={{ marginTop: 20, backgroundColor: '#37bfbf' ,height:50,width:280,marginLeft:18,borderRadius:5}}>
            <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center'}}>Register</Text>
          </Button>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={{color:'#ccc',textAlign:'center', marginTop:30,fontSize:15}}>Already Registered ?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
class Forgot extends React.Component {
  constructor() {
    super();
    this.state = { email1: '' };
  }
  forgotPass() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email1)
      .then(() => {
        alert('Link Send to your email Address');
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Appbar.BackAction
          color="black"
          style={{ marginTop: 25, marginLeft: 10 }}
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Entypo
          name="key"
          size={90}
          color="#1e4860"
          style={{ marginTop: 40, marginLeft: 120 }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: 20,
            marginTop: 20,
          }}>
          Password Recovery
        </Text>

        <TextInput
          style={{ marginLeft: 12, marginRight: 12, marginTop: 30 }}
          label="Enter Email"
          mode="outlined"
          onChangeText={t => this.setState({ email1: t })}
          value={this.state.email1}
        />
        <Text
          style={{  color: 'black',
            marginTop: 15,
            fontSize: 15,
            marginLeft: 20,
            fontWeight: 'bold',
          }}>
          Enter your registered email
        </Text>
        <Button
          style={{
            marginTop: 20,
            height: 50,
            width: 250,
            borderRadius: 30,
            marginLeft: 37,
            backgroundColor: '#1e4860',
          }}
          mode="contained"
          onPress={() => this.forgotPass()}>
          Send Mail
        </Button>
      </View>
    );
  } 
}


class Home extends React.Component {
  setLocation(fromlong, fromlat, fromadd) {
    this.props.navigation.navigate('ToLocation', {
      fromlat: fromlat,
      fromlong: fromlong,
      fromadd: fromadd,
    });
  }
  componentWillMount(){
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('booking').once('value',(data) => {
      data.forEach((item) => {
        if(item.val().uid==uid && item.val().status != 2){
          this.props.navigation.navigate('Dmap',{key:item.key});
        }        
      })
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#1e4860',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text style={{ fontSize: 50, color: '#ffffff' }}>
            Enter Your Pickup Point
          </Text>
        </View>
        <View style={{ flex: 1.5 }}>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={3} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              let long = details.geometry.location.lng;
              let lat = details.geometry.location.lat;
              let address = details.formatted_address;
              this.setLocation(long, lat, address);
            }}
            getDefaultValue={() => ''}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAlLSGwt-hlMkhuOcm9MuG4sXWA_fNUZ84',
              language: 'en', // language of the results
              // types: '(geocode)' // default: 'geocode'
            }}
            styles={{
              textInputContainer: {
                width: '100%',
                paddingVertical: 2,
              },
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              type: 'cafe',
            }}
            GooglePlacesDetailsQuery={{
              // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
              fields: 'formatted_address',
            }}
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
        </View>
        <Button mode="contained"
        onPress={() => this.props.navigation.navigate("Login")}
        style={{ marginTop: 20, backgroundColor: '#37bfbf' }}>
        Logout</Button>
      </View>
    );
  }
}
class ToLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      fromlong: 0,
      fromlat: 0,
      fromaddress: '',
      tolong: 0,
      toplat: 0,
      toaddress: '',
    };
  }
  componentWillMount() {
    let fromlong = this.props.navigation.getParam('fromlong');
    let fromlat = this.props.navigation.getParam('fromlat');
    let fromadd = this.props.navigation.getParam('fromadd');
    this.setState({
      fromlong: fromlong,
      fromlat: fromlat,
      fromaddress: fromadd,
    });
  }
  setLocation(tolong, tolat, toadd) {
    this.props.navigation.navigate('ApproximatePrice', {
      fromlat: this.state.fromlat,
      fromlong: this.state.fromlong,
      fromadd: this.state.fromaddress,
      tolat: tolat,
      tolong: tolong,
      toadd: toadd,
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Appbar.BackAction
              color="#1e4860"
              style={{ marginTop: 20, marginLeft: 20 }}
              onPress={() => this.props.navigation.navigate('Home')}
            />
        <View
          style={{
            flex: 1,
            backgroundColor: '#1e4860',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text style={{ fontSize: 50, color: '#ffffff' }}>
            Enter Your Destination
          </Text>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>FROM</Text>
          <Text style={{ color: 'white' }}>{this.state.fromaddress}</Text>
        </View>
        <View style={{ flex: 1.6 }}>
          <GooglePlacesAutocomplete
            placeholder="Enter Destination"
            minLength={3} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              let long = details.geometry.location.lng;
              let lat = details.geometry.location.lat;
              let address = details.formatted_address;
              this.setLocation(long, lat, address);
            }}
            getDefaultValue={() => ''}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAlLSGwt-hlMkhuOcm9MuG4sXWA_fNUZ84',
              language: 'en', // language of the results
              // types: '(geocode)' // default: 'geocode'
            }}
            styles={{
              textInputContainer: {
                width: '100%',
                paddingVertical: 2,
              },
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              type: 'cafe',
            }}
            GooglePlacesDetailsQuery={{
              // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
              fields: 'formatted_address',
            }}
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
        </View>
      </View>
    );
  }
}
class ApproximatePrice extends React.Component {
  constructor() {
    super();
    let oid = new Date().getTime();
    this.state = {
      fromadd: '',
      toadd: '',
      fromlong: 0,
      tolong: 0,
      fromlat: 0,
      tolat: 0,
      distance: 0,
      orderid: "order"+oid
    };
  }
  componentWillMount() {
    let fromlong = this.props.navigation.getParam('fromlong');
    let tolong = this.props.navigation.getParam('tolong');
    let fromlat = this.props.navigation.getParam('fromlat');
    let tolat = this.props.navigation.getParam('tolat');
    this.distance(fromlat, fromlong, tolat, tolong, 'K');
    this.setState({
      fromadd: this.props.navigation.getParam('fromadd'),
      toadd: this.props.navigation.getParam('toadd'),
      fromlong: parseFloat(this.props.navigation.getParam('fromlong')),
      tolong: parseFloat(this.props.navigation.getParam('tolong')),
      fromlat: parseFloat(this.props.navigation.getParam('fromlat')),
      tolat: parseFloat(this.props.navigation.getParam('tolat')),
    });
  }
  distance(lat1, long1, lat2, long2, unit) {
    if (lat1 == lat2 && long1 == long2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = long1 - long2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      if (unit == 'N') {
        dist = dist * 0.8684;
      }
      this.setState({ distance: Math.round(dist) });
      if (dist > 25) {
        this.props.navigation.navigate('Notavailable');
      }
      return dist;
    }
  }
  paynow(amount,type){
    let url = "";
   WebBrowser.openBrowserAsync('http://sachtechsolution.pe.hu/easypayment/pay.php?mid=XvqsII91714188680938&amount='+amount+'&adminemail=bawaaman11@gmail.com.in&adminmobile=9914767069&mkey=MYxrdHXWaacfoY5M&orderid='+this.state.orderid)
    .then((pro) => {
      if(pro.type == 'cancel'){
        fetch('http://sachtechsolution.pe.hu/easypayment/checkstatus.php?orderid='+this.state.orderid)
        .then((data) => data.json())
        .then((res) => {
          if(res.status == 'success'){
            let uid = firebase.auth().currentUser.uid;
            firebase.database().ref('booking').push({
              fromadd: this.state.fromadd,
              toadd: this.state.toadd,
              fromlong: this.state.fromlong,
              tolong: this.state.tolong,
              fromlat: this.state.fromlat,
              tolat: this.state.tolat,
              distance: this.state.distance,
              orderid: this.state.orderid,
              driver:'',
              uid: uid,
              status:0,
              amount:amount,
              type:type
              
            }).then((aaa) => {
              let key = aaa.getKey();
              alert('Booking Successful our driver will reached your location soon');
              this.props.navigation.navigate('Dmap',{key:key});

            })
            .catch((e) => {
              alert(e);
            })
          }else{
            alert('Payment Error Please try again');
          }
        })
      }
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#276ef1',
              padding: 10,
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>FROM</Text>
            <Text style={{ color: 'white' }}>{this.state.fromadd}</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#2362d9',
              padding: 10,
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>TO</Text>
            <Text style={{ color: 'white' }}>{this.state.toadd}</Text>
          </View>
        </View>
        <View style={{ flex: 1.7, padding: 10 }}>
          <Text style={{ fontSize: 25, marginBottom: 30 }}>
            Select your vehicle
          </Text>
          <TouchableOpacity
            onPress={() => this.paynow(this.state.distance * 12, 'Normal')}
          >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#2de1ff',
              marginBottom: 25,
              padding: 20,
            }}>
            <View style={{ flex: 0.7, justifyContent: 'center' }}>
              <MaterialCommunityIcons
                name="car-side"
                size={70}
                color="#222222"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 25, color: '#333333' }}>Normal</Text>
              <Text>
                Rs : {this.state.distance} * 12 = {this.state.distance * 12}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.paynow(this.state.distance * 20, 'Pro')}
          >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#2de1ff',
              marginBottom: 25,
              padding: 20,
            }}>
            <View style={{ flex: 0.7, justifyContent: 'center' }}>
              <MaterialCommunityIcons
                name="car-sports"
                size={70}
                color="#222222"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 25, color: '#333333' }}>Pro</Text>
              <Text>
                Rs : {this.state.distance} * 20 = {this.state.distance * 20}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
class Notavailable extends React.Component {
  render() {
    //#2cdffd
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          alignItems: 'center',
          backgroundColor: '#2cdffd',
        }}>
        <MaterialIcons name="error" size={150} color="white" />
        <Text>OOPS !</Text>
        <Text style={{ textAlign: 'center' }}>
          Location you entered is not covered by our application yet.
        </Text>
        <Button
          mode="contained"
          style={{ marginTop: 30, backgroundColor: '#0e2666' }}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text>Back to Homepage</Text>
        </Button>
      </View>
    );
  }
}
class DriverHome extends React.Component{
  constructor(){
    super();
    this.state = {abcd:''};
    this.arr = [];
  }
  getRequests(){
    firebase.database().ref('booking').on('value',(data) => {
      this.arr = [];
      data.forEach((item) => {
        if(item.val().driver==''){
          let a = {toadd:item.val().toadd, fromadd:item.val().fromadd,key:item.key, amount:item.val().amount, type:item.val().type};
          this.arr.push(a);
          this.setState({abcd:''});
        }
      })
    })
  }
  componentWillMount(){
    this.getRequests();
  }
  acceptRequest(key){
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('booking').child(key).update({
      driver:uid,
      status:1
    })
    .then(() => {
      alert('Success');
      this.props.navigation.navigate('DriverMap', {key:key})
    })
  }
  printData(){
    if(this.arr.length != 0){
    return this.arr.map((item) => {
      return(
        <Card style={{marginTop:20, marginBottom:20, borderWidth:1, borderColor:'blue'}}>
          <Card.Content>
            <Title>From Address</Title>
            <Paragraph>{item.fromadd}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Title>To Address</Title>
            <Paragraph>{item.toadd}</Paragraph>
            <Text style={{color:'green'}}>Amount : Rs.{item.amount}</Text>
            <Text style={{color:'green'}}>Type : {item.type}</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => this.acceptRequest(item.key)}
            >Accept</Button>
          </Card.Actions>
        </Card>
      );
    })
    }else{
      return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <MaterialIcons 
            name="error" 
            size={120} 
            color="green"
          />
          <Text style={{fontSize:40}}>No Records</Text>
        </View>
      )
    }
  }

  render(){
    return(
      <View style={{flex:1, zIndex:0}}>
        <Appbar.Header>
          <Appbar.Action  icon="format-align-justify" 
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Appbar.Content
            title="Rides"
            subtitle="Available Rides"
          />
        </Appbar.Header>
        <ScrollView>
        <View style={{padding:10}}>
            {this.printData()}
        </View>
        </ScrollView>
      </View>
    )
  }
}
class DriverRides extends React.Component{
  constructor(){
    super();
    this.state = {};
    this.arr = [];
  }
  getRequests(){
    this.arr = [];
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('booking').on('value',(data) => {
      this.arr = [];
      data.forEach((item) => {
        if(item.val().driver==uid && item.val().status==1){
          let a = {toadd:item.val().toadd, fromadd:item.val().fromadd,key:item.key};
          this.arr.push(a);
          this.setState({abcd:''});
        }
      })
    })
  }
  printData(){
    if(this.arr.length != 0){
    return this.arr.map((item) => {
      return(
        <Card style={{marginTop:20, marginBottom:20, borderWidth:1, borderColor:'blue', zIndex:1}}>
          <Card.Content>
            <Title>From Address</Title>
            <Paragraph>{item.fromadd}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Title>To Address</Title>
            <Paragraph>{item.toadd}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => this.props.navigation.navigate('DriverMap', {key:item.key})}
            >Get Map</Button>
          </Card.Actions>
        </Card>
      );
    })
    }else{
      return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <MaterialIcons 
            name="error" 
            size={120} 
            color="green"
          />
          <Text style={{fontSize:40}}>No Records</Text>
        </View>
      )
    }
  }
  componentWillMount(){
    this.getRequests();
  }
  render(){
    return(
      <View style={{flex:1, zIndex:0}}>
        <Appbar.Header>
          <Appbar.Action  icon="format-align-justify" 
            onPress={() => this.props.navigation.openDrawer()}
          />
           <Appbar.Content
            title="Rides"
            subtitle="Accepted Rides"
          />
        </Appbar.Header>
        <ScrollView>
          <View style={{padding:10}}>
          {this.printData()} 
          </View>
        </ScrollView>
      </View>
    );
  }
}
class DriverMap extends React.Component{
  constructor(){
    super();
    this.state = {fromadd:'',toadd:'',fromlat:0,tolat:0,fromlong:0,tolong:0,key:''};
    
  }
  getData(){
    let key = this.props.navigation.getParam('key');
    firebase.database().ref('booking/'+key).once('value',(dat) => {
      this.setState({
        fromadd:dat.val().fromadd,
        toadd:dat.val().toadd,
        fromlat:dat.val().fromlat,
        fromlong:dat.val().fromlong,
        tolat:dat.val().tolat,
        tolong:dat.val().tolong,
        key:key
      })
    })
  }
  completeRoute(){
    firebase.database().ref('booking').child(this.state.key).update({
      status:2
    })
    .then(() => {
      alert('Order Complete');
    })
  }
  componentWillMount(){
    this.getData();
  }
  render(){
    return(
      <View style={{flex:1}}>
      <Appbar.Header>
        <Appbar.BackAction 
          onPress={() => this.props.navigation.navigate('DriverRides')}
        />
         <Appbar.Content
            title="Ride Map"
          />
      </Appbar.Header>
        <View style={{flex:0.8}}>
          <MapView 
            style={{flex:1}}
            region={{
              latitude:this.state.fromlat,
              longitude:this.state.fromlong,
              latitudeDelta:0.40,
              longitudeDelta:0.40
            }}
          >
          <MapViewDirections
            origin={{latitude: this.state.fromlat, longitude: this.state.fromlong}}
            destination={{latitude: this.state.tolat, longitude: this.state.tolong}}
            apikey={"AIzaSyAlLSGwt-hlMkhuOcm9MuG4sXWA_fNUZ84"}
            strokeWidth={6}
            strokeColor="hotpink"
          />
            <MapView.Marker 
              coordinate={{longitude:this.state.fromlong, latitude:this.state.fromlat}}
              title="Pickup"
            />
            <MapView.Marker 
              coordinate={{longitude:this.state.tolong, latitude:this.state.tolat}}
              title="Drop"
            />
          </MapView>
        </View>
        <View style={{flex:0.2}}>
          <Button style={{backgroundColor:'#EDF5E1'}}
            onPress={() => this.completeRoute()}
          >
            Complete
          </Button>
        </View>
      </View>
    );
  }
}
class Dmap extends React.Component{
  constructor(){
    super();
    this.state = {fromadd:'',toadd:'',fromlat:0,tolat:0,fromlong:0,tolong:0,key:'', status:0};
    
  }
  getData(){
    let key = this.props.navigation.getParam('key');
    firebase.database().ref('booking/'+key).on('value',(dat) => {
      this.setState({
        fromadd:dat.val().fromadd,
        toadd:dat.val().toadd,
        fromlat:dat.val().fromlat,
        fromlong:dat.val().fromlong,
        tolat:dat.val().tolat,
        tolong:dat.val().tolong,
        key:key,
        status:dat.val().status
      })
    })
  }
  
  componentWillMount(){
    this.getData();
  }
  render(){
    return(
      <View style={{flex:1}}>
      <Appbar.Header>
         <Appbar.Content
            title="Ride Map"
          />
      </Appbar.Header>
        <View style={{flex:0.8}}>
          <MapView 
            style={{flex:1}}
            region={{
              latitude:this.state.fromlat,
              longitude:this.state.fromlong,
              latitudeDelta:0.40,
              longitudeDelta:0.40
            }}
          >
          <MapViewDirections
            origin={{latitude: this.state.fromlat, longitude: this.state.fromlong}}
            destination={{latitude: this.state.tolat, longitude: this.state.tolong}}
            apikey={"AIzaSyAlLSGwt-hlMkhuOcm9MuG4sXWA_fNUZ84"}
            strokeWidth={6}
            strokeColor="hotpink"
          />
            <MapView.Marker 
              coordinate={{longitude:this.state.fromlong, latitude:this.state.fromlat}}
            />
            <MapView.Marker 
              coordinate={{longitude:this.state.tolong, latitude:this.state.tolat}}
            />
          </MapView>
        </View>
        <View style={{flex:0.2}}>
        {this.getPrint()}
        
        </View>
      </View>
    );
  }
  getPrint(){
    if(this.state.status == 0){
      return (
        <Text>Please Wait</Text>
      )
    }else if (this.state.status == 1){
      return(
        <Text>Driver Accept your ride and your location soon.</Text>
      )
    }else{
      return(
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
        >Ride Complete Please Click Here</Button>
      )
    }
  }
}
class DriverDraw extends React .Component{
  render(){
    return(
      <View style={{flex:1, zIndex:99999999999}}>
        <View style={{flex:1, backgroundColor:'blue'}}>
          <ImageBackground 
            source={require('./assets/taxi-driver-driving-car-happy-man-smiling-on-cab_4k_rlu3m__F0000.png')}
            style={{flex:1}}
          />
        </View>
        <View style={{flex:3}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DriverHome')} >
              <View>
                <AntDesign 
                  name="home" 
                  size={25}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}} />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Rides</Text>
          </TouchableOpacity>

        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DriverRides')}  > 
                <View> 
                <AntDesign
                  name="car" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Accepted Rides</Text>
          </TouchableOpacity>
     
         <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DriverOldRides')}  > 
                <View> 
                <MaterialCommunityIcons
                  name="car-wash" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Old Rides</Text>
          </TouchableOpacity>
     
         <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DriverEarning')}  > 
                <View> 
                <MaterialIcons
                  name="monetization-on" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Earning</Text>
          </TouchableOpacity>
     
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}  > 
                <View> 
                <AntDesign
                  name="logout" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Logout</Text>
          </TouchableOpacity>
         
        </View>
      </View>
    )
  }
}
class DriverOldRides extends React.Component{
   constructor(){
    super();
    this.state = {};
    this.arr = [];
  }
  getRequests(){
    this.arr = [];
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('booking').on('value',(data) => {
      this.arr = [];
      data.forEach((item) => {
        if(item.val().driver==uid && item.val().status==2){
          let a = {toadd:item.val().toadd, fromadd:item.val().fromadd,key:item.key, amount:item.val().amount, type:item.val().type};
          this.arr.push(a);
          this.setState({abcd:''});
        }
      })
    })
  }
  printData(){
    return this.arr.map((item) => {
      return(
        <Card style={{marginTop:20, marginBottom:20, borderWidth:1, borderColor:'blue', zIndex:1}}>
          <Card.Content>
            <Title>From Address</Title>
            <Paragraph>{item.fromadd}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Title>To Address</Title>
            <Paragraph>{item.toadd}</Paragraph>
            <Text style={{color:'green'}}>Amount : Rs.{item.amount}</Text>
            <Text style={{color:'green'}}>Type : {item.type}</Text>
          </Card.Content>
          <Card.Actions>
          
          </Card.Actions>
        </Card>
      );
    })
  }
  componentWillMount(){
    this.getRequests();
  }
  render(){
    return(
      <View style={{flex:1, zIndex:0}}>
        <Appbar.Header>
          <Appbar.Action  icon="format-align-justify" 
            onPress={() => this.props.navigation.openDrawer()}
          />
           <Appbar.Content
            title="Old Rides"
          />
        </Appbar.Header>
        <ScrollView>
          <View style={{padding:10}}>
          {this.printData()} 
          </View>
        </ScrollView>
      </View>
    );
  }
}
class DriverEarning extends React.Component{
   constructor(){
    super();
    this.state = {totalEarn:0};
    this.arr = [];
  }
  getRequests(){
    this.arr = [];
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('booking').once('value',(data) => {
      this.arr = [];
      let tot = 0;
      data.forEach((item) => {
        if(item.val().driver==uid && item.val().status==2){
          let amou = parseInt(item.val().amount);
          tot = tot +  amou;
          this.setState({totalEarn: tot});
        }
      })
    })
  }

  componentWillMount(){
    this.getRequests();
  }
  render(){
    return(
      <View style={{flex:1, zIndex:0}}>
        <Appbar.Header>
          <Appbar.Action  icon="format-align-justify" 
            onPress={() => this.props.navigation.openDrawer()}
          />
           <Appbar.Content
            title="Total Earning"
          />
        </Appbar.Header>
        <ScrollView>
          <View style={{padding:10}}>
            <View style={{height:300, backgroundColor:'#4285f4', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'#fff', fontSize:16}}>Your Total Earning is : </Text>
              <Text style={{fontSize:50, color:'#fff'}}>Rs: {this.state.totalEarn}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
class AdminDraw extends React .Component{
  render(){
    return(
      <View style={{flex:1, zIndex:99999999999}}>
        <View style={{flex:1, backgroundColor:'blue'}}>
          <ImageBackground 
            source={require('./assets/taxi-driver-driving-car-happy-man-smiling-on-cab_4k_rlu3m__F0000.png')}
            style={{flex:1}}
          />
        </View>
       <View style={{flex:3}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AdminHome')} >
              <View>
                <AntDesign 
                  name="home" 
                  size={25}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}} />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Dashboard</Text>
          </TouchableOpacity>

         <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddUserAdmin')}  > 
                <View> 
                <AntDesign
                  name="adduser" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>AddUser</Text>
          </TouchableOpacity>
     
           
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ShowUsers')}  > 
               <View> 
                <FontAwesome
                  name="users" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Show Users</Text>
          </TouchableOpacity>
     
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ShowDrivers')}  > 
            <View> 
                <FontAwesome
                  name="drivers-license-o" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Show Drivers</Text>
          </TouchableOpacity>
     
         <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ShowBooking')}  > 
               <View> 
                <MaterialCommunityIcons
                  name="book-open" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>ShowBooking</Text>
          </TouchableOpacity>
     
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}> 
              <View> 
                <AntDesign 
                  name="logout" 
                  size={23}
                  color="black"
                  style={{ position: 'absolute', top: 15, left: 15, zIndex: 0,backgroundColor:'white'}}
                />
              </View>
          <Text style={{padding:20, borderBottomColor:'black', borderBottomWidth:1,zIndex:1,paddingLeft:50}}>Logout</Text>
          </TouchableOpacity>
     
        </View>
      </View>
    )
  }
}
class AdminHome extends React.Component{
  constructor(){
    super();
    this.state = {users:0,drivers:0, bookings:0}
  }
  componentWillMount(){
    firebase.database().ref('users').once('value',(item) => {
      item.forEach((i) => {
        if(i.val().usertype == 'user'){
          this.setState({users: this.state.users + 1});
        }else if(i.val().usertype == 'driver'){
          this.setState({drivers: this.state.drivers + 1});
        }
      })
    })
    firebase.database().ref('booking').once('value',(item) => {
      let a = 0;
      item.forEach((i) => {
        a = a + 1;
        this.setState({bookings: a});
      })
    })
  }
  render(){
    return(
      <View style={{flex:1, zIndex:1}}>
        <Appbar.Header>
          <Appbar.Action  icon="format-align-justify" 
            onPress={() => this.props.navigation.openDrawer()}
          />
           <Appbar.Content
            title="Dashboard"
          />
        </Appbar.Header>
        <View style={{flex:1}}>
          <TouchableOpacity style={{flex:1, padding:15}}
            onPress={() => this.props.navigation.navigate('ShowUsers')}
          >
            <View style={{flex:1, backgroundColor:'#37a7ff', padding:20}}>
              <Text style={{fontSize:50, color:'#ffffff'}}>{this.state.users}</Text>
              <Text style={{fontSize:16, color:'#ffffff'}}>Users Registered</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, padding:15}}
            onPress={() => this.props.navigation.navigate('ShowDrivers')}
          >
            <View style={{flex:1, backgroundColor:'#0fe092', padding:20}}>
              <Text style={{fontSize:50, color:'#ffffff'}}>{this.state.drivers}</Text>
              <Text style={{fontSize:16, color:'#ffffff'}}>Drivers Registered</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, padding:15}}
            onPress={() => this.props.navigation.navigate('ShowBooking')}
          >
            <View style={{flex:1, backgroundColor:'#ea6248', padding:20}}>
              <Text style={{fontSize:50, color:'#ffffff'}}>{this.state.bookings}</Text>
              <Text style={{fontSize:16, color:'#ffffff'}}>Bookings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
class AddUserAdmin extends React.Component{
  componentDidMount = async () => {
    Font.loadAsync({
      "a": require('./assets/Pacifico.ttf'),
    });
  };
  constructor() {
    super();
    this.state = { fullname: '', email: '', password: '', usertype: 'user' ,loadingstate:false};
  }
  addUser() {
    this.setState({loadingstate:true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        let uid = data.user.uid;
        firebase
          .database()
          .ref('users/'+uid)
          .set({
            fullname: this.state.fullname,
            usertype: this.state.usertype,
          })
          .then(() => {
            alert('Register Successfully! You may login now');
            this.props.navigation.navigate('Login');
            this.setState({loadingstate:false});
          })
          .catch(er => {
            alert(er);
            this.setState({loadingstate:false});
          });
      })
      .catch(err => {
        alert(err);
        this.setState({loadingstate:false});
      });
  }
  render() {
    return (
      <View style={{ flex: 1, zIndex:1,backgroundColor:'#1e4860',marginTop:20}}>
      <Appbar.Action  icon="format-align-justify"  
      style={{marginTop:25,marginLeft:25,backgroundColor:'white'}}
            onPress={() => this.props.navigation.openDrawer()}
          /> 
           <Text style={{fontSize:50,marginLeft:80,color:'white',marginTop:20,fontFamily:'a'}}>Add User</Text> 
      <View style={{flex:2,marginTop:20}}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1 , padding:20}}>
           

          <TextInput
            label="Full Name"
            onChangeText={t => this.setState({ fullname: t })}
            value={this.state.fullname}
          />
          <TextInput
            label="Email"
            onChangeText={t => this.setState({ email: t })}
            value={this.state.email}
          />
          <TextInput
            label="Password"
            onChangeText={t => this.setState({ password: t })}
            value={this.state.password}
            secureTextEntry
          />
         <Picker
            selectedValue={this.state.usertype}
            style={{height: 50, width: 200,color:'white'}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({usertype: itemValue})
            }>
            <Picker.Item label="User" value="user" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Driver" value="driver" />
          </Picker>
          <Button
            mode="contained"
            loading={this.state.loading}
            onPress={() => this.addUser()}
            style={{ marginTop: 20, backgroundColor: '#37bfbf',height:50,width:260,marginLeft:30 }}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Register</Text>
          </Button>
         
        </KeyboardAvoidingView>
      </View></View>
    );
  }
}
class ShowUsers extends React.Component{
  constructor(){
    super();
    this.state = {abcd:''};
    this.arr = [];
  }
  getData(){
    firebase.database().ref('users').once('value',(data) => {
      data.forEach((item) => {
        if(item.val().usertype=='user'){
          let a  = {name:item.val().fullname, type:item.val().usertype}
          this.arr.push(a);
        }
      })
    })
    .then(() => {
      this.setState({abcd:''});
    })
  }
  printData(){
    return this.arr.map((items) => {
      return (<List.Item
        title={items.name}
        description={items.type}
      />)
    })
  }
  componentWillMount(){
    this.getData();
  }
  render(){
    return(
      <View style={{flex:1, zIndex:1}}>
        <Appbar.Header style={{backgroundColor:'#1e4860'}}>
          <Appbar.Action  icon="format-align-justify" 
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Appbar.Content 
              title="Users"
            />            
        </Appbar.Header>
       
         <View style={{flex:2,backgroundColor:'#1e4860'}}> 
          <View style={{width:340,borderRadius:5,padding:5,marginBottom:10,marginRight:10,borderWidth:3,marginLeft:10,marginTop:25,borderColor:'black',backgroundColor:'white'}}>
              <ScrollView>
            {this.printData()}
            </ScrollView>
          </View></View>  
        
      </View>
    );
  }
}
class ShowDrivers extends React.Component{
  constructor(){
    super();
    this.state = {abcd:''};
    this.arr = [];
  }
  getData(){
    firebase.database().ref('users').once('value',(data) => {
      data.forEach((item) => {
        if(item.val().usertype=='driver'){
          let a  = {name:item.val().fullname, type:item.val().usertype}
          this.arr.push(a);
        }
      })
    })
    .then(() => {
      this.setState({abcd:''});
    })
  }
  printData(){
    return this.arr.map((items) => {
      return (<List.Item
        title={items.name}
        description={items.type}
      />)
    })
  }
  componentWillMount(){
    this.getData();
  }
  render(){
    return(
      <View style={{flex:1, zIndex:1}}>
        <Appbar.Header style={{backgroundColor:'#1e4860'}}>
          <Appbar.Action  icon="format-align-justify" 
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Appbar.Content
              title="Drivers" 
            />            
        </Appbar.Header>
         <View style={{flex:2,backgroundColor:'#1e4860'}}> 
         <View style={{width:340,borderRadius:5,padding:5,marginBottom:10,marginRight:10,borderWidth:3,marginLeft:10,marginTop:25,borderColor:'black',backgroundColor:'white'}}>
          
        <ScrollView>
          <View style={{flex:1}}>
            {this.printData()}
          </View>
        </ScrollView>
      </View></View>
      </View> 
    );
  }
}
class ShowBooking extends React.Component{
  constructor(){
    super();
    this.state = {abcd:''};
    this.arr = [];
  }
  getData(){
    firebase.database().ref('booking').once('value', (data) => {
      data.forEach((item) => {
        let a  = {fromadd:item.val().fromadd, toadd:item.val().toadd,  amount:item.val().amount};
        this.arr.push(a);
      })
    })
    .then(() => {
      this.setState({abcd:''});
    })
  }
  printData(){
    return this.arr.map((item) => {
      return(
         <View style={{height:230,padding:18}}>
            <View
            style={{
              flex: 1,
              backgroundColor: '#276ef1',
              padding: 10,
              justifyContent: 'center',
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>FROM</Text>
              <Text style={{ color: 'white' }}>{item.fromadd}</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#2362d9',
                padding: 10,
                justifyContent: 'center',
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>TO</Text>
              <Text style={{ color: 'white' }}>{item.toadd}</Text>
            </View>
          </View>
      )
    })
  }
  componentWillMount(){
    this.getData();
  }
  render(){
    return(
      <View style={{flex:1, zIndex:1}}>
        <Appbar.Header>
          <Appbar.Action  icon="format-align-justify" 
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Appbar.Content
              title="Bookings"
            />            
        </Appbar.Header>
        <ScrollView>
          {this.printData()}
        </ScrollView>
      </View>
    )
  }
}
const AdminPage = createDrawerNavigator({
  AdminHome,
  AddUserAdmin,
  ShowUsers,
  ShowDrivers,
  ShowBooking
},{
  drawerType:'front',
  unmountInactiveRoutes:true,
  contentComponent: props => <AdminDraw {...props} />
})
const DriverPage = createDrawerNavigator({
  DriverHome ,
  DriverRides,
  DriverMap,
  DriverOldRides,
  DriverEarning
},{
  unmountInactiveRoutes:true,
  contentComponent: props => <DriverDraw {...props} />
})
const SwitchNav = createSwitchNavigator({  
  App,
  Login,Forgot,
  Register,
  Home,
  ToLocation,
  ApproximatePrice,
  Notavailable,
  Dmap,
  Driver: {screen: DriverPage},
  Admin: {screen: AdminPage},
});

export default createAppContainer(SwitchNav);
