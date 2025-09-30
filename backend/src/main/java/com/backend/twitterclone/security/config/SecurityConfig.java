package com.backend.twitterclone.security.config;

import com.backend.twitterclone.security.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;


    // Configure Spring security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .authorizeHttpRequests(
                        // configure protected routes
                        authConfig -> authConfig
                                .requestMatchers("/public/**").permitAll()
                                .anyRequest().authenticated()
                        )
                .sessionManagement(
                        // configure session to be stateless
                config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .csrf(csrf -> csrf.disable())
                .cors(corsConfig -> corsConfig.configurationSource(corsConfigurationSource()))
                .formLogin(Customizer.withDefaults())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);    // add JWT filter in filter chain before BasicAuthenticationFilter

        return httpSecurity.build();
    }

    // Define CORS rules for frontend
    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000"));   // configure the frontend URL
        corsConfig.setAllowedMethods(Collections.singletonList("*"));   // allow frontend to use all REST methods
        corsConfig.setAllowedHeaders(Collections.singletonList("*"));
        corsConfig.setAllowCredentials(true);   // Allow sending of cookies and authentication headers (JWTs)
        corsConfig.setExposedHeaders(Arrays.asList("Authorization"));   // specify any custom header keys that frontend can access
        corsConfig.setMaxAge(3600L);    // allows caching the response to reduce unnecessary preflight requests

        // apply cors config to all paths (or specific paths as required)
        UrlBasedCorsConfigurationSource urlCorsConfig = new UrlBasedCorsConfigurationSource();
        urlCorsConfig.registerCorsConfiguration("/**", corsConfig);

        return urlCorsConfig;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
