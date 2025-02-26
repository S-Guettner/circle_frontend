import {TouchableOpacity, Linking, View, Text ,StyleSheet,Image,ScrollView} from 'react-native'
import React, { useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostLink from '../auth/components/PostLink';
import { StatusBar } from 'react-native';

const Profile = () => {

    const [renderMode,setRenderMode] = useState("profile")
    console.log(renderMode)
    const [postId,setPostId] = useState()
    console.log(postId)



    const [profileData,setProfileData] = useState([])
    const [profileId,setProfileId] = useState()

    const [posts,setPosts] = useState([])


        const handlePress = () => {
        Linking.openURL(`${profileData?.website}`);
        };

       useEffect(() => {
        const getUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userID');
                const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/get-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        /******************************************* ändern zu userId variable !!!! ***********************************************************************************************/
                        userId: "645e3976d3ae8d816b2367d3",
                    }),
                })
                const userData = await response.json();
                   if(userData) console.log(userData)
                    setProfileData(userData);
                    /* setProfileId(userID) */
                    setPosts(userData?.posts)
                    
                
                

                
            } catch (error) {
                console.log(error);
            }
        };
        
        getUserData();
    }, [])
    
    /* console.log(profileId) */
    
    console.log(profileData.followerList)
  /*   console.log("profileData?.posts:", profileData?.posts); */
    /* console.log("profileData?.posts.length:", profileData?.followingList?.length); */
    return (
        <View style={styles.pageContainer}>
            <View style={styles.navBar}>
                <Image source={require('../assets/img/logoSmall.png')}/>
                <Text style={styles.navBarText}>{profileData?.userName}</Text>
            </View>
            <View style={styles.profileContainer}>
                <Image style={styles.imageProfile} source={{ uri: profileData?.avatarMidsize }} />
                <Text style={styles.userName}>{profileData?.fullName}</Text>
                <Text style={styles.jobTitle}>{profileData?.jobTitle}</Text>
                <Text style={styles.userDescription}>{profileData?.profileCaption}</Text>
{/*                     <TouchableOpacity onPress={handlePress}>
                <Text style={styles.websiteLink}>{profileData?.website}</Text>
                    </TouchableOpacity> */}
            </View>

            <View style={styles.userStatsContainer}>
                
                <View style={styles.userStats}>
                    <Text style={styles.statsText}>{profileData?.posts?.length}</Text>
                    <Text style={styles.statsDescription}>Posts</Text>
                </View>
                
                <View style={styles.statsBorder}>
                    <Text style={styles.statsText}>{profileData?.followerList?.length.toString()}</Text>
                    <Text style={styles.statsDescription}>Followers</Text>
                </View>
                
                <View style={styles.userStats}>
                    <Text style={styles.statsText}>{profileData?.followingList?.length}</Text>
                    <Text style={styles.statsDescription}>Following</Text>
                </View>

              
            </View>

              <ScrollView   showsVerticalScrollIndicator={false} overScrollMode="always"  style={styles.postsContainer} >
            <View style={styles.postLinkContainer}>
                {posts.map((post) => {
                    return(
                        
                        <PostLink
                        key={post._id}
                        postImage={post.postImage}
                        postId={post._id}
                        setRenderMode={setRenderMode}
                        setPostId={setPostId}
                        />
                        
                        
                        )
                    })}
            </View>
                    </ScrollView>
            
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    postsContainer:{
        
       height: 600
 
        
/*         gap:5,
        justifyContent:"flex-start",
        flexWrap:"wrap" */
        
    },
    postLinkContainer:{
      /*   height:110,
        width:110,
        borderRadius:10, */
        gap:10,
        flexDirection:"row",
        flexWrap:"wrap",
        paddingTop:20,
        justifyContent:"center"
       
    },
    navBar:{
        
        flexDirection:"row",
        alignItems:"center"
    },
    navBarText:{
        marginLeft:15,
        fontWeight:"700",
        fontSize:17
    },
    pageContainer:{
        paddingLeft:25,
        paddingRight:25
    },
    imageProfile: {
        width: 170,
        height: 170,
        borderRadius: 200,
        marginRight: "auto",
        marginLeft:"auto",
        marginTop:15,
        marginBottom:10

    },
    jobTitle:{
        marginBottom:35,
        textAlign:"center",
        fontWeight:"bold"
    },
    userDescription:{
        marginBottom:35,
        textAlign: 'center',
        fontWeight:"500"
        
    },
    userName:{
        fontWeight:"bold",
        fontSize:25,
        marginBottom:5,
        textAlign:"center"
        
    },
    profileContainer:{
        paddingLeft:30,
        paddingRight:30
    },
    websiteLink:{
        color:"#799df9",
        fontWeight:"bold",
        fontSize:12,
        marginBottom:20
    },
    userStatsContainer:{
        
        flexDirection:"row",
        
        justifyContent:"center",
        paddingBottom:20,
        borderBottomWidth:1,
        borderBottomColor:"lightgrey",
        /* marginBottom:10 */

    },
    userStats:{
        textAlign:'center',
    },
    statsBorder:{
        borderLeftWidth:1,
        borderRightWidth:1,
        borderLeftColor:"lightgrey",
        borderRightColor:"lightgrey",
        textAlign:'center',
        paddingLeft:40,
        paddingRight:40,
        marginLeft:40,
        marginRight:40
    },
    statsText:{
        fontSize:21,
        fontWeight:"bold",
        textAlign:"center"
    },
    statsDescription:{
        fontSize:15
    }

}); 