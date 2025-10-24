package kr.co.iei.cs.pq.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.cs.notice.model.dto.NoticeFileDTO;
import kr.co.iei.cs.pq.model.dto.PQDTO;
import kr.co.iei.cs.pq.model.dto.PQFileDTO;
import kr.co.iei.cs.pq.model.service.PQService;
import kr.co.iei.utils.FileUtil;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/cs/pq")
public class PQController {
	@Autowired
	private PQService pqService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	
	@GetMapping
	public ResponseEntity<Map> PQList(@RequestParam int reqPage, @RequestParam String pqTitle, @RequestParam String memberId, @RequestParam int memberLevel, @RequestParam int pqCategory){
		System.out.println("category:"+pqCategory);
		Map map = pqService.PQList(reqPage,pqTitle, memberId, memberLevel, pqCategory);
		return ResponseEntity.ok(map);
	}
	@PostMapping(value="/frm")
	public ResponseEntity<Integer> insertPQ(@ModelAttribute PQDTO pq, @ModelAttribute MultipartFile[] pqFile){
		List<PQFileDTO> pqFileList = new ArrayList<PQFileDTO>();
		
		if(pqFile != null) {
			String savepath = root + "/pq/";
			for(MultipartFile file : pqFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.upload(savepath, file);
				PQFileDTO fileDTO = new PQFileDTO();
				fileDTO.setFilename(filename);
				fileDTO.setFilepath(filepath);
				pqFileList.add(fileDTO);
			}
		}
		int result = pqService.insertPQ(pq, pqFileList);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value="/detail/{pqNo}")
	public ResponseEntity<PQDTO> selectOnePQ(@PathVariable int pqNo){
		PQDTO pq = pqService.selectOnePQ(pqNo);
		return ResponseEntity.ok(pq);
	}
	@PatchMapping(value="/pqAnswer")
	public ResponseEntity<Integer> UpdatePQAnswer(@RequestBody PQDTO pq){
		int result = pqService.updatePQAnswer(pq);
		return ResponseEntity.ok(result);
	}
}
