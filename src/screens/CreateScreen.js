import React, { useState, useRef } from 'react'
import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { THEME } from '../theme'
import { useDispatch } from 'react-redux' 
import { addPost } from '../store/actions/post'
import { PhotoPicker } from '../components/PhotoPicker'

export const CreateScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const imgRef = useRef()

   

    const saveHandler = ()=>{
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: imgRef.current,
            booked: false
        }
        dispatch(addPost(post))
        navigation.navigate('Main')
    }


    const photoPickHandler = uri =>{
        imgRef.current = uri
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={()=>{ Keyboard.dismiss() }} >
                    <View style={styles.wrapper}> 
                        <Text style={styles.title}>CreateScreen</Text>
                        <TextInput 
                        style={styles.textarea} 
                        placeholder="Введите текст заметки" 
                        value={text} 
                        onChangeText={setText}   
                        multiline
                        />
                       <PhotoPicker onPick={photoPickHandler} />
                        <Button  
                        title="Создать пост"  
                        color={THEME.MAIN_COLOR} 
                        onPress={saveHandler}  
                         
                        />
                    </View>
            </TouchableWithoutFeedback>    
        </ScrollView>
    )
}

CreateScreen.navigationOptions = ({ navigation })=> ({
    headerTitle: 'Создать пост12',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent = { AppHeaderIcon }>
            <Item title="Toggle Drawer" 
            iconName="ios-menu" 
            onPress={()=>{ navigation.toggleDrawer() }} />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
            wrapper: {
                padding:10
            }, 
            title: {
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'open-regular',
                marginVertical: 10
            },
            textarea: {
                padding: 10,
                marginBottom: 10
            }
})