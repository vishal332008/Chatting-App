import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import {auth,db} from '../Fire';

export default class Updating extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            imageurl1:"",
            imageUrl:"https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-1024x1024.jpg"
        }
     }

     UpdatingName(){
        const update = {
            displayName: this.state.name
          };
          
          firebase.auth().currentUser.updateProfile(update);
          this.props.navigation.navigate("Chat");
     }

     updatingImage(){
        const update = {
            photoURL: this.state.imageUrl1,
          };
          
          firebase.auth().currentUser.updateProfile(update);
          this.props.navigation.navigate("Chat");
     }

     render(){
        return(
            <ImageBackground source={require("../assets/back.png")} style={{flex:1,width:'100%',height:"100%"}}>
                <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
                  <Text style={styles.title1}> ↓EDIT PROFILE↓ </Text> 

                    <TextInput style={styles.input}
                    placeholder= "Edit your name here"
                    placeholderTextColor="#8d4ed9"
                    value={this.state.name}
                    onChangeText={text=>this.setState({name:text})}/>

                    <TouchableOpacity style={styles.button} onPress={()=>this.UpdatingName()}>
                    <Text style={styles.buttonText}>SAVE</Text>
                    </TouchableOpacity>

                    <TextInput style={styles.input}
                    placeholder= "Paste your Avatar Link here"
                    placeholderTextColor="#8d4ed9"
                    value={this.state.imageUrl1}
                    onChangeText={text=>this.setState({imageUrl1:text})}/>

                    <TouchableOpacity style={styles.button1} onPress={()=>this.updatingImage()}>
                    <Text style={styles.buttonText}>SAVE</Text>
                    </TouchableOpacity>
                    </ScrollView>
            </ImageBackground>
        )
     }
    }

    const styles = StyleSheet.create({
        container: {
            alignItems:"center",
            
        },
        title1:{
            fontSize:40,
            color:"gold",
            textAlign:"center",
            fontWeight:"bold",
            borderWidth:3,
            borderRadius:25,
            marginTop:100
    
        },
        title2:{
            fontSize:20,
            color:"gold",
            textAlign:"center",
            fontWeight:"bold",
            borderWidth:3,
            borderRadius:25,
            marginTop:100,
            marginBottom:70
    
        },
        input:{
            width:345,
            height:70,
            padding:20,
            backgroundColor:"#e8e4ed",
            borderRadius:5,
            marginTop:40
        },
        button:{
            width:140,
            height:50,
            borderRadius:10,
            marginTop:30,
            backgroundColor:"#0f0757",
        },
        button1:{
            width:140,
            height:50,
            borderRadius:10,
            marginTop:30,
            backgroundColor:"#0f0757",
            marginBottom:70
        },
        buttonText:{
            fontSize:23,
            color:"#e8e4ed",
            textAlign:"center",
            marginTop:7
        }
    })