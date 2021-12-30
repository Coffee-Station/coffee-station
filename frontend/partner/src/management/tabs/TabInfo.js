import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, Pressable } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
// import {REACT_APP_BASE_URL} from "@env"


const Container = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 10px;

  /* border: 1px;
  border-color: orange; */
`;

const ImageContianer = styled(Container)`
  flex-direction: column;
  flex: 0.5;
  justify-content: center;
  align-items: center;

  /* border: 1px; */
`;

const TextContainer = styled(Container)`
  flex-direction: column;

  /* border: 1px ;
  border-color: red; */
`;

const Col1 = styled.View`
  width: 100%;
  padding: 10px;
  margin: 7px;

  border-radius: 5px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: ${props => (props.instagram ? 'center' : 'space-between')};
  align-items: center;
`;

const Image = styled.Image`
  width: ${props => (props.instagram ? '30px' : '250px')};
  height: ${props => (props.instagram ? '30px' : '250px')};
  border-radius: ${props => (props.instagram ? '0px' : '125px')};
`;

const StText = styled.Text`
  padding: 7px;
  font-size: ${props => (props.title ? '25px' : '20px')};
  font-family: ${props =>
    props.title
      ? 'InfinitySans-Bold'
      : props.price
      ? 'InfinitySans-Bold'
      : 'InfinitySansR'};
  color: black;
`;

const RowStatus = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const StateButton = styled.Pressable`
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  `

const TabInfo = ({navigation}) => {
  const [shopInfo, setShopInfo] = useState([]);
  const [shopImageList, setShopImageList] = useState([]);

  const [shopStateReady, setShopStateReady] = useState(0);
  const [shopStateOpen, setShopStateOpen] = useState(0);
  const [shopStateClose, setShopStateClose] = useState(0);

  // shopinfo 받아오기
  const getShopInfo = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL_PARTNER + '/shop');
      setShopInfo(response.data);
      setShopImageList(response.data.imgUrlList);
      console.log('==========샵인포==========', response.data);
      if (response.data.status == 'READY') {
        setShopStateReady(1);
        setShopStateOpen(0);
        setShopStateClose(0);
      } else if (response.data.status == 'OPEN') {
        setShopStateReady(0);
        setShopStateOpen(1);
        setShopStateClose(0);
      } else if (response.data.status == 'CLOSE') {
        setShopStateReady(0);
        setShopStateOpen(0);
        setShopStateClose(1);
      }
    } catch (e) {
      console.log(e);
    }
    // console.log('.env : ', process.env.REACT_APP_BASE_URL_PARTNER)
    // console.log('.env : ', REACT_APP_BASE_URL)
  };
  // 카메라로 찍어서 올리기
  // const addImage = () => {
  //   launchCamera({}, response => {
  //     console.log(response);
  //     setShopImage(response.uri);
  //   });
  // };
  // const pickImage = () => {
  //   launchImageLibrary({}, response => {
  //     setShopImage(response.assets[0].uri);
  //     console.log('됐다 이제', shopImage);
  //   });
  // };
  const formData = new FormData();
  const setImage = () => {
    launchImageLibrary({}, response => {
      const file = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      };
      formData.append('images', file);
      console.log('이게 폼데이타야');
      console.log(formData);
      uploadImage();
    });
  };
  const uploadImage = async () => {
    try {
      console.log(shopInfo.id);
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL_PARTNER + `/shop/${shopInfo.id}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        console.log(response),
      );
      getShopInfo();
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const changeStatus = async(status)  => {
    console.log(status);
    let userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.patch(
        process.env.REACT_APP_BASE_URL_PARTNER + `/shop/status`,
        {status},
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        },
      );
      console.log(response.data);
      if (response.data) {
        if (status == 'READY') {
          setShopStateReady(1);
          setShopStateOpen(0);
          setShopStateClose(0);
          Alert.alert('READY');
        } else if (status == 'OPEN') {
          setShopStateReady(0);
          setShopStateOpen(1);
          setShopStateClose(0);
          Alert.alert('가게를 오픈합니다.');
        } else if (status == 'CLOSE') {
          setShopStateReady(0);
          setShopStateOpen(0);
          setShopStateClose(1);
          Alert.alert('가게를 닫습니다.');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getShopInfo();
  }, []);

  return (
    <Container>
      <ImageContianer>
        {shopImageList.length === 0 ? (
          <TouchableOpacity style={{margin: 30}} onPress={() => setImage()}>
            <Image source={require('../../assets/icons/add-image.png')} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{margin: 30}} onPress={() => setImage()}>
            <Image
              source={{
                uri: shopImageList[shopImageList.length - 1],
              }}
            />
          </TouchableOpacity>
        )}
        <StText title>가게명 : {shopInfo.name}</StText>
        <Row instagram>
          <Image
            instagram
            source={require('../../assets/carousel/instagram.png')}></Image>
          <StText title>Instagram : {shopInfo.instagram}</StText>
        </Row>
        <RowStatus>
          <StateButton 
            style={{
              borderColor: shopStateReady ? '#ffffff':'#ff7f00', 
              backgroundColor: shopStateReady ? '#ff7f00':'#ffffff' 
            }}
            onPress={() => changeStatus('READY')}
          >
            <Text style={{color: shopStateReady ? '#ffffff':'#000000'}}>READY</Text>
          </StateButton>
          <StateButton
            style={{
              borderColor: shopStateOpen ? '#ffffff':'#ff7f00', 
              backgroundColor: shopStateOpen ? '#ff7f00':'#ffffff' 
            }}
            onPress={() => changeStatus('OPEN')}
          >
            <Text style={{color: shopStateOpen ? '#ffffff':'#000000'}}>OPEN</Text>
          </StateButton>
          <StateButton
            style={{
              borderColor: shopStateClose ? '#ffffff':'#ff7f00', 
              backgroundColor: shopStateClose ? '#ff7f00':'#ffffff'
            }}
            onPress={() => changeStatus('CLOSE')}
          >
            <Text style={{color: shopStateClose ? '#ffffff':'#000000'}}>CLOSE</Text>
          </StateButton>
        </RowStatus>
      </ImageContianer>

      <TextContainer>
        <Col1>
          <Row>
            <StText title>가게전화번호</StText>
            <StText style={{color: '#3c69c2'}}>수정🖋</StText>
          </Row>
          <StText>대표번호</StText>
          <StText>{shopInfo.phone_number}</StText>
        </Col1>
        <Col1>
          <Row>
            <StText title>가게소개</StText>
            <StText style={{color: '#3c69c2'}}>수정🖋</StText>
          </Row>
          <StText>{shopInfo.intro}</StText>
        </Col1>
        <Col1>
          <Row>
            <StText title>영업시간</StText>
            <StText style={{color: '#3c69c2'}}>수정🖋</StText>
          </Row>
          <StText>OPEN {shopInfo.open_at}</StText>
          <StText>CLOSE {shopInfo.close_at}</StText>
        </Col1>
        <Col1 style={{backgroundColor: '#D7DBE2'}}>
          <StText>👀👂🏻</StText>
          <StText title>우리 가게의 이런 모습을 소개해보세요.</StText>
          <StText>1. 위치, 인테리어 등 매장에 대한 정보</StText>
          <StText>2. 신메뉴, 재료, 조리과정 등 메뉴에 대한 정보</StText>
          <StText>3. 진행하고 있는 이벤트</StText>
        </Col1>
      </TextContainer>
    </Container>
  );
};

export default TabInfo;
