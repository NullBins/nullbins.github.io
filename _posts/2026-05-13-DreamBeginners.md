---
layout: default
title: "Dream Beginners 학습 정리"
date: 2026-05-13
categories: Hacking
---

## Introduction to Dreamhack

### Web Hacking
- **웹 해킹(Web Hacking)** 은 웹을 대상으로 하는 해킹 및 관련 기술을 뜻 함.
- ( Server ) <-> ( Client ) 사이 발생하는 각종 취약점과 이를 공격하는 기법들이 포함 됨.

---

### System Hacking (a.k.a. Pwnable)
- **시스템 해킹(System Hacking, SW Hacking)** 은 소프트웨어의 취약점을 찾아서 이를 공격하는 해킹 분야를 뜻 함.

---

### Reverse Engineering
- **리버스 엔지니어링(Reversing)** 은 프로그램을 역으로 분석하여 작동 원리를 알아내는 기술로, SW의 취약점을 파악하거나 악성 프로그램(Malware)의 행동을 분석하는 등의 용도로 사용된다.

---

### Cryptography
- **암호학(Cryptography)** 은 본래의 정보를 보호하기 위한 언어학적 및 수학적 방법론을 다루는 학문이다.

---

### Digital Forensics
- **디지털 포렌식(Digital Forensics)** 은 기업의 정보 유출, 악성코드 감염, 내부자 위협 등 다양한 사이버 사건의 이면을 밝혀내고, 그 증거를 수집하는 분야 및 관련 기술을 뜻한다.

---

### What is Wargame?
- **워게임(Wargame)** 은 의도적으로 취약점이 존재하도록 설계된 모의 해킹 환경이다.
- 모의 해킹은 보안 컨설팅의 일종으로 워게임이란 표현보다 모의 해킹이라고 불러야 더 정확한 표현이다.
- 일반적으로 워게임의 카테고리는 **Pwnable, Web, Reversing, Crypto, Forensics, Misc(Miscellaneous)** 등이 있다.

---

### What is CTF?
- **CTF(Capture the Flag)** 란 공격 대상 시스템이 존재하는 어떤 파일(*FLAG*)의 내용을 알아내고 답안으로 제출하여 문제를 푸는 대회이다.
- 얼마가 걸리든 충분히 고민하여 문제를 풀 수 있는 워게임과 달리, *CTF*는 **정해진 시간 동안 가장 빠르게**, **가장 많은 문제를 해결**하는 것을 **목표**로 다른 참가자와 경쟁하는 구조이다.

---

## Computer Science Basics
- **최상위 비트(MSB, Most Significant Bit)**, **최하위 비트(MLB, Most Least Bit)** 란?
- MSB는 이진 데이터에서 가장 왼쪽에 있는 비트, MLB는 이진 데이터에서 가장 오른쪽에 있는 비트를 뜻한다.
    ```text
    0b10010100 -> MSB(1), MLB(0)
    ```
- **부호 비트**: Signed 데이터, Unsigned 데이터 구분. 1이면 음수 0이면 양수
    ```text
    0b10010100가 부호 비트 데이터라면 -> -(1101011 + 1 == 1101100) -> -(64 + 32 + 8 + 4) = -108
    0b10010100가 부호 비트 데이터가 아니면 -> (128 + 16 + 4) = 148
    ```
- **바이트 오더링(Byte Ordering)**
    - 빅 엔디안(Big-endian) -> 가장 왼쪽에 있는(큰) 바이트부터 메모리의 낮은 주소에 저장됨
        - 대표적으로 네트워크 상 데이터를 전송할때 해당 방식이 사용됨
        ```text
        addr: 0x100(Val: 0x67) 0x101(Val: 0x45)
        ```
    - 리틀 엔디안(Little-endian) -> 가장 오른쪽에 있는(작은) 바이트부터 메모리의 낮은 주소에 저장됨
        - 대표적으로 Intel의 x86, x86-64 CPU에서 리틀 엔디안이 사용된다. (대다수의 컴퓨터 및 서버가 이 CPU로 돌아가기에 중요함!!)
        ```text
        addr: 0x100(Val: 0x45) 0x101(Val: 0x67)
        ```

---

## Linux
- ? : a-z, 0-9 범위 내 임의의 1개 문자로 대체된다. (*이런게 있었네?*)
```bash
ls -l .
-rw-rw-r-- 1 user user ./hello
cat he?lo
Hello world!
```
- **chmod**: setuid -> 4, setgid -> 2, sticky bit -> 1
- chmod u+s ./hello
- chmod g+s ./hello
- chmod o+t ./hello
- 그 외는 전부 알고있음

---

## Docker
- blue-whale
```bash
cd /tmp/
wget https://github.com/wagoodman/dive/releases/download/v0.13.1/dive_0.13.1_linux_amd64.deb
apt install ./dive_0.13.1_linux_amd64.deb
```
>```vim
>dive dreamhackofficial/blue-whale:1
>```
> ![IMAGE](/assets/images/Linux/image32.png)

---