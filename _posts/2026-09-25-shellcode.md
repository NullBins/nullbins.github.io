---
layout: default
title: "(asm) shellcode 작성하기"
description: "(asm) shellcode 작성하기"
date: 2026-09-25
categories: Pwnable
---

## 1) 문자열을 ASCII 값으로 변환 및 Little-endian으로 바꾸기
>```bash
>echo -n "/bin/sh" | xxd -p
>```

> ![IMAGE](/assets/images/Pwnable/image09.png)

- `xxd -p`를 통해 ASCII로 변환. 현재는 Big-Endian 상태.

>```bash
>echo -n "2f62696e2f7368" | xxd -r -p
>```

> ![IMAGE](/assets/images/Pwnable/image10.png)

- `xxd -r -p`를 통해 다시 문자열로 변환.

>```bash
>echo -n "/bin/sh" | xxd -p -c 1
>```

> ![IMAGE](/assets/images/Pwnable/image11.png)

- `xxd -r -p`를 통해 문자 1개씩 끊어 한줄씩 출력.

>```bash
>echo -n "/bin/sh" | xxd -p -c 1 | tail -r
>```

> ![IMAGE](/assets/images/Pwnable/image12.png)

- `tail -r`을 통해 줄 단위 역순으로 출력.

>```bash
>echo -n "/bin/sh" | xxd -p -c 1 | tail -r | tr -d "\n"
>```

> ![IMAGE](/assets/images/Pwnable/image13.png)

- `tr -d "\n"`을 통해 줄바꿈(`\n`)을 지우고 한 문자열로 출력.

> ![IMAGE](/assets/images/Pwnable/image14.png)

- `"/bin/sh"` 문자열을 Little-Endian으로 변환 성공

---

## 2) execve("/bin/sh", NULL, NULL) 어셈블리 작성

```c
__asm__(
    ".global shell\n"
    "shell:\n"
    "mov rax, 0x68732f6e69622f\n"
    "push rax\n"
    "mov rdi, rsp\n"
    "xor rsi, rsi\n"
    "xor rdx, rdx\n"
    "mov rax, 0x3b\n"
    "syscall"
);
void shell(void);
```

- (Argument) *1*: `RDI`=`/bin/sh`, *2*: `RSI`=`NULL(0)`, *3*: `RDX`=`NULL(0)`
- (Syscall) `RAX`=`0x3B(59)`=`sys_execve`

>```bash
>gdb -q shell
>```

> ![IMAGE](/assets/images/Pwnable/image15.png)
> ![IMAGE](/assets/images/Pwnable/image16.png)

> ![IMAGE](/assets/images/Pwnable/image17.png)

- 정상적으로 shell 실행 성공

---

## 3) pwntools의 shellcraft를 사용한 shellcode 생성

> ![IMAGE](/assets/images/Pwnable/image18.png)

> ![IMAGE](/assets/images/Pwnable/image19.png)

- 간단하게 쓰기에 참 좋은것 같다.

---