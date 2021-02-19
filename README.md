# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

RabbitMQ:

docker run -d --hostname tms-rabbit --name tms-rabbit -p 15672:15672 -p 5672:5672 
-e RABBITMQ_DEFAULT_VHOST=tmstest1 
-e RABBITMQ_DEFAULT_USER=rabbitmq 
-e RABBITMQ_DEFAULT_PASS=mercurygate 
rabbitmq:3-management

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### TODOs ###

* DB constraints consistent with API model validations
    - Max lengths
    - Acceptable characters
* Updated exception mapping
* Updated context injection
* Enforced request headers
  - Accept: "application/json;charset=utf-8" (or compatible)
  - X-MG-Tenant: "...valid-tenant-id..." (must be valid according to validation rules) 
* Enforced response headers
    - Content-Type (including all error responses): "application/json;charset=utf-8" (or compatible)
    - X-XSS-Protection: "0"
    - X-Content-Type-Options: "nosniff"
    - X-Frame-Options: "DENY
    - Cache-Control: "no-store"
    - Content-Security-Policy: "default-src 'none'; frame-ancestors 'none'; sandbox"
    - Server: "" (override existing non-blank value if any)
* Don't echo bad input back    
    
    