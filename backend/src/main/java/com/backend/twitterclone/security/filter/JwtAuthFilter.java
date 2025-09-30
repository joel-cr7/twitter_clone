package com.backend.twitterclone.security.filter;

import com.backend.twitterclone.entity.User;
import com.backend.twitterclone.security.config.JwtConstants;
import com.backend.twitterclone.security.service.JWTService;
import com.backend.twitterclone.security.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTService jwtService;

    private final UserService userService;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver handlerExceptionResolver;


    /**
     * Overriding the method to skip routes where the filter should not be applied
     *
     * @param request
     * @return boolean
     * @throws ServletException
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        List<String> EXCLUDE_ROUTES = List.of("/public/auth/signup", "/public/auth/login", "/public/auth/refresh");
        return EXCLUDE_ROUTES.contains(request.getServletPath());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        log.info("#### Inside JWT Auth Filter");

        try {
            String authToken = request.getHeader(JwtConstants.AUTHORIZATION_HEADER);

            if(authToken == null || !authToken.startsWith(JwtConstants.BEARER)){
                filterChain.doFilter(request, response);
                return;
            }

            String jwtToken = authToken.substring(7);

            // get userId from token
            Long userId = jwtService.getUserIdFromToken(jwtToken);
            log.info("Extracted userId from token: {}", userId);

            if(userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userService.findUserById(userId);

                // set Spring Security Context
                Authentication authentication = new UsernamePasswordAuthenticationToken(user, null,
                        user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);

        } catch (Exception ex) {
            handlerExceptionResolver.resolveException(request, response, null, ex);
        }

    }
}
