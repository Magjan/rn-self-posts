import React from 'react'
import { View, StyleSheet, FlatList, Text } from  'react-native'
import  {Post}  from './Post'


export const PostList  = ({ data, openPosthandler }) => {

    if(data.length === 0){
        return (
            <View style={styles.wrapper}>
                        <Text style={styles.noItem}>Постов пока нет</Text>
            </View>
        )
    }

return   (
            <View style={styles.wrapper}>
            <FlatList 
            data={data} 
            keyExtractor = {post=>post.id.toString()} 
            renderItem={({item})=><Post post = {item}  onOpen={openPosthandler} />}
            />
            </View>
)

}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        padding: 10
    },
    noItem: {
        fontFamily: 'open-bold',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    }
})