package kr.co.iei.movie.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.movie.model.dto.MovieCommentDTO;
import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.movie.model.service.MovieService;

@RestController
@RequestMapping(value="/movie")
@CrossOrigin("*")
public class MovieController {
	@Autowired
	MovieService movieService;
	
	@GetMapping(value="/list")
	public ResponseEntity<Map> getMovieList(@RequestParam String memberId){
		Map map =  movieService.selectMovieList(memberId);
		
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value="/likePush")
	public ResponseEntity<Integer> likePush(@RequestParam int movieNo, @RequestParam String memberId){
		int result = movieService.likePush(movieNo, memberId);
		return ResponseEntity.ok(result);
		
	}
	
	@GetMapping(value="/isLike")
	public ResponseEntity<Boolean> isLike(@RequestParam int movieNo, @RequestParam String memberId){
		boolean result = movieService.isLike(movieNo, memberId);
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping(value="/likeUnPush")
	public ResponseEntity<Integer> likeUnPush(@RequestParam int movieNo, @RequestParam String memberId){
		System.out.println(movieNo);
		System.out.println(memberId);
		int result  = movieService.likeUnPush(movieNo, memberId);
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
	
	/*-----------------Main-----------------*/
	@GetMapping(value= "/boxOffice")
	public ResponseEntity<Map> selectBoxOffice(@RequestParam String memberId){
		Map map = movieService.selectBoxOffice(memberId);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/schedule")
	public ResponseEntity<Map> selectSchedule(@RequestParam int dateSchedule){
		Map map = movieService.selectSchedule(dateSchedule);
		return ResponseEntity.ok(map);
	}
	/*-----------------Main 끝-----------------*/
	@GetMapping(value="/detail/{movieNo}")
	public ResponseEntity<MovieDTO> selectOneMovie(@PathVariable int movieNo){
		MovieDTO movie = movieService.selectOneMovie(movieNo);
		System.out.println(movie);
		return ResponseEntity.ok(movie);
	}
	@GetMapping(value="/comment/{movieNo}")
	public ResponseEntity<Map> selectMovieCommentList(@PathVariable int movieNo, 
														@RequestParam int reqPage,
															@RequestParam int order){
		
		Map<String, Object> commentMap = movieService.selectMovieCommentList(movieNo, reqPage, order);
		return ResponseEntity.ok(commentMap);
	}
	@PostMapping(value="/comment/report")
	public ResponseEntity<Integer> reportComment(@RequestBody Map<String, Object> reportMap){
		System.out.println(reportMap);
		int result = movieService.reportComment(reportMap);
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
	@PostMapping(value="/comment/insert")
}
