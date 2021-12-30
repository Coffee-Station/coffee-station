import React, {createContext, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import CompletedOrder from './completedtabs/CompletedOrders';
import {ScrollView} from 'react-native-gesture-handler';


// styled components
const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DeatailContainer = styled(Container)`
  flex-direction: row;
  width: 100%;

  /* border: 1px;
  border-color: red; */
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Col1 = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 5px;

  border: ${props => (props.menu ? '0.5px' : '0px')};
  border-color: ${props => (props.menu ? '#cacaca' : 'opacity')};

  /* border: 1px; */
`;

const Col2 = styled(Col1)`
  width: 50%;
  /* margin: 10px; */

  /* border: 1px;
  border-color: green; */
`;

const Col3 = styled(Col1)`
  margin: 10px;
  height: 50%;
  background-color: white;
`;

const StTitle = styled.Text`
  padding: 10px;
  font-size: 28px;
  font-family: 'InfinitySans-Bold';
  color: black;
`;

const StText = styled.Text`
  padding: ${props => props.title ? "10px" : "5px"};
  text-align: ${props => (props.price ? 'right' : 'left')};
  font-size: ${props => (props.title ? '24px' : props.price ? '22px' : '20px')};
  font-family: ${props =>
    props.title
      ? 'InfinitySans-Bold'
      : props.price
      ? 'InfinitySans-Bold'
      : 'InfinitySansR'};
  color: black;
  /* background-color: ${props => (props.price ? '#cacaca' : 'opacity')}; */
`;

//Context 생성
const TabCompletedContext = createContext();

const Tab = createMaterialTopTabNavigator();

const TabCompleted = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedOrderMenus, setSelectedOrderMenus] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [selectedOrderDate, setSelectedOrderDate] = useState([]);
  const [selectedOrderTime, setSelectedOrderTime] = useState([]);

  const value = {
    selectedId,
    setSelectedId,
    selectedOrder,
    setSelectedOrder,
    selectedOrderMenus,
    setSelectedOrderMenus,
    completedOrders,
    setCompletedOrders,

    selectedOrderDate,
    setSelectedOrderDate,
    selectedOrderTime,
    setSelectedOrderTime
  };

  const showCompletedOrderList = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL_PARTNER + '/shop/orders');
      setCompletedOrders(response.data);
      // console.log(response.data)
      // console.log(response.data[0].menus[0].extras)
      console.log('COMPLETED ORDERS RECEIVED');
    } catch (e) {
      console.log('COMPLETED 오더 정보 못받아옴', e);
    }
  };

  useEffect(() => {
    showCompletedOrderList();
  }, []);

  return (
    <TabCompletedContext.Provider value={value}>
      <Container>
        <Tab.Navigator style={{flex: 0.5}}>
          <Tab.Screen name="완료" component={CompletedOrder} />
        </Tab.Navigator>

        <Col1>
          <StTitle>주문번호 {selectedOrder.orderId}</StTitle>
          <DeatailContainer>
            <Col2>
              <Col3>
                <StText title>접수 정보</StText>
                <StText>{selectedOrder.shopName}</StText>
                <StText>주문시간 : {selectedOrderDate} / {selectedOrderTime}</StText>
              </Col3>
              <Col3>
                <StText title>요청사항</StText>
                <StText>{selectedOrder.request}</StText>
              </Col3>
            </Col2>

            <Col2 style={{height: '96%', margin: 10, backgroundColor: 'white'}}>
              <StText title>주문내역</StText>

              <ScrollView style={{padding: 5}}>
                {selectedOrderMenus.map((menu, index) => (
                  <Col1 key={index} menu>
                    <StText style={{fontFamily: 'InfinitySans-Bold'}}>
                      {menu.menuName}
                    </StText>
                    <StText>사이즈 : {menu.menuSize}</StText>
                    <Row>
                      <StText>수량 : {menu.quantity}</StText>
                      <StText>{menu.price * menu.quantity}원</StText>
                    </Row>
                    {menu.extras.map((extra, exIndex) => {
                      <Row key={exIndex}>
                        <Text>
                          {extra.name} {extra.price}
                        </Text>
                      </Row>;
                    })}
                  </Col1>
                ))}
              </ScrollView>

              <StText price>총 {selectedOrder.totalPrice}원</StText>
            </Col2>
          </DeatailContainer>
        </Col1>
      </Container>
    </TabCompletedContext.Provider>
  );
};
export {TabCompletedContext};
export default TabCompleted;
