package kr.co.iei.utils;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dao.MemberDao;

@Service
public class SchedulerService {
	@Autowired
	private MemberDao memberDao;
	
	@Transactional
	@Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul") //매일 자정
	public void deleteCoupon() {
		int result = memberDao.deleteCoupon();
		System.out.println("쿠폰 삭제 확인 : "+ result);
	}
	
	@Transactional
	@Scheduled(cron = "0 5 0 * * *", zone = "Asia/Seoul") //매일 자정
	public void BirthCoupon() {
		List<String> m = memberDao.selectBirthMember();
		for(String memberNo : m) {
			try {
				Thread.sleep(1000);
				int result = memberDao.BirthCoupon(memberNo);
				System.out.println("쿠폰 발급 확인 : "+ result);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
	}
}
