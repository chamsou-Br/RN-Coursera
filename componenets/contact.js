import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card , Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable'
import * as MailComposer from 'expo-mail-composer'
import * as Permissions from 'expo-permissions'

function Contact () {


    const SendEmail = () => {
        MailComposer.composeAsync({
            recipients : ['chamseddineb07@gmail.com'],
            subject : 'Enquiry',
            body : 'to whom it may concerne'
        })
    };
            return(
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000} >
                <Card 
                title='Contact Information'
                    >
                    <Text style={{margin: 10}} >
                        121, Clear Water Bay Road
                    </Text>
                    <Text style={{margin: 10}} >
                        Clear Water Bay, Kowloon HONG KONG
                    </Text>
                    <Text style={{margin: 10}} >
                        Tel: +852 1234 5678
                    </Text>
                    <Text style={{margin: 10}} >
                        Fax: +852 8765 4321
                    </Text>
                    <Text style={{margin: 10}} >
                    Email:confusion@food.net
                    </Text>
                        
                </Card>
                <Button 
                    title='Send Mess' 
                    buttonStyle={{backgroundColor : '#512DA8'}}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={() => SendEmail()}
                />
                </Animatable.View>
            );
}

export default Contact
