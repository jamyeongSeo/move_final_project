package kr.co.iei.cs.pq.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.cs.pq.model.dto.PQDTO;
import kr.co.iei.cs.pq.model.service.PQService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/cs/pq")
public class PQController {
	@Autowired
	private PQService pqService;
	
	@GetMapping
	public ResponseEntity<Map> PQList(@RequestParam int reqPage, @RequestParam String pqTitle){
		Map map = pqService.PQList(reqPage,pqTitle);
		return ResponseEntity.ok(map);
	}
}
