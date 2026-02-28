---
title: Spring Security 5 and OAuth2
date: 2019-09-12
img: spring.png
tags:
  - Spring Boot
  - Security
  - OAuth2
---

# Introduction

[Spring OAuth2](https://projects.spring.io/spring-security-oauth/docs/oauth2.html)

Quick Start, OAuth2 defines 2 kind of server, authorization server is to authorize client request from logged user(password, implicit, authorization_code, refresh_token....). 

Resource Server relies on access token obtained from authorization server to serve the client with specified resource.

# Authorization Server 

## Gradle setting

Import security and oauth2-autoconfig

```groovy
    compile "org.springframework.security.oauth.boot:spring-security-oauth2-autoconfigure:2.1.7.RELEASE"
    compile 'org.springframework.boot:spring-boot-starter-security'
```

## WebSecurityConfig 

```java
@Configuration
@EnableWebSecurity
@Order(SecurityProperties.IGNORED_ORDER)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("UserDetailsService")
    private UserDetailsService userDetailsService;

    @Autowired
    @Qualifier("userPasswordEncoder")
    private PasswordEncoder userPasswordEncoder;

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(userPasswordEncoder);
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // @formatter:off
        /*
            1. Disable CSRF when oauth2 auth server, otherwize oauth/token return 403
            2. Don't apply security filter to /oauth/token, it will cause oauth2 default filter doesn't apply.
               So only make sure security protect specified url with requestMatchers.
         */
        http
                .requestMatchers()
                    .antMatchers("/login", "/oauth/authorize") // Don't protect everything, /oauth/token require client authentication, not user authentication.
                    .and()
                .authorizeRequests()
                    .anyRequest().authenticated()
                .and()
                    .formLogin()
                        .loginPage("/login") // Customized login page. Define a controller to serve the url.
                        .permitAll()
                .and()
                    .logout()
                        .permitAll()
                        .logoutSuccessUrl("/index.html")
                .and()
                    .csrf().disable();
        // @formatter:on
    }
}

```
## OAuth2 Authorization Server

```java
@Configuration
@EnableAuthorizationServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class OAuth2AuthorizationServer extends AuthorizationServerConfigurerAdapter
{
    @Autowired
    @Qualifier("dataSource")
    private DataSource dataSource;

    @Autowired
    @Qualifier("authenticationManagerBean")
    private AuthenticationManager authenticationManager; // Provided by WebSecurity Configuration

    @Autowired
    @Qualifier("oauthClientPasswordEncoder")
    private PasswordEncoder oauthClientPasswordEncoder; // Define a passwordEncode which used to encode client secret.


    @Bean
    public TokenStore tokenStore() {
        return new JdbcTokenStore(dataSource);
    }

    @Bean
    public OAuth2AccessDeniedHandler oauthAccessDeniedHandler() {
        return new OAuth2AccessDeniedHandler();
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) {
        oauthServer
                .tokenKeyAccess("permitAll()")
                .checkTokenAccess("isAuthenticated()")
                .passwordEncoder(oauthClientPasswordEncoder);

        // Add .allowFormAuthenticationForClients() will force to use form based client credential(client_id and client_secret
        // By default, use HTTP Basic, Authentication: Basic Base64(client_id:client_secret)
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.jdbc(dataSource); // Save your client into database
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
                .tokenStore(tokenStore()) // Use the same dataSource to save token.
                .authenticationManager(authenticationManager);
    }
}
```

# Resource Server

## Gradle Setting
Import security and oauth2-autoconfig

```groovy
    compile "org.springframework.security.oauth.boot:spring-security-oauth2-autoconfigure:2.1.7.RELEASE"
    compile 'org.springframework.boot:spring-boot-starter-security'
```

## OAuth2 Resource Server

```java
@Configuration
@EnableResourceServer
public class OAuth2ResourceServer extends ResourceServerConfigurerAdapter {
    private final String RESOURCE_ID = "resource-server-rest-api";

    @Autowired
    @Qualifier("dataSource")
    private DataSource dataSource;

    @Bean
    public TokenStore tokenStore() {
        return new JdbcTokenStore(dataSource); // Same store
    }


    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources
                .resourceId(RESOURCE_ID)
                .stateless(false)
                .tokenStore(tokenStore());
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .requestMatchers()
                    .antMatchers("/api/**", "/sns/**", "/publish/**", "/graphql/**")
                    .and()
                .authorizeRequests()
                    .anyRequest()
                    .authenticated();
    }
}
```

## Shared UserDetails implementation class

Spring OAuth2 save user details with a serialized class UserDetailsImpl. So it means Auth Server and Resource Server need to share the same class if use database.

Otherwise Resource Server need to use /oauth/check_token endpoint exposed by Authorization Server to verify the access token, and get user detail.

```java
public class UserDetailsImpl implements UserDetails {
    ...
}
```
