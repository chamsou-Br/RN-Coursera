import React, { Component } from 'react';
import { StyleSheet, Text, View ,Platform, SafeAreaView , ScrollView , Image} from 'react-native';
import {Icon} from 'react-native-elements'
import Menu from './menu'
import DisheDetail from './DishdetailComponenet'
import {DISHES } from '../shared/dishes';
import {createStackNavigator  } from '@react-navigation/stack';
import {createDrawerNavigator , DrawerItemList } from '@react-navigation/drawer'
import { NavigationContainer  } from '@react-navigation/native';
import Home from './homeComponent';
import Contact from './contact';
import Aboutus from './about';
import {configerStore} from '../redux/configurStore'
import {connect, Provider} from 'react-redux'
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/actioncreator';
import Reservation from './ReservationCom';
import favoritesCom from './favoritesCom';
import Login from './loginCom';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const stack = createStackNavigator()
const MenuNavigator =({navigation}) => {
    return(
        <stack.Navigator screenOptions={{
          headerTintColor : '#fff',
          headerTitleStyle: {
            color: "#fff"            
        },
        headerStyle : {
            backgroundColor : "#512DA8"
        }
        }}>
            <stack.Screen name='Menu' component={Menu} options={{headerLeft : () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />}} />
            <stack.Screen name='Dishdetail' component={DisheDetail} />
        </stack.Navigator>
    )
} 
const HomeNavigator =({navigation}) => {
    return(
        <stack.Navigator screenOptions={{
          headerTintColor : '#fff',
          headerLeft : () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} /> ,
          headerTitleStyle: {
            color: "#fff"            
        },
        headerStyle : {
            backgroundColor : "#512DA8"
        }
        }}>
            <stack.Screen name='Home' component={Home} />
        </stack.Navigator>
    )
} 
const ContactNavigator =({navigation}) => {
    return(
        <stack.Navigator screenOptions={{
          headerTintColor : '#fff',
          headerLeft : () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} /> ,
          headerTitleStyle: {
            color: "#fff"            
        },
        headerStyle : {
            backgroundColor : "#512DA8"
        }
        }}>
            <stack.Screen name='Contact' component={Contact} />
        </stack.Navigator>
    )
} 
const AboutNavigator =({navigation}) => {
    return(
        <stack.Navigator screenOptions={{
          headerTintColor : '#fff',
          headerLeft : () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} /> ,
          headerTitleStyle: {
            color: "#fff"            
        },
        headerStyle : {
            backgroundColor : "#512DA8"
        }
        }}>
            <stack.Screen name='About' component={Aboutus} />
        </stack.Navigator>   
    )
} 
const LoginNavigator =({navigation}) => {
  return(
      <stack.Navigator screenOptions={{
        headerTintColor : '#fff',
        headerLeft : () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} /> ,
        headerTitleStyle: {
          color: "#fff"            
      },
      headerStyle : {
          backgroundColor : "#512DA8"
      }
      }}>
          <stack.Screen name='Login' component={Login} />
      </stack.Navigator>   
  )
}
const ReservationNavigator =({navigation}) => {
  return(
      <stack.Navigator screenOptions={{
        headerTintColor : '#fff',
        headerLeft : () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} /> ,
        headerTitleStyle: {
          color: "#fff"            
      },
      headerStyle : {
          backgroundColor : "#512DA8"
      }
      }}>
          <stack.Screen name='Resevation' component={Reservation} />
      </stack.Navigator>   
  )
} 

const FavoritesNavigator =({navigation}) => {
  return(
      <stack.Navigator screenOptions={{
        headerTintColor : '#fff',
        headerTitleStyle: {
          color: "#fff"            
      },
      headerStyle : {
          backgroundColor : "#512DA8"
      }
      }}>
          <stack.Screen name='Favorite' component={favoritesCom} options={{headerLeft : () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />}} />
          <stack.Screen name='Dishdetail' component={DisheDetail} />
      </stack.Navigator>
  )
} 
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
  );

const Drawer = createDrawerNavigator()
const MainNavigator = () => {
    return(
        <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
        drawerStyle={{
            backgroundColor : '#D1C4E9'}}
        drawerContentOptions={{
                activeTintColor : '#FFF',
                inactiveTintColor : '#000',
                activeBackgroundColor : 'tomato'
            }}>
            <Drawer.Screen name='Login' component={LoginNavigator}options={{drawerIcon : ({activeTintColor , focused}) => 
            <Icon color={activeTintColor} name='login' type='font-awesome' size={24} />}} />
            <Drawer.Screen name='Home Navigator'  component={HomeNavigator} options={{drawerIcon : ({tintColor , focused}) => 
            <Icon color={tintColor} name='home' size={24} />}} />
            <Drawer.Screen name='Menu Navigator' component={MenuNavigator} options={{drawerIcon : ({tintColor , focused}) => 
            <Icon color={tintColor} name='list' type='font-awesome' size={24} />}} />
            <Drawer.Screen name='Contact us' component={ContactNavigator} options={{drawerIcon : ({tintColor , focused}) => 
            <Icon color={tintColor} name='address-card' type='font-awesome' size={24} />}} />
            <Drawer.Screen name='About us' component={AboutNavigator}options={{drawerIcon : ({activeTintColor , focused}) => 
            <Icon color={activeTintColor} name='info-circle' type='font-awesome' size={24} />}} />
            <Drawer.Screen name='Reservation' component={ReservationNavigator}options={{drawerIcon : ({activeTintColor , focused}) => 
            <Icon color={activeTintColor} name='cutlery' type='font-awesome' size={24} />}} />
            <Drawer.Screen name='Favorites' component={FavoritesNavigator}options={{drawerIcon : ({activeTintColor , focused}) => 
            <Icon color={activeTintColor} name='heart' type='font-awesome' size={24} />}} />

        </Drawer.Navigator>
    )
}

class Main extends Component {

 /* componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }*/
   
    render(){
         return (
            <NavigationContainer>

                     <MainNavigator />
          
           </NavigationContainer>
                
        )
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Main)


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });