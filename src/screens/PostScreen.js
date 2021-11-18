import React,{ useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { THEME } from '../theme'
import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useDispatch, useSelector  } from 'react-redux'
import { toggleBooked, removePost } from '../store/actions/post'


export const PostScreen = ({ navigation }) =>{
    const postId = navigation.getParam('postId');
    const dispatch = useDispatch()
    const booked = useSelector(state=>state.post.bookedPosts.some(post=>post.id===postId))

    const post = useSelector(state=>state.post.allPosts.find(post=>post.id===postId))
    

    useEffect(()=>{
        navigation.setParams({booked })
    },[booked])

    const togglehandler = useCallback(() =>{
        dispatch(toggleBooked(post))
    },[dispatch, post])

    useEffect(()=>{
        navigation.setParams({togglehandler })
    },[togglehandler])

    const removeHandler = ()=>{
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить?",
            [
              {
                text: "Отменить",
                style: "cancel"
              },
              { text: "Да", style: 'destructive', onPress: () => {
                         navigation.navigate('Main')   
                        dispatch(removePost(postId))
              } }
            ],
            {cancelable: false}
          );
    } 

    if(!post){
        return  null;
    }

    return (
            <ScrollView> 
                <Image source={{uri: post.img}}  style={styles.image} />
                <View style={styles.textWrap} >
                    <Text style={styles.title} >
                            {post.text}
                    </Text>
                </View>
                <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={removeHandler}  />
            </ScrollView>
    )
}

PostScreen.navigationOptions = ({ navigation } )=> {
       const date = navigation.getParam('date'); 
       const booked = navigation.getParam('booked');
       const togglehandler = navigation.getParam('togglehandler');
       const iconName = booked ? 'ios-star' : 'ios-star-outline'
    return {
        headerTitle: `Пост номер ${new Date(date).toLocaleDateString()}`,
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent = { AppHeaderIcon } >
                <Item 
                title="Take Photo" 
                iconName={iconName} 
                onPress={togglehandler} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: '100%',
        height: 200
    },
    textWrap:{
        padding: 10
    },
    title:{
        color: '#000',
        fontFamily: 'open-regular'
    }
})