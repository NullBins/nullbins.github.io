---
layout: default
title: "리눅스 SSH 접속 시 보이는 배너 설정"
date: 2026-05-01
categories: Linux
---

## Login Banner
### 1. Default Configuration

#### HOST (Linux)
```vim
vim /etc/ssh/sshd_config
```

> ![IMAGE](/assets/images/Linux/image04.png)

```vim
vim /etc/issue
```

> ![IMAGE](/assets/images/Linux/image05.png)

<span class="text-red">※ 원하는 배너 문구를 삽입</span>

```vim
systemctl restart sshd.service
```
```vim
logout
```

> ![IMAGE](/assets/images/Linux/image06.png)