---
layout: default
title: "Debian 계열 리눅스 네트워크 인터페이스 이름 변경"
description: "Debian 계열 리눅스에서 GRUB와 udev 규칙을 이용해 네트워크 인터페이스 이름을 원하는 값으로 고정하는 방법을 정리"
date: 2026-05-01
categories: Linux
---

## Network Adapter Name
### 1. Default Configuration

#### HOST (Linux)
```vim
vim /etc/default/grub
```

> ![GRUB 네트워크 인터페이스 이름 설정 화면](/assets/images/Linux/image01.png)

```vim
ip link show | grep "link/ether" > /etc/udev/rules.d/70.rules
```

<span class="text-red">※ 현재 모든 어댑터들의 MAC주소를 /etc/udev/rules.d/70.rules 에 작성</span>

```vim
vim /etc/udev/rules.d/70.rules
```

> ![udev 규칙으로 네트워크 인터페이스 이름을 지정한 화면](/assets/images/Linux/image02.png)

<span class="text-red">※ ATTR{address} 부분은 어댑터 MAC주소, NAME은 설정할 어댑터 이름</span>

```vim
reboot
```

```vim
ip link show
```

> ![ip link show로 변경된 네트워크 인터페이스 이름을 확인한 화면](/assets/images/Linux/image03.png)