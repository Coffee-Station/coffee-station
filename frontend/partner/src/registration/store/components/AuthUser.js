import React, {useState, useRef} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import styled from 'styled-components/native';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';

const baseURL = 'http://3.38.99.110:8080/api/partner';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px;
  width: 100%;

  /* border: 1px;
  border-color: red; */
`
const Col1 = styled.View`
  flex-direction: column;
  background-color: white;
  padding: 10px;
  margin: 10px;

  /* border: 1px;
  border-color: orange; */
`

const Container = styled.View`
  justify-content: center;
  /* align-items: center; */
`;
const StyledInput = styled.TextInput`
  border: 1px solid #111111;
  padding: 10px;
  margin: 10px 10px;
  width: 200px;
  font-size: 24px;
`;

const StyledText = styled.Text`
  text-align: ${props => props.btn ? "center" : "left"};
  padding: 10px;
  font-size: ${props => props.btn ? "20px" : "24px"};
  font-family: ${props => props.btn ?"InfinitySansR" : "InfinitySans-Bold"};
  color: ${props => props.btn ? "white" : "black"};
  /* margin: 10px 0; */
`;

const StBtnView = styled.TouchableOpacity`
  /* justify-content: center; */
  width: ${props => props.next ? "95%" : "10%"};
  height: ${props => props.next ? "8%" : "70%"};
  border-radius: 10px;
  background-color: #FF7F00;
`

const StyledBtn = styled.Button`
  font-size: 18px;
  margin: 10px 0;
`;

// custom
const RegisterBtn = styled(StyledBtn)`
  border-width: 0;
  color: #ffffff;
`;
const AddressInput = styled(StyledInput)`
  width: 500px;
`;

const AuthUser = ({navigation}) => {
  // Store state
  const [b_no, setb_no] = useState('');
  const [shopName, setShopName] = useState('');

  // Address state
  const [zoncode, setZoncode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  // Store useRef
  const refb_no = useRef(null);
  const refShopName = useRef(null);

  // KAKAO POSTCODE
  const [isModal, setModal] = useState(false);

  // 다음 버튼으로 넘어가기 위한 boolean
  const [isValidated, setIsValidated] = useState(false);

  // 사업자 등록 검증 함수
  const validateBuis = async data => {
    console.log('validation progressing...');
    console.log(data);
    try {
      const response = await axios.post(process.env.REACT_APP_BASE_URL_PARTNER + '/validation', data);
      setIsValidated(true);
      alert('사업자 인증에 성공했습니다.');
      console.log(response.data);
    } catch (error) {
      // 혹시 true로 만들어놓고 이상한 값을 다시 넣을수도 있으니까
      setIsValidated(false);
      console.log(error);
      alert('사업자 인증에 실패했습니다.');
    }
  };

  // X, Y 좌표
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  // Geocoder
  Geocoder.init('AIzaSyBsxnrrFBrc23fegjtAYgkjr-PtQhXHKEs', {language: 'ko'});
  const setXY = data => {
    Geocoder.from(data)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
        setX(location.lng);
        setY(location.lat);
      })
      .catch(error => console.warn(error));
  };
  return (
    <Container>
      <Col1>
        <StyledText>사업자 등록번호</StyledText>
        <Row>
            <StyledInput
              value={b_no}
              onChangeText={setb_no}
              ref={refb_no}
              returnKeyType="next"
              onSubmitEditing={() => refShopName.current.focus()}
            />
            <StBtnView onPress={() => validateBuis({b_no})}>
              <StyledText btn>사업자 확인</StyledText>
            </StBtnView>
        </Row>
      </Col1>

      <Col1>
        <StyledText>상호</StyledText>
        <StyledInput
          value={shopName}
          onChangeText={setShopName}
          ref={refShopName}
          returnKeyType="done"
        />
      </Col1>

      <Col1>
        <StyledText>사업장 소재지</StyledText>
        <TouchableOpacity
          style={{width: '18%'}}
          onPressIn={() => setModal(true)}>
          <StyledInput placeholder="우편번호" value={zoncode} editable={false} />
        </TouchableOpacity>
          <Modal visible={isModal}>
            <Postcode
              style={{flex: 1}}
              jsOptions={{
                animation: true,
                animationType: 'slide',
                hideMapBtn: true,
              }}
              onSelected={data => {
                // 여기서 setData로 넘겨줘야 할 듯
                setZoncode(data.zonecode);
                setAddress(data.address);
                // alert(JSON.stringify(data));
                setXY(data.address);
                setModal(false);
              }}
            />
          </Modal>
          <AddressInput placeholder="주소" value={address} editable={false} />
        <AddressInput
          placeholder="상세주소"
          value={detailAddress}
          onChangeText={setDetailAddress}
        />
      </Col1>
      <StBtnView next style={{marginLeft: "2.5%"}}
        onPress={() =>
          isValidated
            ? shopName != ''
              ? address != ''
                ? detailAddress != ''
                  ? navigation.navigate('RegiStore', {
                      b_no: b_no,
                      shopName: shopName,
                      generalAddress: {
                        address: address,
                        detailAddress: detailAddress,
                        zoncode: zoncode,
                      },
                      x: x,
                      y: y,
                    })
                  : alert('상세 주소를 입력해 주세요.')
                : alert('주소는 빈 값일수 없습니다.')
              : alert('상호는 빈 값일수 없습니다')
            : alert('사업자 검증을 완료해주세요.')
        }>
        <StyledText btn> 다음 </StyledText>
      </StBtnView>

      
      {/* <RegisterBtn
        // 1. 사업자 등록번호
        // 2. 상호
        // 3. 사업장 소재지(우편번호, 주소, 상세주소)
        // 4. x,y 좌표
        title="다음"></RegisterBtn> */}
    </Container>
  );
};

export default AuthUser;
