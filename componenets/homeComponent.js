import React, { Component } from 'react';
import { Text, ScrollView, View , Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { Easing } from 'react-native-reanimated';

function RenderItem(props) {
    
        const item = props.item;
        
        if (item != null) {
            return(
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={require('./images/uthappizza.png')}>
                    <Text
                        style={{margin: 10}}>
                        {item.description}</Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dishes: DISHES,
          promotions: PROMOTIONS,
          leaders: LEADERS
        };
        this.AnimatedValue = new Animated.Value(0);
    }
    Animate() {
        this.AnimatedValue.setValue(0);
        Animated.timing(this.AnimatedValue , { 
            toValue : 8 ,
            duration : 8000,
            easing : Easing.linear,
            useNativeDriver : true
        }).start(()=> this.Animate())
    }
    componentDidMount(){
        this.Animate()
    }

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        const xpos1 = this.AnimatedValue.interpolate({
            inputRange : [0,1,3,5,8],
            outputRange : [1200,600,0,-600,-1200]
        })
        const xpos2 = this.AnimatedValue.interpolate({
            inputRange : [0,2,4,6,8],
            outputRange : [1200,600,0,-600,-1200]
        })
        const xpos3 = this.AnimatedValue.interpolate({
            inputRange : [0,3,5,7,8],
            outputRange : [1200,600,0,-600,-1200]
        })
        
        return(
            <View style={{flex : 1 , flexDirection : 'row', justifyContent : 'center'}}>
                <Animated.View style={{width : '100%' , transform : [{translateX : xpos1}]}}>
                    <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} />   
                </Animated.View>

                <Animated.View style={{width : '100%' , transform : [{translateX : xpos2}]}}>
                    <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} />
                </Animated.View>

                <Animated.View style={{width : '100%' , transform : [{translateX : xpos3}]}}>
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} />
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

export default connect(mapStateToProps)(Home)
