import MaskedView from '@react-native-community/masked-view';
import React, { Component } from 'react';
import { StyleSheet, Text, View , ScrollView,  FlatList , Modal , Button ,Alert , TextInput , PanResponder , Share} from 'react-native';
import {Card , Icon ,Input,Rating} from 'react-native-elements'
import { connect } from 'react-redux';
import { postComment, postFavorite } from '../redux/actioncreator';
import * as Animatable from 'react-native-animatable'

const RendreDish = (props ) => {
    const dish = props.dish

    // panResponder
    const recognizeDrag = ({moveX , moveY ,  dx , dy }) =>  {
        console.log(moveX , moveY ,  dx , dy )
        if (dx < -200) 
            return true
        else 
            return false
    }
    const recognizeDrag2 = ({moveX , moveY ,  dx , dy }) =>  {
        console.log(moveX , moveY ,  dx , dy )
        if (dx > 200) 
            return true
        else 
            return false
    }
    handleViewRef = ref => this.View = ref

   const panResponder = PanResponder.create({
    onStartShouldSetPanResponder : (e , gestureState) => {
        return true
    },
    onPanResponderGrant : () => {
        this.View.rubberBand(1000).then(endstate => endstate.finished ? 'finished' : 'cancelled')
    },
    onPanResponderEnd : (e , gestureState) => {
        console.log(gestureState)
        if (recognizeDrag(gestureState)) {
            Alert.alert( 
                'Add Favorite',
                'Are you sure you wish to add' + dish.name + ' to favirites ?',
                [
                    {
                            text : 'cancel' ,
                            onPress : () => console.log('CancelPressed'),
                            style:'cancel'
                    },
                    {       text : 'ok' ,
                            onPress : () => props.onPress()

                    }
                ],
                {
                    cancelable : false
                }
            )
            return true;
        }
        else if (recognizeDrag2(gestureState)) {
           props.toogleModal()
            return true;
        }}
})

    // share in autre app
        const ShareDishe = (title , message , url) => {
            Share.share({
                title:title,
                message : message,
                url : url,
                
            }, {
                dialogTitle : 'Share ' + title 
            })
        }
        

    if (dish) { 
        return(
            <Animatable.View animation='fadeInDown'  duration={2000} 
            ref={this.handleViewRef}
            {...panResponder.panHandlers}
            >
            <Card featuredTitle={dish.name}
              
            >
            <Card.Image source={require('./images/elaicheesecake.png')} />
                 <Text >
                    {dish.description}
                 </Text>
                 <View style={{flexDirection : 'row',justifyContent : "center"}}>
                 <Icon
                 raised
                 reverse
                 name={props.favorite ? 'heart' : 'heart-o'}
                 type='font-awesome'
                 color='#f50' 
                 onPress={() =>{console.log(props.favorites),
                 props.onPress()} }
                 />
                 <Icon 
                    raised
                    reverse
                     name='pencil'
                     type='font-awesome'
                     color='#6A5ACD'
                     onPress={()=> props.onModal()}
                 />
                 <Icon
                 raised
                 reverse
                 name='share'
                 type='font-awesome'
                 color='#51D2A8' 
                 onPress={() => ShareDishe(dish.name , dish.description , 'http://localhost:19002/') }
                 />
                 </View>
                
            </Card>
            </Animatable.View>
        )
    }else {
        return(
            <View></View>
        )
    }
};
function RenderComment(props) {
    const comments = props.comments 

    const RenderCommentItem = ({item , index}) => {
        return(
            <View key={index} style={{margin : 10}} >
                <Text style={{fontSize : 14}}> {item.comment} </Text>
                <Text style={{fontSize : 12}}> {item.rating} stars </Text>
                <Text style={{fontSize : 12}}> {'__' + item.author + ', ' + item.date} </Text>
            </View>
        )
    }

    return(
        <Animatable.View animation='fadeInUp' duration={2000} >
        <Card title='comments' >
        
          
            <FlatList 
                data={comments}
                renderItem={RenderCommentItem}
                keyExtractor={item => item.id.toString() }
            />
          
        </Card>
        </Animatable.View>
    )

}
class DishDetail extends Component {

    state = {
        showModal : false,
        author : '',
        id : Math.random(),
        dishId : this.props.route.params.dishId,
        rating : 0,
        comment :'',
        date : '29/11/2020'
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }
    static navigationOptions = {
        title: 'Dishdetail'
    };
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    ADDCommentFunc = async () => {
        console.log('//////' + this.state)
        const comment = {
            author : this.state.author,
            id : this.state.id,
            dishId : this.state.dishId,
            comment : this.state.comment,
            rating : this.state.rating,
            date : this.state.date
        }
      await  this.props.postComment(comment)
        this.setState({comment : '',author : '',rating :0})
        this.toggleModal()
    }
    render(){
        const dishId = this.props.route.params.dishId
        
        return(
            <ScrollView>
                <RendreDish dish={this.props.dishes.dishes[+dishId]}
                onPress={()=> this.markFavorite(dishId)} 
                toogleModal={() => this.toggleModal()}
                favorite={this.props.favorites.some(el => el === dishId)}
                favorites={this.props.favorites}
                onModal={()=> this.toggleModal()}
                />
                <RenderComment comments={this.props.comments.comments.filter(com => com.dishId === dishId )} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View
                     style = {styles.modal}>   
                    <Rating
                        type='heart'
                        ratingCount={5}
                        ratingColor='tomato'
                        ratingTextColor='tomato'
                        imageSize={60}
                        showRating
                        onFinishRating={async(rating) => await this.setState({rating : rating})}
                        />
                
                        <TextInput
                        
                        style={{width : 300 ,
                                    height : 40 ,
                                    fontSize : 16 ,
                                    paddingHorizontal : 15 ,
                                    marginHorizontal:20,
                                    marginBottom : 20 ,
                                    borderBottomWidth : 1 ,
                                    borderBottomColor : '#BBB' ,
                                    borderTopWidth : 1 ,
                                    borderTopColor : '#BBB' ,
                                    borderRightWidth : 1,
                                    borderRightColor : '#BBB' ,
                                    borderLeftWidth : 1,
                                    borderLeftColor : '#BBB' ,
                                    borderRadius : 10,
                                    marginTop : 20}}
                            placeholder='author'
                            value={this.state.author}
                            onChangeText={(value)=> this.setState({author : value})}
                        />
                        <TextInput
                            style={{width : 300 ,
                                    height : 40 ,
                                    fontSize : 16 ,
                                    paddingHorizontal : 15 ,
                                    marginHorizontal:20,
                                    marginBottom : 20 ,
                                    borderBottomWidth : 1 ,
                                    borderBottomColor : '#BBB' ,
                                    borderTopWidth : 1 ,
                                    borderTopColor : '#BBB' ,
                                    borderRightWidth : 1,
                                    borderRightColor : '#BBB' ,
                                    borderLeftWidth : 1,
                                    borderLeftColor : '#BBB' ,
                                    borderRadius : 10}}
                            placeholder='Comment'
                            value={this.state.comment}
                            onChangeText={(value)=> this.setState({comment : value})}
                        />
                    <View style={{marginBottom : 15}}>
                    <Button 
                            color="#512DA8"
                            title="Add Comment" 
                            onPress={()=> this.ADDCommentFunc()}
                            />  
                    </View> 
                    <View>
                    <Button 
                            onPress = {() =>{this.toggleModal()}}
                            color="#512DA8"
                            title="Cancel" 
                            />
                    </View>                    
                        
                    </View>
                </Modal>
            </ScrollView>
            
            
        )
    }

}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
})
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites : state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment : (comment) =>  dispatch(postComment(comment))
})

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail)