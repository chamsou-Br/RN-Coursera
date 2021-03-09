import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,Picker, Switch, Button ,Modal , Alert , Animated} from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker  from 'react-native-datepicker'
import { Easing } from 'react-native-reanimated';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import * as SimpleReactCalendar from 'simple-react-calendar'
import * as Calendar from 'expo-calendar'

class Reservation  extends Component {

    constructor(props){
        super(props);
        this.Animated = new Animated.Value(0);
    }


    Animate() {
        Animated.timing(this.Animated , {
            toValue : 1,
            duration : 500,
            useNativeDriver : true,
            easing : Easing.linear
        }).start()
    }
    componentDidMount(){
        this.Animate()
    }
        
          state = {
            guest : 1,
            smoking : false ,
            date : '',
            showModal : false,
            
            
        }

        createCalanderEvent = async () => {
            const CalandrePermission = await Permissions.askAsync(Permissions.CALENDAR)
            console.log(true)
            if (CalandrePermission.status === 'granted' ) {
                console.log(Permissions)
                    const caleve = await Calendar.createEventAsync("1",
                    {title:'Con Fusion Table Reservation',
                    startDate: this.state.date,
                    endDate: new Date(Date.parse(this.state.date) + 2 ),
                    location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'})
                Calendar.openEventInCalendar(caleve)
                console.log(caleve)
            }
        }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    resetForm() {
        this.setState({
            guest: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }
    handleReservation(res) {
        Alert.alert(
            'Your Reservation Ok ?' ,
            'Number of Guestes ' + res.geust + '. /n Smoking : ' + res.smoking + '/n Date and Time : ' + res.date + '.',
            [
                {
                    text : 'cancel' ,
                    onPress : () => this.resetForm(),
                    style : 'cancel'
                },
                {
                    text : 'Ok',
                    onPress : () => { 
                        this.presentLocalNotification(this.state.date)
                        this.resetForm() ;
                    this.createCalanderEvent()},

                }
            ],
            {cancelable : false}
        )
    }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.setNotificationHandler({
            handleNotification: async () => {
              return {
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
              };
            },
          });
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                
                sound: true,
                
            },
            android: {
                sound: true,
                vibrate: true,
                color : 'red'
                
            }
        });
    }
    

  
    render() {
        const xpos = this.Animated.interpolate({
            inputRange : [0,1],
            outputRange : [0,1]
        })
        return(
            <Animated.View style={{transform : [{scale : xpos}]}}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}> Number of Guests</Text>
                    
                    <Picker 
                        style={styles.formItem}
                        selectedValue={this.state.geust}
                        onValueChange={async (itemVal , itemIndex) => await this.setState({geust : itemVal})}
                        >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}> Smoking/No-Smoking</Text>
                    <Switch

                        value={this.state.smoking}
                        style={styles.formItem}
                        onValueChange={(value) => this.setState({smoking : value})}
                        trackColor='#512DA8'
                    
                    >
                    </Switch> 
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}> Date</Text>
                    <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2017-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys. 
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>

                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation({date : this.state.date , geust : this.state.geust , smoking : this.state.smoking})}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.geust}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});
export default Reservation