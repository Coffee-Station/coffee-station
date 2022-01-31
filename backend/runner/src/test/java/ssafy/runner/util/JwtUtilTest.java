package ssafy.runner.util;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.CustomerService;
import ssafy.runner.service.PartnerService;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
@Rollback(value = false)
class JwtUtilTest {

    @Autowired
    public JwtUtil jwtUtil;

    @Autowired
    public CustomerService customerService;

    @Autowired
    public PartnerService partnerService;


    // @Test
    // void createCustomerTokenTest() {
    //     customerService.join("wns312@naver.com", "password", "nickname");
    //     String token = jwtUtil.createToken("wns312@naver.com", "password", UserType.CUSTOMER);
    //     DecodedJWT decodedJWT = jwtUtil.verifyToken(token);

    //     Map<String, Claim> claims = decodedJWT.getClaims();
    //     for (String s : claims.keySet()) {
    //         System.out.println(s+" : "+claims.get(s));
    //     }
//        System.out.println(decodedJWT.getIssuer());
//        System.out.println(decodedJWT.getSubject());
//        System.out.println(decodedJWT.getAudience());
//        System.out.println(decodedJWT.getSignature());
//        System.out.println(decodedJWT.getExpiresAt());
//        System.out.println(decodedJWT.getAlgorithm());
    }

    // @Test
    // void createPartnerTokenTest() {
    //     partnerService.join("wns312@naver.com", "password");
    //     String token = jwtUtil.createToken("wns312@naver.com", "password", UserType.PARTNER);
    //     DecodedJWT decodedJWT = jwtUtil.verifyToken(token);

    //     Map<String, Claim> claims = decodedJWT.getClaims();
    //     for (String s : claims.keySet()) {
    //         System.out.println(s+" : "+claims.get(s));
    //     }
    // }

    // @Test
    // void partnerTokenExpiratonTest() throws InterruptedException {
    //     partnerService.join("wns312@naver.com", "password");
    //     String token = jwtUtil.createToken("wns312@naver.com", "password", UserType.PARTNER, 1000L);
    //     Thread.sleep(2000L);
    //     assertThrows(TokenExpiredException.class, ()->jwtUtil.verifyToken(token), "토큰이 만료되어야 하지만, 만료되지 않았습니다");
    // }
// }
