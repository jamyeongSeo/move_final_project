package kr.co.iei;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@Configuration
@EnableWebSocket//웹소켓 활성화0
public class WebConfig implements WebMvcConfigurer{
	
	@Value("${file.root}")
	private String root;
	
	@Bean
	public BCryptPasswordEncoder bCrypt() {
		return new BCryptPasswordEncoder();
	}
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry
			.addResourceHandler("/editor/**")
			.addResourceLocations("file:///"+root+"/editor/");
		registry
		.addResourceHandler("/notice/**")
		.addResourceLocations("file:///"+root+"/notice/");
		
		registry
		.addResourceHandler("/admin/movie/**")
		.addResourceLocations("file:///"+root+"/thumb/");
	}	

}
