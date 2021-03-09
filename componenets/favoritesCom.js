
import React, { Component } from 'react';
import { StyleSheet, Text, View , Alert,ScrollView,  FlatList } from 'react-native';
import {Card, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { deleteFavorite } from '../redux/actioncreator';
import Swipeout from 'react-native-swipeout'
import * as Animatable from 'react-native-animatable'


class Favorite extends Component {
    render(){
        const {navigate} = this.props.navigation
        
        const RenderFavItem = ({item , index}) => {
            const rightButton = [
                {
                    text : 'Delete' ,
                    type : 'delete',
                    onPress : () => {
                        Alert.alert(
                            'Delete Favorite' ,
                            'Are you sure you wish to delete thie favorite dishe ' + item.name + ':\ ?',
                            [
                                {
                                    text : 'cancel' ,
                                    onPress : () => console.log(item.name  + ' No deleted'),
                                    style : 'cancel'
                                },
                                {
                                    text : 'Ok',
                                    onPress : () => { this.props.deleteFavorite(item.id) },
    
                                }
                            ],
                            {cancelable : false}
                        )
                    } 
                }
            ]
            return(
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                <Swipeout right={rightButton} autoClose={true}>
                <ListItem 
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => {navigate('Dishdetail',{dishId : item.id})}}
                />
                </Swipeout>
                </Animatable.View>

            )
        }
      
        return(
            
                 <FlatList 
                data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(fav => fav === dish.id))}
                keyExtractor={item => item.id.toString()}
                renderItem={RenderFavItem}

                 />
           
        )
    }
}
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites : state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    deleteFavorite : (dishId) => dispatch(deleteFavorite(dishId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Favorite) ;

