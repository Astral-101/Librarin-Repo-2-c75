import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import db from "../config";

export default class LogInScreen extends React.component {
    constructor(){
        super();
        this.state = {
            emailID: "",
            passcode: ""
        }
    }

    login = async(email, password)=>{
        if(email && password){
            try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            if(response){
                this.props.navigation.navigate('TransactionScreen')

            }
                
            }

            catch(error){
                switch(error.code){
                    case "auth/user-not-found" : alert("User Does Not Exist");

                    console.log("Does Not Exist");

                    break;

                    case "auth/invalid-email" : alert("Incorrect Email/Password")

                    console.log("Invalid")

                    break;

                    

                    
                }

            }
            
        }

        else {
            alert("Enter Email Address and Password");
        }



    }

    render(){
        return(
            <KeyboardAvoidingView>
                <TextInput 
                
                placeholder = "Enter Your Email ID Here"
                keyboardType = "email-address"
                style = {styles.logInInput}
                onChangeText = {(text)=>{
                    this.setState({
                        emailID : text
                    })
                }}
                
                />

                <TextInput 
                
                placeholder = "Enter Your Password Here"
                secureTextEntry = {true}
                style = {styles.logInInput}
                onChangeText = {(text)=>{
                    this.setState({
                        passcode : text
                    })
                }}
                
                />

                <View>
                    <TouchableOpacity
                    onPress = {()=>{
                        this.login(this.state.email, this.state.password)
                    }}
                    
                    >
                        <Text>
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>


                
            </KeyboardAvoidingView>
            
            

        ) 
    }
}

const styles = StyleSheet.create({
    logInInput: {
        width: 350,
        height: 40,
        fontSize: 20,
        margin: 20,
        padding: 10,
        borderWidth: 10,
        borderRadius: 6,
        borderColor: "black"
    }
})