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
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import SIZES,{API, ColorPrimary} from './utils/constanta';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(){
    const [text, setText] = useState('');
    const [result, setResult] = useState([]);
    const [filteredResult, setFilteredResult] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModal, setDataModal] = useState('')

    const getWords = async () => {
      if(await AsyncStorage.getItem('words')){
        const value = await AsyncStorage.getItem('words');
        setResult(JSON.parse(value));
        setFilteredResult(JSON.parse(value));
      }else{
        await fetch(API, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
              AsyncStorage.setItem('words', JSON.stringify(responseJson.words));
              setResult(responseJson.words);
              setFilteredResult(responseJson.words);
        });
      }
        
    }

    const searchFilter = () => {
      if (text) {
        const newData = result.filter(
          function (item) {
            const itemData1 = item.bindo? item.bindo.toUpperCase():''.toUpperCase();
            const itemData2 = item.english? item.english.toUpperCase():''.toUpperCase();
            const itemData3 = item.loma? item.loma.toUpperCase():''.toUpperCase();

            const textData = text.toUpperCase();
      
            return itemData1.indexOf(textData) > -1 || 
                   itemData2.indexOf(textData) > -1 || 
                   itemData3.indexOf(textData) > -1 ;
        });

        setFilteredResult(newData);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredResult(result);
      }
    };


    // const Item = ({data}) => (
        
    // );

    const Item = ({data}) => (
      <View style={{flex:1, flexDirection:'row',alignItems:'center', padding:10, borderBottomColor:ColorPrimary, borderBottomWidth:1}}>
      <View style={{flex:1, padding:10,}}>
        {/* <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}> */}
          <Text style={{color:ColorPrimary, marginLeft:5, fontSize:24,}}>{data.loma}</Text>
          <Text style={{color:'black', marginLeft:5, fontSize:16,}}>{data.bindo}  -  {data.english}</Text>
        {/* </View> */}            
      </View>

      {data.loma != 'Data Tidak Ditemukan'?
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setDataModal({
              loma : data.loma,
              batur : data.batur,
              sorangan : data.sorangan,
              bindo : data.bindo,
              english : data.english,
            })
            }}>
          <Text style={styles.textStyle}>Lihat Detail</Text>
        </TouchableOpacity>:null
      }
      

      </View>
  );
    
   
    useEffect(()=>{
        getWords();
    },[])

  return (
      <View style={styles.container}>
          <View style={{height:SIZES.height/4, justifyContent:'center', alignItems:'center'}}>
            <View style={{flex:2, marginTop:20, justifyContent:'center'}}>
              <Text style={{fontSize:30, fontWeight:'bold', color:'white'}}>Kamus Bahasa Sunda</Text>
            </View>
            <View style={{flexDirection:'row', margin: 15,backgroundColor:'white', height: 50, width:SIZES.width*0.93, alignItems:'center', justifyContent:'center'}}>
              <Icon style={{marginLeft:5}} name="search" size={18} color={'#b2bec3'} />
              <TextInput
                  maxLength={40}
                  onChangeText={text => setText(text)}
                  onChange={searchFilter}
                  onEndEditing={searchFilter}
                  value={text}
                  placeholder="Input kata (bahasa indonesia/sunda/inggris)"
                  placeholderTextColor={'#b2bec3'}
                  style={{padding: 10, backgroundColor:'white', height: 50, width:SIZES.width*0.93-30, color:'black'}}
              />
              </View>
          </View>
          
          <FlatList
              data={filteredResult[0]? filteredResult : [{loma:'Data Tidak Ditemukan', bindo:'Silahkan tanyakan pada orang sunda di sekitar anda.'}]}
              renderItem={({item}) => <Item data={item} />}
              showsHorizontalScrollIndicator={false}
              horizontal={false}  
              style={{flex:3, backgroundColor:'white'}}
          />
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{flex:1, flexDirection:'row', justifyContent:'center', margin: 5}}>
                    <Text style={{color:ColorPrimary, fontSize:32, fontWeight:'400', margin:5}}>{dataModal.loma}</Text>
                  </View>

                  <View style={{flex:1, flexDirection:'row'}}>
                    <Text style={styles.modalText}>Halus (orang lain)</Text>
                    <Text style={styles.modalText}>: {dataModal.batur}</Text>
                  </View>

                  <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.modalText}>Halus (diri sendiri)</Text>
                    <Text style={styles.modalText}>: {dataModal.sorangan}</Text>
                  </View>

                  <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.modalText}>Bahasa Inggris</Text>
                    <Text style={styles.modalText}>: {dataModal.english}</Text>
                  </View>

                  <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.modalText}>arti</Text>
                    <Text style={styles.modalText}>: {dataModal.bindo}</Text>
                  </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={{color:'white', alignSelf:'center'}}>Tutup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>           
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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      justifyContent:'space-between',
      width:SIZES.width-50,
      height:SIZES.height/2,
      backgroundColor: 'white',
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      },

    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },  
   
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: ColorPrimary,
      textAlign: 'center',
    },
    modalText: {
      flex:1,
      color:'black', 
      margin:5,
      fontSize:17,
    },
});

export default App;
