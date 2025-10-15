package kr.co.iei.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.movie.model.dto.MovieDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value ="/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="/movie")
	public ResponseEntity<Map> adminMovieList(@RequestParam int reqPage){
		Map map = adminService.adminMovieList(reqPage);
		return ResponseEntity.ok(map);
		
	}
	
	
}