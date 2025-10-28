package kr.co.iei.cs.faq.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.cs.faq.model.dto.FAQDTO;
import kr.co.iei.cs.faq.model.service.FAQService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/cs/faq")
public class FAQController {
	@Autowired
	private FAQService faqService;
	
	@GetMapping
	public ResponseEntity<Map> FAQList(@RequestParam int reqPage, @RequestParam String faqQuestion){
		Map map = faqService.selectFaqList(reqPage, faqQuestion);
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value="/frm")
	public ResponseEntity<Integer> insertFAQ(@ModelAttribute FAQDTO faq){
		int result = faqService.insertFAQ(faq);
		return ResponseEntity.ok(result);
	}
	@DeleteMapping(value="/{faqNo}")
	public ResponseEntity<Integer> deleteFAQ(@PathVariable int faqNo){
		int result = faqService.deleteFAQ(faqNo);
		return ResponseEntity.ok(result);
	}
}
