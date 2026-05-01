---
layout: default
title: "Debian 계열 리눅스 네트워크 인터페이스 이름 변경"
date: 2026-05-01
categories: Linux
---

## Network Adapter Name
### 1. Default Configuration

#### HOST (Linux)
```vim
vim /etc/default/grub
```
> ![IMAGE](/assets/images/Linux/image1.png)
```vim
ip link show | grep "link/ether" > /etc/udev/rules.d/70.rules
```

<span class="text-red">※ 현재 모든 어댑터들의 MAC주소를 /etc/udev/rules.d/70.rules 에 작성</span>

```vim
vim /etc/udev/rules.d/70.rules
```
> ![IMAGE](/assets/images/Linux/image2.png)

<span class="text-red">※ ATTR{address} 부분은 어댑터 MAC주소, NAME은 설정할 어댑터 이름</span>

```vim
reboot
```
```vim
ip link show
```
> ![IMAGE](/assets/images/Linux/image3.png)