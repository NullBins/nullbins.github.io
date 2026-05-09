---
layout: default
title: "리눅스 프롬프트 색상 설정"
date: 2026-05-09
categories: Linux
---

## Set Linux prompt color

#### HOST (Linux)
```vim
vim ~/.bashrc
```
>```bash
>force_color_prompt=yes
>
>if [ "$color_prompt" = yes ]; then
>    PS1='${debian_chroot:+($debian_chroot)}\[\033[38;5;31m\]\u\[\033[1;32m\]@\[\033[1;36m\]\h\[\033[00m\]:\[\033[34m\]\w\[\033[32m\]\$\[\033[00m\] '
>else
>    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
>fi
>```
<span class="text-red">※ PS1 변수 값을 수정한다.</span>

#### Color Format
```bash
\[\033[00m\] # Color reset
```

#### Linux Console Image
> ![IMAGE](/assets/images/Linux/image30.png)

#### Linux Terminal Image
> ![IMAGE](/assets/images/Linux/image31.png)

---