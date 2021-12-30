import React, {useEffect, createContext, useState} from 'react';
import {View, Text, Button, BackHandler, Alert} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewOrder from './progresstabs/NewOrder';
import OnGoingOrder from './progresstabs/OnGoingOrder';
import styled from 'styled-components/native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {REACT_APP_BASE_URL} from "@env"

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
`;

const StyledBtn = styled.TouchableOpacity`
  align-items: center;

  width: 40%;
  height: 100%;
  border-radius: 30px;
  background-color: ${props => (props.cancle ? '#F65E7A' : '#1A7CFE')};
`;

const StTitle = styled.Text`
  padding: 10px;
  font-size: 28px;
  font-family: "InfinitySans-Bold";
  color: black;

  /* border: 1px;
  border-color: red; */
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${props => (props.btn ? '40%' : '100%')};

  /* border: 1px; */
`;

const StText = styled.Text`
  padding: ${props => props.btn ? "10px": props.title ? "10px" : "5px"};

  text-align: ${props => props.title ? "left" : props.menu ? "left" : props.price ? "right" : "center"};
  font-size: ${props => props.title ? "24px" : props.btn ? "20px" : "20px"};
  font-family: ${props => props.title ? "InfinitySans-Bold": props.btn ? "InfinitySans-Bold" : "InfinitySansR"};
  color: ${props => props.btn ? "white": "black"};
  
  /* border: 1px;
  border-color: red; */
`;

const Col1 = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 5px;

  border: ${props => (props.menu ? '0.5px' : '0px')};
  border-color: ${props => (props.menu ? '#cacaca' : 'opacity')};

  /* border: 1px;
  border-color: red; */
`;

const Col2 = styled(Col1)`
  width: 50%;

  /* border: 1px; */
`;
const Col3 = styled(Col1)`
  margin: 10px;
  height: 50%;
  background-color: white;
`;


//TP Context 생성
const TabProgressContext = createContext();

// Top Tab 생성
const Tab = createMaterialTopTabNavigator();

const TabProgress = ({navigation}) => {
  // Context
  const [paidOrders, setPaidOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [selectedNewId, setSelectedNewId] = useState(null);
  const [selectedPreparingId, setSelectedPreparingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedOrderMenus, setSelectedOrderMenus] = useState([]);
  const [selectedOrderDate, setSelectedOrderDate] = useState([]);
  const [selectedOrderTime, setSelectedOrderTime] = useState([]);
  
  const value = {
    selectedNewId,
    setSelectedNewId,
    selectedPreparingId,
    setSelectedPreparingId,
    selectedOrder,
    setSelectedOrder,

    selectedOrderMenus,
    setSelectedOrderMenus,
    selectedOrderDate,
    setSelectedOrderDate,
    selectedOrderTime,
    setSelectedOrderTime,

    paidOrders,
    setPaidOrders,
    preparingOrders,
    setPreparingOrders,
  };
  // // PAID 받아오기 & 갱신
  const showPaidOrderList = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL_PARTNER + '/shop/orders/today/status/PAID',
      );
      console.log(response.data);
      setPaidOrders(response.data);
      console.log('PAID ORDERS RECEIVED');
    } catch (e) {
      console.log('신규 오더 정보 못받아옴', e);
    }
  };
  // PREPARING 받아오기
  const showPreparingOrderList = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL_PARTNER + '/shop/orders/today/status/PREPARING',
      );
      // preparingOrders = response.data;
      setPreparingOrders(response.data);
      console.log('PREPARING ORDERS RECEIVED');
    } catch (e) {
      console.log('준비 오더 정보 못받아옴', e);
    }
  };
  // Mount 될 때 정보를 받아온다 But 이렇게하면 동시성 처리가 될까?
  useEffect(() => {
    showPaidOrderList();
    showPreparingOrderList();
    return () => console.log('TAB PROGRESS UNMOUNTED!!!');
  }, []);
  // selectedNewId가 변경되면 호출되게 해보자
  useEffect(() => {
    console.log(`selectedNewId가 변했다!! -> ${selectedNewId}`);
  }, [selectedNewId]);
  // selectedPreparingId가 변경되면 호출되게 해보자
  useEffect(() => {
    console.log(`selectedPreparingId가 변했다!! -> ${selectedPreparingId}`);
  }, [selectedPreparingId]);
  // selectedOrder가 변경되면 호출되게 해보자
  useEffect(() => {
    console.log(`selectedNewOrder가 변했다!! -> ${selectedOrder}`);
  }, [selectedOrder]);

  // 접수 처리
  const acceptOrder = async () => {
    const data = {status: 'PREPARING'};

    try {
      await axios.patch(
        process.env.REACT_APP_BASE_URL_PARTNER + `/shop/orders/${selectedOrder.orderId}/status`,
        data,
      );
      showPaidOrderList();
      showPreparingOrderList();
    } catch (e) {
      console.log(e);
    }
  };
  // 완료 처리
  const completeOrder = async () => {
    const data = {status: 'COMPLETED'};
    try {
      await axios.patch(
        process.env.REACT_APP_BASE_URL_PARTNER + `/shop/orders/${selectedOrder.orderId}/status`,
        data,
      );
      showPaidOrderList();
      showPreparingOrderList();
    } catch (e) {
      console.log(e);
    }
  };
  // 취소 처리
  const rejectOrder = async () => {
    const data = {status: 'REJECT'};
    try {
      await axios.patch(
        process.env.REACT_APP_BASE_URL_PARTNER + `/shop/orders/${selectedOrder.orderId}/status`,
        data,
      );
      showPaidOrderList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TabProgressContext.Provider value={value}>
      <Container>
        <Tab.Navigator style={{flex: 0.5}} initialRouteName="Home">
          <Tab.Screen name="신규" component={NewOrder} />
          <Tab.Screen name="진행중" component={OnGoingOrder} />
        </Tab.Navigator>

        <Col1>
          <Row style={{padding: 5}}>
            <StTitle>주문번호 {selectedOrder.orderId}</StTitle>
            <Row btn>
              <StyledBtn onPress={() => rejectOrder()} cancle>
                <StText btn>취소</StText>
              </StyledBtn>
              <StyledBtn
                onPress={() => {
                  selectedOrder.status === 'PAID'
                    ? acceptOrder()
                    : completeOrder();
                }}>
                <StText btn>
                  {selectedOrder.status === 'PAID' ? '접수' : '완료 처리'}
                </StText>
              </StyledBtn>
            </Row>
          </Row>
          <DeatailContainer>
            <Col2>
              <Col3>
                <StText title>접수 정보</StText>
                <StText menu>주문시간 : {selectedOrderDate} / {selectedOrderTime} </StText>
                <StText menu>접수번호 : {selectedOrder.orderId}</StText>
              </Col3>
              <Col3>
                <StText title>요청사항</StText>
                <StText menu>{selectedOrder.request}</StText>
              </Col3>
            </Col2>
            <Col2 style={{height: '96%', margin: 10, backgroundColor: 'white'}}>
              <StText title>주문내역</StText>

              <ScrollView style={{padding: 5}}>
                {selectedOrderMenus.map((menu, index) => (
                  <Col1 key={index} menu>
                    <StText menu style={{fontFamily: 'InfinitySans-Bold'}}>
                      {menu.menuName}
                    </StText>
                    <StText menu>사이즈 : {menu.menuSize}</StText>
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
    </TabProgressContext.Provider>
  );
};

export {TabProgressContext};
export default TabProgress;
