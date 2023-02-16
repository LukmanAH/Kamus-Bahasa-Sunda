/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import SIZES,{API, ColorPrimary} from './utils/constanta';
import Icon from 'react-native-vector-icons/FontAwesome';

function App(){
    const [text, setText] = useState('');

    const [result, setResult] = useState([]);

    const searchWord = async () => {
        await fetch(API+text, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            if(text == ''){
            setResult(responseJson.words);
            }else{
              setResult(responseJson);
            }
            console.log(result);
        });
    }


    // const Item = ({data}) => (
    //     <View style={{flex:1, margin: 15, backgroundColor:'white'}}>
    //       <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', margin: 15}}>
    //         <Text style={{color:'black', margin:5}}>Loma</Text>
    //         <Text style={{color:'black', margin:5}}>{data.loma}</Text>
    //       </View>

    //       <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', margin: 15}}>
    //         <Text style={{color:'black', margin:5}}>Lemes(untuk orang lain)</Text>
    //         <Text style={{color:'black', margin:5}}>{data.batur}</Text>
    //       </View>

    //       <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', margin: 15}}>
    //         <Text style={{color:'black', margin:5}}>Lemes(untuk diri sendiri)</Text>
    //         <Text style={{color:'black', margin:5}}>{data.sorangan}</Text>
    //       </View>

    //       <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', margin: 15}}>
    //         <Text style={{color:'black', margin:5}}>Bahasa Inggris</Text>
    //         <Text style={{color:'black', margin:5}}>{data.english}</Text>
    //       </View>

    //       <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', margin: 15}}>
    //         <Text style={{color:'black', margin:5}}>arti</Text>
    //         <Text style={{color:'black', margin:5}}>{data.bindo}</Text>
    //       </View>
    //     </View>
    // );

    const Item = ({data}) => (
      <View style={{flex:1, padding:10, borderBottomColor:ColorPrimary, borderBottomWidth:1}}>
        {/* <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}> */}
          <Text style={{color:ColorPrimary, marginLeft:5, fontSize:24,}}>{data.loma}</Text>
          <Text style={{color:'black', marginLeft:5, fontSize:16,}}>{data.bindo}</Text>
        {/* </View> */}
      </View>
  );
    
   
    useEffect(()=>{
        searchWord();
    },[])

  return (
      <View style={styles.container}>
          <View style={{height:SIZES.height/4, justifyContent:'center', alignItems:'center'}}>
            <View style={{flex:2, marginTop:20, justifyContent:'center'}}>
              <Text style={{fontSize:30}}>Kamus Bahasa Sunda</Text>
            </View>
            <View style={{flexDirection:'row', margin: 15,backgroundColor:'white', height: 50, width:SIZES.width*0.93, alignItems:'center', justifyContent:'center'}}>
              <Icon name="rocket" size={30} color="#900" />
              <TextInput
                  maxLength={40}
                  onChangeText={text => setText(text)}
                  onChange={searchWord}
                  value={text}
                  placeholder="Input kata (bahasa indonesia/sunda/inggris)"
                  placeholderTextColor={'#b2bec3'}
                  style={{padding: 10, backgroundColor:'white', height: 50, width:SIZES.width*0.93-30, color:'black'}}
              />

              {/* <TouchableOpacity
                onPress={searchWord}
                style={{backgroundColor:'blue',width:SIZES.width/5, height: 50, justifyContent:'center', alignItems:'center'}}>
                  <Text>Cari</Text>
              </TouchableOpacity> */}
              </View>
          </View>
            
         
          <FlatList
              data={result[0]? result : [{loma:'Data Tidak Ditemukan', bindo:'Silahkan tanyakan pada orang sunda di sekitar anda.'}]}
              renderItem={({item}) => <Item data={item} />}
              showsHorizontalScrollIndicator={false}
              horizontal={false}  
              style={{flex:3, backgroundColor:'white'}}
          />
          
          
            
            

           
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: ColorPrimary,
  },
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: 'black'
  },
  TableText: { 
    margin: 10
  },
});

export default App;
