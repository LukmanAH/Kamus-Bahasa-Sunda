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

function App(){
    const [text, setText] = useState('');

    const [result, setResult] = useState();

    const searchWord = async () => {
        await fetch('https://hibersunda-production.up.railway.app/undakusukbasa/'+text, {
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
      <View style={{flex:1, margin: 5, backgroundColor:'white'}}>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', margin: 15}}>
          <Text style={{color:'black', margin:5}}>{data.loma}</Text>
          <Text style={{color:'black', margin:5}}>{data.bindo}</Text>
        </View>
      </View>
  );
    

    useEffect(()=>{
        searchWord();
    },[])

  return (
      <View style={styles.container}>
            <Text>Kamus Bahasa Sunda</Text>
            <View style={{flexDirection:'row', margin: 15, alignItems:'center', justifyContent:'center'}}>
              <TextInput
                  maxLength={40}
                  onChangeText={text => setText(text)}
                  value={text}
                  style={{padding: 10, backgroundColor:'white', height: 50, width:250, color:'black'}}
              />

              <TouchableOpacity
                onPress={searchWord}
                style={{backgroundColor:'blue',width:90, height: 50, justifyContent:'center', alignItems:'center'}}>
                  <Text>Cari</Text>
              </TouchableOpacity>
              </View>
            

            <FlatList
                    data={result}
                    renderItem={({item}) => <Item data={item} />}
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
            />
            
            

           
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#00b894',
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
