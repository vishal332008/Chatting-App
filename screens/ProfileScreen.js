import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import {auth,db} from '../Fire';

const ProfileScreen=({navigation})=>{
        return(
            <ImageBackground source={require("../assets/back.png")} style={{flex:1,width:'100%',height:"100%"}}>
            <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
                
                <Avatar rounded style={{marginTop:30,width:250,height:250,borderRadius:'50%'}}source={{
                      uri:auth?.currentUser?.photoURL ?auth?.currentUser?.photoURL:this.state.imageUrl
                  }}/>
                <Text style={styles.title}> NAME : {auth?.currentUser?.displayName} </Text>
                
                <Text style={styles.title}> EMAIL : {auth?.currentUser?.email} </Text>

                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Updating")}>
                    <Text style={styles.buttonText}> EDIT PROFILE </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button1} onPress={()=>navigation.navigate("Chat")}>
                    <Text style={styles.buttonText}> BACK </Text>
                </TouchableOpacity>
                
            </ScrollView>
            </ImageBackground>
        )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        paddingVertical:20
        
        
    },
    title:{
        fontSize:40,
        color:"white",
        textAlign:"center",
        fontWeight:"bold",
        borderWidth:3,
        borderRadius:25,
        borderColor:"gold",
        marginTop:40

    },
    button:{
        width:140,
        height:100,
        borderRadius:10,
        borderWidth:3,
        borderColor:"gold",
        marginTop:50,
        backgroundColor:"#0f0757",
    },
    button1:{
        width:140,
        height:50,
        borderRadius:10,
        borderWidth:3,
        borderColor:"gold",
        marginTop:50,
        backgroundColor:"#0f0757",
        marginBottom:75
    },
    buttonText:{
        fontSize:30,
        color:"#e8e4ed",
        textAlign:"center",
        marginTop:7,
        fontWeight:"bold"
    }
})