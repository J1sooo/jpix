package com.shingu.jpix.domain;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@AuthenticationPrincipal(expression = "T(com.shingu.jpix.auth.SecurityUtils).checkAuthenticationPrincipal(#this)")
public @interface AuthUser {
}