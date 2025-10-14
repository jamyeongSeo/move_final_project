package kr.co.iei.cs.notice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.cs.notice.model.service.NoticeService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/cs/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	
	@GetMapping
	public ResponseEntity<Map> noticeList(@RequestParam int reqPage){
		Map map = noticeService.selectNoticeList(reqPage);
		return ResponseEntity.ok(map);
	}
}
