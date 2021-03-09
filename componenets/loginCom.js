import React, { Component , useEffect} from 'react'
import { Text, ScrollView, View , StyleSheet , Image } from 'react-native';
import { Card , Input ,CheckBox,Button, Icon }  from 'react-native-elements';
import * as SecureStore from 'expo-secure-store'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

class LoginTab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            remember : false
        }
    }
   
    componentDidMount() {
        SecureStore.getItemAsync('userInfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                console.log(userinfo)
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    handleLogin(){
            if (this.state.remember) {
                console.log(true)
                SecureStore.setItemAsync('userInfo' , JSON.stringify({username : this.state.username,password : this.state.password , remember : this.state.remember}))
            }else {
                SecureStore.getItemAsync('userInfo')
                .then((userdata) => {if (userdata){SecureStore.deleteItemAsync('userInfo'); console.log(userdata)} 
                     else 
                     console.log(false)
                })            
                
                
             
            }
    }
    render() {
 
        return(
            <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                containerStyle={styles.formInput}
                />
            <CheckBox title="Remember Me"
                center
                checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox}
                />
            <View style={styles.formButton}>
                <Button
                    onPress={() => this.handleLogin()}
                    title="Login"
                    color="#512DA8"
                    icon={<Icon name='sign-in' type='font-awesome' size={24} color='white' />}
                    buttonStyle={{backgroundColor : '#512DA8'}}
                    />
            </View>
            <View style={styles.formButton}>
                <Button
                   onPress={() => this.props.navigation.navigate('Registre')}
                    title="Register"
                    color="#DDD"
                    icon={<Icon name='user-plus' type='font-awesome' size={24} color='#00F' />}
                    buttonStyle={{backgroundColor : null}}
                    titleStyle={{color : '#00F'}}
                    />
            </View>
        </View>
        )
    }
}

class RegisteTab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: 'C:\Users\chamsou\Desktop\Drawer\chamsou.jpg'
        }
    }
   
    componentDidMount() {
        SecureStore.getItemAsync('userInfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                console.log(userinfo)
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    handleLogin(){
            if (this.state.remember) {
                console.log(true)
                SecureStore.setItemAsync('userInfo' , JSON.stringify({username : this.state.username,password : this.state.password , remember : this.state.remember}))
            }
            }

            getImageFromCamera = async () => {
                const Camrepermission = await Permissions.askAsync(Permissions.CAMERA)
                const CameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
                if (Camrepermission.status === 'granted' && CameraRollPermission.status === 'granted' ) {
                    const ImageCapture = ImagePicker.launchCameraAsync({ //launchImageLibraryAsync({
                        allowsEditing : true ,
                        aspect : [4,3]
                    })
                    if (! (await ImageCapture).cancelled) {
                        this.processImage((await ImageCapture).uri);
                    }
                }
            }
            getImageFromgallerie = async () => {
                const Camrepermission = await Permissions.askAsync(Permissions.CAMERA)
                const CameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
                if (Camrepermission.status === 'granted' && CameraRollPermission.status === 'granted' ) {
                    const ImageCapture = ImagePicker.launchImageLibraryAsync({
                        allowsEditing : true ,
                        aspect : [4,3]
                    })
                    if (! (await ImageCapture).cancelled) {
                        this.processImage((await ImageCapture).uri);
                    }
                }
            }
            processImage = async (imageUri) => {
                console.log(imageUri)
                let processedImage = await ImageManipulator.manipulateAsync(
                    imageUri, 
                    [
                        {resize: {width: 400}}
                    ],
                    {format: 'png'}
                );
                console.log(processedImage);
                this.setState({imageUrl: (await processedImage).uri });
        
            }
    render() {
 
        return(
            <ScrollView>
            <View style={styles.container}>
            <View style={styles.imageContainer}>
                    <Image 
                        source={{uri : this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        buttonStyle={{marginRight : 10}}
                        />
                        <Button
                        title="Gallerie"
                        onPress={this.getImageFromgallerie}
                        buttonStyle={{marginLeft : 10}}
                        />
                </View>
                    <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
              
            <CheckBox title="Remember Me"
                center
                checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox}
                />
            <View style={styles.formButton}>
                <Button
                    onPress={() => this.handleLogin()}
                    title="Registre"
                    color="#512DA8"
                    icon={<Icon name='user-plus' type='font-awesome' size={24} color='white' />}
                    buttonStyle={{backgroundColor : '#512DA8'}}
                    />
            </View>
        </View>
        </ScrollView>
        )
    }
}

const Tab = createBottomTabNavigator()
const Login = () => {
    return(
        <Tab.Navigator 
         tabBarOptions={{
            activeBackgroundColor: '#9575CD',
            inactiveBackgroundColor: '#D1C4E9',
            activeTintColor: '#ffffff',
            inactiveTintColor: 'gray',
            labelStyle: {
                marginBottom : 6
            }
         }}>
            <Tab.Screen name='Login' component={LoginTab}  options={{tabBarIcon : ({focused}) => {
        let color = focused ? 'tomato' : null ;
      return <Icon name='sign-in' type='font-awesome' size={24} color={color} />
      }}} />
            <Tab.Screen name='Registre' component={RegisteTab}  options={{tabBarIcon : ({focused}) => {
        let color = focused ? 'tomato' : null ;
      return <Icon name='user-plus' type='font-awesome' size={24} color={color} />
      }}} />

        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent : 'center'
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;