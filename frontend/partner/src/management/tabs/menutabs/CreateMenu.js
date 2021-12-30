import React, { useEffect, useState } from 'react';
import {View, Text, Button, TextInput, Pressable, Image, ScrollView } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

const CreateMenuView = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`
const InputLabel = styled.Text`
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'InfinitySans-Bold';
  font-size: 20px;
`
const InputLabelSub = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  font-family: 'InfinitySansR';
`
const SubText = styled.Text`
  font-family: 'InfinitySansR';
`
const InputInfo = styled.TextInput`
margin: 10px;
padding: 10px;
border-radius: 8px;
border: 0.5px #cacaca;
`
const Row = styled.View`
  flex-direction: row;
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: white;
  border: #cacaca 0.2px;
  width: 100%;
  margin-bottom: 5px;
`
const RowCategory = styled.View`
  flex-direction: row;
  background-color: white;
  padding: 10px;
  width: 100%;
  margin-bottom: 5px;
`
const ColCategory = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 18%;
  margin-right: 10px;
  border-width: 1px;
  border-radius: 10px;
`
const CategoryButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`
const ColSize = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 10%;
  margin-right: 10px;
  border-width: 1px;
  border-radius: 10px;
`
const Col = styled.View`
  flex-direction: column;
  width: 50%;
  margin-right: 40px;
`
const StButton = styled.Pressable`
  margin: 20px;
  margin-bottom: 50px;
  padding: 10px;
  border-radius: 8px;
  border: 0.5px #ff7f00;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  width: 98%;
  height: 45px;
  `
const StButtonExtra = styled.Pressable`
  margin: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  border: 0.5px #ff7f00;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  width: 98%;
  height: 45px;
`
const SizeButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`

const CreateMenu = ({navigation}) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [imgUrl, setImgUrl] = useState('https://cdn.discordapp.com/attachments/880707219098853400/910884675751407646/image_6.png');
  const [signiture, setSigniture] = useState(false);
  const [menuImage, setMenuImage] = useState();
  const [isResist, setIsResist] = useState(false);
  const [menuId, setMenuId] = useState(0);
  const [isMenuResist, setIsMenuResist] = useState([false, false, false, false, false, false, false]);
  const [extraName, setExtraName] = useState('');
  const [extraPrice, setExtraPrice] = useState('');
  const [extraList, setExtraList] = useState([]);

  const categoryIdName = ['Coffee', 'Non-Coffee', 'Dessert', 'Bakery', 'ETC'];
  const menuSizePrice = [0, 300, 500, 800, 1000, 1200, 1500];
  const menuSizeName = ['one size', 'Small', 'Medium', 'Large', 'Tall', 'Grande', 'Venti'];
  
  const formData = new FormData();


  // const addImage = () => {
  //   launchCamera({}, response => {
  //     console.log(response);
  //     setMenuImage(response.uri);
  //   });
  // };
  // const pickImage = () => {
  //   launchImageLibrary({}, response => {
  //     setMenuImage(response.assets[0].uri);
  //     console.log('됐다 이제', shopImage);
  //   });
  // };


  const setImage = () => {
    launchImageLibrary({}, response => {
      console.log(response)
      setMenuImage(response.assets[0].uri);
      const file = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      };
      formData.append('images', file);
      // console.log('이게 폼데이타야');
      // console.log(formData);
      uploadImage();
    });
  };
  const uploadImage = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL_PARTNER + `/menu/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
      setImgUrl(response.data);
    } catch (e) {
      console.log('아오');
      console.log(e);
    }
  };

  const addMenu = async() => {
    console.log('메뉴추가요');
    if (isResist) {
      alert('이미 메뉴 등록을 하셨어요!!!')
    } else {
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL_PARTNER + `/menu`,
          {categoryId, imgUrl, name, price, signiture},
          {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          },
        );
        console.log(response.data);
        setMenuId(response.data.menuId);
        setIsResist(true);
      } catch (e) {
        console.log(e);
      }
      alert('등록 완료! 이어서 사이즈와 추가사항을 넣어주세요!');
    }
  }

  const resistSize = async(sizeId, price) => {
    if (isResist) {
      let userToken = await AsyncStorage.getItem('userToken');
      let resist = isMenuResist.slice();
      if (resist[sizeId-1]) {
        console.log('메뉴 사이즈 삭제');
        try {
          const response = await axios.delete(
            process.env.REACT_APP_BASE_URL_PARTNER + `/menu/${menuId}/size/${sizeId}`,
            {menuId, sizeId},
            {
              headers: {
                Authorization: 'Bearer ' + userToken,
              },
            },
          );
          console.log(response.data);
          resist[sizeId-1] = false;
        } catch (e) {
          console.log(e);
        }
        resist[sizeId-1] = false;
      } else {
        console.log('메뉴 사이즈 등록');
        try {
          const response = await axios.post(
            process.env.REACT_APP_BASE_URL_PARTNER + `/menu/${menuId}/size`,
            {price, sizeId},
            {
              headers: {
                Authorization: 'Bearer ' + userToken,
              },
            },
          );
          console.log(response.data);
          resist[sizeId-1] = true;
        } catch (e) {
          console.log(e);
        }
      }
      setIsMenuResist(resist);
    } else {
      alert('메뉴 등록을 먼저 해주세요!!!')
    }
  }

  const resistExtra = async() => {
    console.log('메뉴 추가사항 등록');
    if (isResist) {
      let userToken = await AsyncStorage.getItem('userToken');
      let extratmp = extraList.slice();
      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL_PARTNER + `/menu/${menuId}/extra`,
          {name:extraName, price:extraPrice},
          {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          },
        );
        console.log(response.data);
        extratmp.push({name:extraName, price:extraPrice});
        setExtraList(extratmp);
        setExtraName('');
        setExtraPrice('');
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('메뉴 등록을 먼저 해주세요!!!!!');
    }
  }

  return (
    <ScrollView>
      <CreateMenuView>
        {/* <Text> ----- </Text> */}
        <Row>
          <Col> 
            <InputLabel>메뉴이름</InputLabel>
            <InputInfo 
              value={name}
              onChangeText={setName}
            />
            <InputLabel>메뉴가격</InputLabel>
            <InputInfo 
              value={price}
              onChangeText={setPrice}
            />
            <InputLabel>메뉴 이미지 등록</InputLabel>
            <Pressable
              style={{marginLeft:10, height: 200, width: 200, backgroundColor: '#ffffff', alignItems: 'flex-start'}}
              onPress={() => setImage()}
            >
              <Image 
                style={{height: 140, width: 140, marginTop: 10, marginBottom: 5}}
                source={{uri: imgUrl}}
              />
              <SubText>클릭 시 이미지 업로드</SubText>
            </Pressable>
            <InputLabel style={{marginTop: 10}}>메뉴 카테고리 등록</InputLabel>
            <RowCategory>
              {categoryIdName.map((cName, index) => (
                <ColCategory key={index} style={{ borderColor: index+1 == categoryId ? '#ff7f00':'#cacaca' }}>
                  <CategoryButton onPress={() => setCategoryId(index+1)}>
                    <SubText>{ cName }</SubText>
                  </CategoryButton>
                </ColCategory>
              ))}
            </RowCategory>
            <InputLabel>is Signiture?</InputLabel>
            <RowCategory>
              <ColCategory style={{ borderColor: signiture ? '#ff7f00':'#cacaca' }}>
                <CategoryButton onPress={() => setSigniture(!signiture)}>
                  {
                    signiture
                    ? (<SubText>Yes!!</SubText>)
                    : (<SubText>No!</SubText>)
                  }
                </CategoryButton>
              </ColCategory>
            </RowCategory>
            <View style={{ alignItems: 'center' }}>
              <StButton onPress={() => addMenu()}>
                <SubText style={{ color:'#ff7f00'}}>메뉴 등록</SubText>
              </StButton>
            </View>
          </Col>

          <Col>
            <InputLabel>사이즈 등록</InputLabel>
            <RowCategory>
              {menuSizeName.map((sName, index) => (
                <ColSize key={index} style={{ borderColor: isMenuResist[index] ? '#ff7f00':'#cacaca' }}>
                  <SizeButton onPress={() => resistSize(index+1, menuSizePrice[index])}>
                    <SubText>{sName}</SubText>
                  </SizeButton>
                </ColSize>
              ))}
            </RowCategory>
            <InputLabel>메뉴 추가 사항 등록</InputLabel>
            <InputLabelSub> - 추가사항 명</InputLabelSub>
            <InputInfo 
              value={extraName}
              onChangeText={setExtraName}
            />
            <InputLabelSub> - 추가사항 가격</InputLabelSub>
            <InputInfo 
              value={extraPrice}
              onChangeText={setExtraPrice}
            />
            <View style={{ alignItems: 'center' }}>
              <StButtonExtra onPress={() => resistExtra()}>
                <SubText style={{ color:'#ff7f00'}}>추가사항 등록</SubText>
              </StButtonExtra>
              {extraList.map((extrainfo, index) => (
                <Text style={{margin:10}} key={index}>추가사항 : {extrainfo.name}, 가격 : {extrainfo.price}</Text>
              ))}
            </View>
          </Col>

        </Row>
        
        {/* <Button
          onPress={() => navigation.navigate('TabDone')}
          title="Go to TabDone"
        /> */}
      </CreateMenuView>
    </ScrollView>
  );
};

export default CreateMenu;
