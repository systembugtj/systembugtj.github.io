---
title: Spring Cloud Practice Part 1 - Discovery and Config
date: 2016-11-02
img: spring.png
tags:
  - Java
  - Gradle
---

# Discovery and Config
## Eureka
Discovery First, Config will register itself to Eureka. 
The rest service like Api service will not have application.yml which will be loaded form Config service.

#### build.gradle

```gradle
...
buildscript {
    ext {
        springBootVersion = '1.4.0.RELEASE'
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
        classpath "io.spring.gradle:dependency-management-plugin:0.5.6.RELEASE"
    }
}

....

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-netflix:1.3.0.BUILD-SNAPSHOT'
    }
}
...

dependencies {
    compile ('org.springframework.cloud:spring-cloud-starter-eureka-server')
}
Spring Boot Applicaiton
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryApplication {
    public static void main(String[] args) {
        SpringApplication.run(DiscoveryApplication.class, args);
    }

}
```
### application.yml
```yml
spring:
  application:
    name: discovery
server:
  port: 8761

eureka:
  instance:
    prefer-ip-address: true // if run on docker or cloud, 
                            // no dns support, should use ip address for service.
  client:
    registerWithEureka: false
    fetchRegistry: false
    server:
      waitTimeInMsWhenSyncEmpty: 0
```
## Spring Cloud Config
### build.gradle

```gradle
... // same setting as Eureka
dependencies {
    compile('org.springframework.cloud:spring-cloud-config-server')
    compile("org.springframework.cloud:spring-cloud-starter-eureka")
    ...
}
```
### MainApplication.java

```java
Spring Boot Application
@SpringBootApplication
@EnableAutoConfiguration
@EnableConfigServer
@EnableEurekaClient
public class ConfigApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigApplication.class, args);
    }
}
```

### bootstrap.yml

```yml
spring:
  application:
    name:config &lt;= will be referred by other service.
eureka:
  instance:
    prefer-ip-address: true
    leaseExpirationDurationInSeconds: 2
    leaseRenewalIntervalInSeconds: 1
  client:
    serviceUrl:
      defaultZone: http://${EUREKA_HOST:localhost}:${EUREKA_PORT:8761}/eureka/
application.yml
server:
  port: 8888 &lt;= will be registered in Eureka
logging:
  level:
    com.netflix.discovery: 'OFF'
    org.springframework.cloud: 'DEBUG'
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github/systembugtj/sample-config.git &lt;= A git url
          searchPaths: appconfig &lt;= folder in the git
          username: user
          password: password
```

### git structure.
For example, have a RESTful API service named api. Then should have below file under appconfig for difference profile like uat/dev/preprod/prod .etc

app-uat.yml
app-dev.yml
app-prod.yml

## Sample Api Service to use Eureka and Config
###build.gradle
```gradle
... // same setting as Eureka
dependencies {
    compile('org.springframework.cloud:spring-cloud-config-server')
    compile("org.springframework.cloud:spring-cloud-starter-eureka")
    ...
}
```

### Spring Boot Application

```java
@SpringBootApplication
@EnableConfigServer
@EnableEurekaClient
@RestController
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigApplication.class, args);
    }

    @RequestMap ("/hello")
    public String hello() {
        return "hello";
    }
}
```
### bootstrap.yml

```yml
spring:
  application:
    name: api
  profiles:
    active: ${RUNNING_ENV:dev} &lt;= profile name
  cloud:
    config:
      discovery:
        enabled: true
        serviceId: config &lt;= name used by spring cloud config.
eureka:
  instance:
    prefer-ip-address: true
    leaseExpirationDurationInSeconds: 2
    leaseRenewalIntervalInSeconds: 1
  client:
    serviceUrl:
      defaultZone: http://${EUREKA_HOST:localhost}:${EUREKA_PORT:8761}/eureka/
```
