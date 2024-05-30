package com.shingu.jpix.Controller;

import com.shingu.jpix.domain.dto.JoinRequest;
import com.shingu.jpix.domain.dto.LoginRequest;
import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<User> join(@Valid @RequestBody JoinRequest joinRequest, BindingResult bindingResult) {

        // loginId 중복 체크
        if(userService.checkLoginIdDuplicate(joinRequest.getEmail())) {
            System.out.println("에러");
            bindingResult.addError(new FieldError("joinRequest", "email", "로그인 아이디가 중복됩니다."));
        }
        // 닉네임 중복 체크
        if(userService.checkNicknameDuplicate(joinRequest.getNickname())) {
            bindingResult.addError(new FieldError("joinRequest", "nickname", "닉네임이 중복됩니다."));
        }

        User user = userService.join(joinRequest);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/login")
    public String login(@ModelAttribute LoginRequest loginRequest, BindingResult bindingResult,
                        HttpServletResponse response) {
        User user = userService.login(loginRequest);

        // 로그인 아이디나 비밀번호가 틀린 경우 global error return
        if(user == null) {
            bindingResult.reject("loginFail", "로그인 아이디 또는 비밀번호가 틀렸습니다.");
        }

        if(bindingResult.hasErrors()) {
            return "login";
        }

        // 로그인 성공 => 쿠키 생성
        Cookie cookie = new Cookie("userId", String.valueOf(user.getId()));
        cookie.setMaxAge(60 * 60);  // 쿠키 유효 시간 : 1시간
        response.addCookie(cookie);

        return "redirect:/Recommended";
    }

}
