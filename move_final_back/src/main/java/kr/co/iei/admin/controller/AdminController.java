package kr.co.iei.admin.controller;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.movie.model.dto.MovieDTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Value("${file.root}")
    private String root;

    /*영화 목록 조회 */
    @GetMapping("/movie")
    public ResponseEntity<Map> adminMovieList(
            @RequestParam(required = false) Integer reqPage,
            @RequestParam(required = false) String movieTitle,
            @RequestParam(required = false) Integer movieStatus) {
        int page = (reqPage == null) ? 1 : reqPage;
        Map map = adminService.adminMovieList(page, movieTitle, movieStatus);
        return ResponseEntity.ok(map);
    }

    /* 영화 상태 변경 */
    @PatchMapping("/movie/{movieNo}")
    public ResponseEntity<Integer> updateMovieStatus(
            @PathVariable int movieNo,
            @RequestPart("movie") MovieDTO movie) {
        int result = adminService.updateMovieStatus(movieNo, movie.getMovieStatus());
        return ResponseEntity.ok(result);
    }

    /*영화 등록 (썸네일 포함) */
    @PostMapping(value = "/movie", consumes = "multipart/form-data")
    public ResponseEntity<Integer> insertMovieInfo(
            @RequestPart("movie") MovieDTO movie,
            @RequestPart(value = "movieThumb", required = false) MultipartFile movieThumb) {

        try {
            if (movieThumb != null && !movieThumb.isEmpty()) {
                String savePath = root + "/thumb/";
                File dir = new File(savePath);
                if (!dir.exists()) dir.mkdirs();

                String fileName = System.currentTimeMillis() + "_" + movieThumb.getOriginalFilename();
                File dest = new File(savePath, fileName);
                movieThumb.transferTo(dest);
                movie.setMovieThumb(fileName);
            }

            int result = adminService.insertMovieInfo(movie);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(0);
        }
    }

    /* 영화 상세 조회 */
    @GetMapping("/{movieNo}")
    public ResponseEntity<MovieDTO> selectOneMovie(@PathVariable int movieNo) {
        MovieDTO movie = adminService.selectOneMovie(movieNo);
        return ResponseEntity.ok(movie);
    }

    /*상영 스케줄 등록 */
    @PostMapping("/schedule")
    public ResponseEntity<?> insertMovieSchedule(@RequestBody ScheduleDTO schedule) {
        ScheduleDTO s = adminService.insertSchedule(schedule);
        if (s == null) {
            return ResponseEntity.status(409).body("이미 해당 시간에 스케줄이 존재합니다.");
        }
        return ResponseEntity.ok(s);
    }


    /* 상영 중 영화 목록 */
    @GetMapping("/movie/running")
    public ResponseEntity<List<MovieDTO>> getRunningMovies() {
        List<MovieDTO> grm = adminService.getRunningMovies();
        System.out.println("[Controller] 상영중 영화 수 : " + (grm != null ? grm.size() : -1));
        if (grm != null && !grm.isEmpty()) {
            System.out.println("[Controller] 첫 번째 영화: " + grm.get(0).getMovieTitle());
        }
        return ResponseEntity.ok(grm);
    }


    /* 스케줄 목록 조회 */
    @GetMapping("/schedule")
    public ResponseEntity<List<ScheduleDTO>> scheduleList() {
        List<ScheduleDTO> scheduleList = adminService.scheduleList();
        return ResponseEntity.ok(scheduleList);
    }

    /* 스케줄 수정 */
    @PatchMapping("/schedule")
    public ResponseEntity<Integer> updateSchedule(@RequestBody ScheduleDTO schedule) {
        int result = adminService.updateSchedule(schedule);
        return ResponseEntity.ok(result);
    }

    /* 스케줄 삭제 */
    @DeleteMapping("/schedule/{scheduleNo}")
    public ResponseEntity<Integer> deleteSchedule(@PathVariable int scheduleNo) {
        int result = adminService.deleteSchedule(scheduleNo);
        return ResponseEntity.ok(result);
    }

    /** 스케줄 등록 시, 이미 선택된 시간 제외 */
    @GetMapping("/schedule/occupied")
    public List<Map<String, String>> getOccupiedTimes(
            @RequestParam int screenNo,
            @RequestParam String scheduleOpen) {
        return adminService.getOccupiedTimes(screenNo, scheduleOpen);
    }
    
    /*등록된 스케줄 (주 단위)*/
    @GetMapping("/schedule/week")
    public ResponseEntity<List<ScheduleDTO>> getWeeklySchedule(@RequestParam String startDate) {
        List<ScheduleDTO> list = adminService.getWeeklySchedule(startDate);
        return ResponseEntity.ok(list);
    }

    
    
    /*-------- 회원 관리 --------*/
    /*회원 목록*/
    @GetMapping("/member")
    public ResponseEntity<List<MemberDTO>> memberList() {
    	List<MemberDTO> memberList = adminService.memberList();
    	return ResponseEntity.ok(memberList);
    }
    
    /*신고된 회원 목록*/
    
}
