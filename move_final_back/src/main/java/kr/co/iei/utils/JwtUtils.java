package kr.co.iei.utils;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.co.iei.member.model.dto.LoginMemberDTO;

@Component
public class JwtUtils {
	@Value("${jwt.secret-key}")
	private String secretKey;
	@Value("${jwt.expire-hour}")
	private int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	private int expireHourReFresh;
	
	//1시간 짜리 토큰 생성
	public String createAccessToken(String memberId, int memberLevel) {
		//1.작성 키값 이용 암호화코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2.토큰 생성시간, 만료기간 설정
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();//토큰 생성시간  -> 현재시간
		c.add(Calendar.HOUR,expireHour);// 캘린더 객체의 시간을 현시간부터 만료시간만큼 연장
		Date expireTime = c.getTime();
		
		//3.토큰 생성
		String token = Jwts.builder()
							.issuedAt(startTime) //토큰발행시간
							.expiration(expireTime)//토큰만료시간
							.signWith(key)//암호화 서명
							.claim("memberId", memberId)//토큰에 포함될 회원 정보
							.claim("memberLevel", memberLevel)
							.compact();//성공
		return token;
	}
	
	//1년짜리 토큰 생성
	public String createRefreshToken(String memberId, int memberLevel) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();
		c.add(Calendar.HOUR,expireHourReFresh);//캘린더 객체 시간 현시간부터 만료시간만큼 연장(1년)
		Date expireTime = c.getTime();
		
		//토큰 생성
		String token = Jwts.builder()
							.issuedAt(startTime)//발행 시간
							.expiration(expireTime)//종료 시간
							.signWith(key)
							.claim("memberId", memberId)
							.claim("memberLevel", memberLevel)
							.compact();//성공
		return token;
	}
	
	
	public LoginMemberDTO checkToken(String token) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		
		//다시 보기 요망
		Claims claims = (Claims)Jwts.parser()
				.verifyWith(key)
				.build()
				.parse(token)
				.getPayload();
		
		String memberId = (String)claims.get("memberId");
		int memberLevel = (int)claims.get("memberLevel");
		LoginMemberDTO loginMember = new LoginMemberDTO();
		loginMember.setMemberId(memberId);
		loginMember.setMemberLevel(memberLevel);
		return loginMember;
	}
}
