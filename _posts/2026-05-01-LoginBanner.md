---
layout: default
title: "리눅스 SSH 접속 시 보이는 배너 설정"
description: "Debian 계열 리눅스에서 SSH 로그인 배너를 설정하고 /etc/issue와 sshd_config를 이용해 접속 메시지를 적용하는 방법을 정리"
date: 2026-05-01
categories: Linux
---

## Login Banner
### 1. Default Configuration

#### HOST (Linux)
```vim
vim /etc/ssh/sshd_config
```

> ![sshd_config에서 SSH 로그인 배너를 활성화한 설정 화면](/assets/images/Linux/image04.png)

```vim
vim /etc/issue
```

> ![리눅스 /etc/issue 로그인 배너 문구 설정 화면](/assets/images/Linux/image05.png)

<span class="text-red">※ 원하는 배너 문구를 삽입</span>

```vim
systemctl restart sshd.service
```
```vim
logout
```

> ![SSH 재접속 시 로그인 배너가 표시된 화면](/assets/images/Linux/image06.png)