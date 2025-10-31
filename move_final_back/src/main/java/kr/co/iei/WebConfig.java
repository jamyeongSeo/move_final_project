package kr.co.iei;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@Configuration
@EnableWebSocket
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.root}")
    private String root;

    @Bean
    public BCryptPasswordEncoder bCrypt() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/editor/**")
                .addResourceLocations("file:///" + root + "/editor/");
        registry.addResourceHandler("/notice/**")
                .addResourceLocations("file:///" + root + "/notice/");
        registry.addResourceHandler("/admin/movie/**")
                .addResourceLocations("file:///" + root + "/thumb/");
        registry.addResourceHandler("/board/thumb/**") 
                .addResourceLocations("file:///" + root + "/thumb/");
        registry.addResourceHandler("/pq/**")
                .addResourceLocations("file:///" + root + "/pq/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                    "http://localhost:5173",
                    "https://movie-team-front.vercel.app" // 배포 시 도메인 추가
                )
                .allowedMethods("GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
