import {auth,db } from '../Fire';
import React, { useLayoutEffect, useState,useCallback,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , ImageBackground, Image, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import ProfileScreen from './ProfileScreen';

const ChatScreen=({navigation})=>{
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //   setMessages([
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ])
    // }, [])
    useLayoutEffect(()=>{
        const unsubscribe = db.collection('chats').orderBy('createdAt',
        'desc').onSnapshot(snapshot=>setMessages(
         
            snapshot.docs.map(doc=>({
              
                _id:doc.data()._id,
               createdAt:new Date(doc.data().createdAt.seconds*1000),
            text:doc.data().text,
           user:doc.data().user
            }))
        ))
        return unsubscribe;
       
    },[])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const{
          _id,
          createdAt,
          text,
          user
      } = messages[0]
      db.collection('chats').add({
        _id,
        createdAt,
        text,
        user
      })
    }, [])

    const signOut=()=>{
        firebase.auth().signOut()
        .then(() => {
           navigation.replace("Login")
          }).catch((error) => {
            // An error happened.
          });
          
    }
  useLayoutEffect(()=>{
      navigation.setOptions({
          headerLeft:()=>(
              <View style={{marginLeft:20}}>
                  <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                  <Avatar rounded style={{width:40,height:40,borderRadius:'50%'}}source={{
                      uri:auth?.currentUser?.photoURL ?auth?.currentUser?.photoURL:'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-1024x1024.jpg'
                  }}/>
                  </TouchableOpacity>
              </View>
          ),
          headerRight:()=>(
              
              <TouchableOpacity style={styles.logoutButton} onPress={()=>{signOut()}}>
                   <Icon name="logout" color="#0f0757" style={styles.icon}/>
                   <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
          )

          
      })

  })
    
        return (<View style={styles.container}>
            <ImageBackground source={require("../assets/background.jpg")} style={{flex:1,width:'100%',height:"100%"}}>
           
            <GiftedChat
                messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            showUserAvatar={true}
            renderUsernameOnMessage={true}
            user={{
                _id: auth?.currentUser?.email,
                name:auth?.currentUser?.displayName,
                avatar:auth?.currentUser?.photoURL
             }} 
    />     
            </ImageBackground>
            </View>
        );
    
}

export default ChatScreen;

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor: '#2c3e50',
        
    },
    header:{
     width:"100%",
     height:"10%",
     backgroundColor:"#ffffff",
    alignItems:"center",
     position:"absolute",
     top:0,
     flexDirection:"row",
     justifyContent:"center"
     
    },
    icon:{
        width:40,
        height:40,
       
    },
    logoutText:{
        fontSize:20,
        color:"#0f0757"
    },
    logoutButton:{
        width:140,
        height:40,
        borderRadius:10,
        borderWidth:2,
        borderColor:"#0f0757",
        flexDirection:"row",
        marginRight:20,
        alignSelf:"flex-end",
        position:"absolute",
        right:0,
        top:10,
        backgroundColor:"#aaabad"

    },
    title:{
        fontSize:15,
        color:"#0f0757",
        textAlign:"center",
        fontWeight:"bold",
        borderWidth:3,
        borderRadius:25

    },
    titleApp:{
        fontSize:30,
        color:"#0f0757",
        textAlign:"center",
        

    }, profilepic:{
        width:70,
        height:70,
        borderRadius:'50%',
        borderRadius:1,
        borderColor:"#0f0757",
        position:"absolute",
        left:0

    }
    

});



