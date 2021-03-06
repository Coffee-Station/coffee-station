import React, {useEffect, createContext, useState} from 'react';
import {View, Text, Button, BackHandler, Alert} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewOrder from './progresstabs/NewOrder';
import OnGoingOrder from './progresstabs/OnGoingOrder';
import styled from 'styled-components/native';
import axios from 'axios';
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

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

//TP Context ??????
const TabProgressContext = createContext();

// Top Tab ??????
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
  // // PAID ???????????? & ??????
  const showPaidOrderList = async () => {
    try {
      const response = await axios.get(
        BASE_URL + '/shop/orders/today/status/PAID',
      );
      console.log(response.data);
      setPaidOrders(response.data);
      console.log('PAID ORDERS RECEIVED');
    } catch (e) {
      console.log('?????? ?????? ?????? ????????????', e);
    }
  };
  // PREPARING ????????????
  const showPreparingOrderList = async () => {
    try {
      const response = await axios.get(
        BASE_URL + '/shop/orders/today/status/PREPARING',
      );
      // preparingOrders = response.data;
      setPreparingOrders(response.data);
      console.log('PREPARING ORDERS RECEIVED');
    } catch (e) {
      console.log('?????? ?????? ?????? ????????????', e);
    }
  };
  // Mount ??? ??? ????????? ???????????? But ??????????????? ????????? ????????? ???????
  useEffect(() => {
    showPaidOrderList();
    showPreparingOrderList();
    return () => console.log('TAB PROGRESS UNMOUNTED!!!');
  }, []);
  // selectedNewId??? ???????????? ???????????? ?????????
  useEffect(() => {
    console.log(`selectedNewId??? ?????????!! -> ${selectedNewId}`);
  }, [selectedNewId]);
  // selectedPreparingId??? ???????????? ???????????? ?????????
  useEffect(() => {
    console.log(`selectedPreparingId??? ?????????!! -> ${selectedPreparingId}`);
  }, [selectedPreparingId]);
  // selectedOrder??? ???????????? ???????????? ?????????
  useEffect(() => {
    console.log(`selectedNewOrder??? ?????????!! -> ${selectedOrder}`);
  }, [selectedOrder]);

  // ?????? ??????
  const acceptOrder = async () => {
    const data = {status: 'PREPARING'};

    try {
      await axios.patch(
        BASE_URL + `/shop/orders/${selectedOrder.orderId}/status`,
        data,
      );
      showPaidOrderList();
      showPreparingOrderList();
    } catch (e) {
      console.log(e);
    }
  };
  // ?????? ??????
  const completeOrder = async () => {
    const data = {status: 'COMPLETED'};
    try {
      await axios.patch(
        BASE_URL + `/shop/orders/${selectedOrder.orderId}/status`,
        data,
      );
      showPaidOrderList();
      showPreparingOrderList();
    } catch (e) {
      console.log(e);
    }
  };
  // ?????? ??????
  const rejectOrder = async () => {
    const data = {status: 'REJECT'};
    try {
      await axios.patch(
        BASE_URL + `/shop/orders/${selectedOrder.orderId}/status`,
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
          <Tab.Screen name="??????" component={NewOrder} />
          <Tab.Screen name="?????????" component={OnGoingOrder} />
        </Tab.Navigator>

        <Col1>
          <Row style={{padding: 5}}>
            <StTitle>???????????? {selectedOrder.orderId}</StTitle>
            <Row btn>
              <StyledBtn onPress={() => rejectOrder()} cancle>
                <StText btn>??????</StText>
              </StyledBtn>
              <StyledBtn
                onPress={() => {
                  selectedOrder.status === 'PAID'
                    ? acceptOrder()
                    : completeOrder();
                }}>
                <StText btn>
                  {selectedOrder.status === 'PAID' ? '??????' : '?????? ??????'}
                </StText>
              </StyledBtn>
            </Row>
          </Row>
          <DeatailContainer>
            <Col2>
              <Col3>
                <StText title>?????? ??????</StText>
                <StText menu>???????????? : {selectedOrderDate} / {selectedOrderTime} </StText>
                <StText menu>???????????? : {selectedOrder.orderId}</StText>
              </Col3>
              <Col3>
                <StText title>????????????</StText>
                <StText menu>{selectedOrder.request}</StText>
              </Col3>
            </Col2>
            <Col2 style={{height: '96%', margin: 10, backgroundColor: 'white'}}>
              <StText title>????????????</StText>

              <ScrollView style={{padding: 5}}>
                {selectedOrderMenus.map((menu, index) => (
                  <Col1 key={index} menu>
                    <StText menu style={{fontFamily: 'InfinitySans-Bold'}}>
                      {menu.menuName}
                    </StText>
                    <StText menu>????????? : {menu.menuSize}</StText>
                    <Row>
                      <StText>?????? : {menu.quantity}</StText>
                      <StText>{menu.price * menu.quantity}???</StText>
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

              <StText price>??? {selectedOrder.totalPrice}???</StText>
            </Col2>
          </DeatailContainer>
        </Col1>
      </Container>
    </TabProgressContext.Provider>
  );
};

export {TabProgressContext};
export default TabProgress;
