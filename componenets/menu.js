import React, { Component } from 'react';
import { StyleSheet, Text, View ,   FlatList} from 'react-native';
import  { ListItem ,Avatar } from 'react-native-elements'
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import { DISHES } from '../shared/dishes';
import * as Animatable from 'react-native-animatable'


class Menu extends Component {
    constructor(props) {
        super(props) ;
        this.state = {
            dishes : DISHES
        }
    }
    static navigationOptions = {
        title : 'Menu'
    }
    render() {
        const { navigate } = this.props.navigation
         
    const RenderMenuItem = ({item ,index}) => {
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000} >
            <ListItem key={item.name} bottomDivider onPress={() => {navigate('Dishdetail',{dishId : item.id})}}>
                    <Avatar source={require('./images/elaicheesecake.png')} />
                    <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
            </ListItem>
            </Animatable.View>
        )
    }

    return(
            <FlatList  
            data={this.props.dishes.dishes}
            renderItem={RenderMenuItem}
            keyExtractor={(item) => item.id.toString()}
        />
    )
    }
   
}
const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }
export default connect(mapStateToProps)(Menu) ;