package com.shingu.jpix.service;

import ch.qos.logback.classic.encoder.JsonEncoder;
import com.shingu.jpix.domain.dto.JoinRequest;
import com.shingu.jpix.domain.dto.LoginRequest;
import com.shingu.jpix.domain.dto.UserRequestDTO;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private JsonEncoder encoder;

    // Spring Security를 사용한 로그인 구현 시 사용
    // private final BCryptPasswordEncoder encoder;

    /**
     * loginId 중복 체크
     * 회원가입 기능 구현 시 사용
     * 중복되면 true return
     */
    public boolean checkLoginIdDuplicate(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }

    /**
     * nickname 중복 체크
     * 회원가입 기능 구현 시 사용
     * 중복되면 true return
     */
    public boolean checkNicknameDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * 회원가입 기능 1
     * 화면에서 JoinRequest(loginId, password, nickname)을 입력받아 User로 변환 후 저장
     * loginId, nickname 중복 체크는 Controller에서 진행 => 에러 메세지 출력을 위해
     */
    public User join(JoinRequest req) {
        String encodePassword = bCryptPasswordEncoder.encode(req.getPassword());
        return userRepository.save(req.toEntity(encodePassword));
    }

    /**
     * 회원가입 기능 2
     * 화면에서 JoinRequest(loginId, password, nickname)을 입력받아 User로 변환 후 저장
     * 회원가입 1과는 달리 비밀번호를 암호화해서 저장
     * loginId, nickname 중복 체크는 Controller에서 진행 => 에러 메세지 출력을 위해
     */
//    public void join2(JoinRequest req) {
//        userRepository.save(req.toEntity(encoder.encode(req.getPassword())));
//    }

    /**
     *  로그인 기능
     *  화면에서 LoginRequest(loginId, password)을 입력받아 loginId와 password가 일치하면 User return
     *  loginId가 존재하지 않거나 password가 일치하지 않으면 null return
     */
    public int save(UserRequestDTO.Signup dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }

        User user = User.builder()
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .username(dto.getNickname())
                .profileImage(dto.getProfileImage())
                .build();

        user = userRepository.save(user);

        return user.getId();
    }

    /**
     * userId(Long)를 입력받아 User을 return 해주는 기능
     * 인증, 인가 시 사용
     * userId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
     * userId로 찾아온 User가 존재하면 User return
     */
    public User getLoginUserById(int userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }

    /**
     * loginId(String)를 입력받아 User을 return 해주는 기능
     * 인증, 인가 시 사용
     * loginId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
     * loginId로 찾아온 User가 존재하면 User return
     */
    public User getLoginUserByLoginId(String email) {
        if(email == null) return null;

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }

    public User findUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. ID: " + id));
    }
}