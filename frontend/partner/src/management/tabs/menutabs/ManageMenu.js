import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

const Container = styled.View`
  flex-direction: row;
  flex: 1;
  background-color: #ffffff;
`;
const TopContainer = styled.View`
  flex-direction: row;
  margin: 20px;
  justify-content: space-between;
`;
const ColumnContainer = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 50px;
`;
const HeadButtonBox = styled.View`
  flex-direction: row;
`;
const HeadButton = styled.Pressable`
  margin: 10px;
  border-radius: 10px;
  width: 80px;
  height: 50px;
  border-width: 2px;
  justify-content: center;
  align-items: center;
`
const HeadButtonText = styled.Text`
  font-family: 'InfinitySans-Bold';
  font-size: 20px;
`
const TitleText = styled.Text`
  font-family: 'InfinitySans-Bold';
  font-size: 30px;
`
const SubText = styled.Text`
  font-family: 'InfinitySans-Bold';
  font-size: 15px;
  margin-left: 10px;
`
const InfoBox = styled.View`
  margin-left: 20px;
`
const Row = styled.View`
  flex-direction: row;
`
const ColSize = styled.View`
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding:10px;
`



const Item = ({item, onPress, backgroundColor, textColor, borderColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor, borderColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const ManageMenu = ({navigation}) => {
  const [menu, setMenu] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [extraList, setExtraList] = useState([]);

  const selecteMenu = item => {
    setSelectedId(item.id);
    setSelectedMenu(item);
    setSizeList(item.menuSizeList.menuSizeList);
    setExtraList(item.extraList.extraList);
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#ff7f00' : 'white';
    const color = item.id === selectedId ? 'white' : 'black';
    const borderColor = item.id === selectedId ? 'white' : '#ff7f00';

    return (
      <Item
        item={item}
        onPress={() => selecteMenu(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderColor={{borderColor}}
      />
    );
  };
  // 메뉴 받아오기
  const getMenu = async () => {
    try {
      const response = await axios.get(BASE_URL + '/menu');
      setMenu(response.data.menuList);
      // console.log(response.data.menuList[0]);
      // 만약 데이터 메뉴 리스트가 빈 배열이라면
      if (response.data.menuList.length !== 0) {
        selecteMenu(response.data.menuList[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //메뉴 삭제 요청
  const deleteMenu = async () => {
    try {
      const response = await axios.delete(
        BASE_URL + `/menu/${selectedMenu.id}`,
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  //메뉴 생성 요청
  const goCreateMenu = () => {
    navigation.navigate('CreateMenu');
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={menu}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
      <ColumnContainer>
        <TopContainer>
          <View style={{justifyContent: 'center'}}>
            <TitleText style={{margin:10}}>메뉴정보</TitleText>
          </View>
          <HeadButtonBox>
            <HeadButton style={{borderColor: 'red'}} onPress={() => deleteMenu()}>
              <HeadButtonText>삭제</HeadButtonText>
            </HeadButton>
            <HeadButton style={{borderColor: '#ff7f00'}} onPress={() => goCreateMenu()}>
              <HeadButtonText>추가</HeadButtonText>
            </HeadButton>
          </HeadButtonBox>
        </TopContainer>
        <InfoBox>
          <View style={{alignItems:'center'}}>
            <Image
              style={{height: 200, width: 200}}
              source={{uri: selectedMenu.imgUrl}}
            />
            <HeadButtonText>{selectedMenu.name}</HeadButtonText>
            <HeadButtonText>{selectedMenu.price}원</HeadButtonText>
          </View>

          {sizeList.length !== 0 ? (
            <>
              <SubText> - 사이즈정보</SubText>
              <Row>
                {sizeList.map((size, index) => (
                  <ColSize key={index}>
                    <Text>{size.menuSizeName}</Text>
                    <Text>{size.price}원</Text>
                  </ColSize>
                ))}
              </Row>
              <SubText> - 엑스트라 정보</SubText>
              <Row>
              {extraList.map((extra, index) => (
                <ColSize key={index}>
                  <Text>{extra.name}</Text>
                  <Text>{extra.price}원</Text>
                </ColSize>
              ))}
              </Row>
            </>
          ) : (
            <Text>메뉴 정보가 없습니다.</Text>
          )}
        </InfoBox>
      </ColumnContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'InfinitySansR'
  },
});

export default ManageMenu;
