---
layout: default
title: "알아두면 좋은 리눅스 명령어 정리"
date: 2026-05-04
categories: Linux
---

## Linux Commands (Helpful with hacking)

### *1. Find Command*

#### HOST (Linux)

>```bash
>man find
>```

- ```-type```: 특정 파일만 찾아라.
    - ```f```: 일반 파일 (File)
    - ```d```: 디렉터리 (Directory)
    - ```l```: 심볼릭 링크 (Symbolic Link)
    - ```c```: 캐릭터 디바이스 파일 (Character special file: 키보드, 마우스 등 문자를 하나씩 입출력하는 장치)
    ```bash
    find ./ -type f # 현재 디렉터리 하위로 파일만 전부 찾아라
    ```
- ```-name```: 이름을 기준으로 찾아라.
    ```bash
    find ./ -name "*.c" # 현재 디렉터리 하위로 확장자가 .c 인 파일만 찾아라
    find ./ -iname "*.c" # 위와 같은데, 대소문자 상관없이 전부 찾아라
    ```
- ```-exec```: find로 찾아낸 각각의 대상(file, directory)으로 지정한 명령어를 즉시 실행해라.
    - ```{}```: 찾아 낸 대상(파일, 디렉터리)를 담아두는 바구니
        ```bash
        find ./ -name "*.c" -exec cp {} ./backup/{}.bak \; # 현재 하위로 찾은 C언어 파일들을 ./backup/ 디렉터리에 .bak 이라는 확장자로 복사한다.
        ```
    - ```\;```: 개별 실행모드 (cat file1; cat file2)
    - ```+```: 일괄 실행모드 (cat file1 file2)
    > ![IMAGE](/assets/images/Linux/image23.png)
- ```-ok```: exec와 같지만, 명령어 실행 여부를 물어본다 (y/n)
    > ![IMAGE](/assets/images/Linux/image24.png)
- ```-execdir```: 안전한 디렉터리 모드 (현재 위치가 아닌 찾은 파일이 있는 디렉터리로 이동하여 명령어 실행하게 됨)
- ```-okdir```: ```-ok```와 ```-execdir```를 합친 명령어이다
- ```-size```: 파일의 크기(용량)을 기준으로 파일을 찾아라.
    - ```+```: ~보다 큰 파일을 찾아라 (-size +1G, 1GB 보다 큰 파일을 찾아라)
    - ```-```: ~보다 작은 파일을 찾아라 (-size -1G, 1GB 보다 작은 파일을 찾아라)
    - ```c```: 바이트 단위 (10c = 10Byte)
    - ```k```: 킬로 바이트 단위 (10k = 10KB)
    - ```M```: 메가 바이트 단위 (10M = 10MB)
    - ```G```: 기가 바이트 단위 (10G = 10GB)
- ```-empty```: 비어있는 파일 or 용량이 0인 파일 찾기

---

### *2. Stat Command*

#### HOST (Linux)

>```bash
>man stat
>```

- ```-c```: 파일의 상세 정보 중 내가 원하는 포맷 형태로 출력해라
    - ```"%n"```: 파일 이름
    - ```"%s"```: 파일의 전체 크기 (바이트 단위)
    - ```"%F"```: 파일의 종류
    - ```"%a"```: 파일 권한을 숫자로 표시 (755, 644)
    - ```"%A"```: 파일 권한을 문자로 표시 (-rwxr-xr-x)
    - ```"%U"```: 파일 소유자 이름 (root, sysop)
    - ```"%u"```: 파일 소유자 UID 넘버 (0, 1000)
    - ```"%G"```: 파일 소유 그룹 (root, staff)
    - ```"%g"```: 파일 소유 그룹 GID 넘버 (10000, 20000)
    ```bash
    stat -c "%n %U:%G" # 파일 이름, 파일 소유자 이름, 파일 소유 그룹 이름 표시 (file.txt root:root)
    ```
- ```-f```: macOS(FreeBSD) 기준 stat 포맷 형식
    - ```"%N"```: 파일 이름
    - ```"%z"```: 파일의 전체 크기 (바이트 단위)
    - ```"%Lp"```: 파일 권한을 숫자로 표시 (755, 644)
    - ```"%Su"```: 파일 소유자 이름 (root, sysop)
    - ```"%Sg"```: 파일 소유 그룹 (root, staff)
    ```bash
    stat -c "%N %Su:%Sg" # 파일 이름, 파일 소유자 이름, 파일 소유 그룹 이름 표시 (file.txt root:root)
    ```

---

### *3. Sort Command*

#### HOST (Linux)

>```bash
>man sort
>```

- ```-r```: 정렬을 역순으로 해라
- ```-u```: 중복된 값을 제거해라
> ![IMAGE](/assets/images/Linux/image25.png)

---

### *4. Uniq Command*

#### HOST (Linux)

>```bash
>man uniq
>```

- ```-c```: 중복된 횟수 세기
- ```-d```: 중복된 문자열만 보기 (Duplicate)
- ```-u```: 중복되지 않은 문자열만 보기 (Unique)
> ![IMAGE](/assets/images/Linux/image26.png)

---

### *5. Strings Command*

#### HOST (Linux)

>```bash
>man strings
>```

- ```-n```: 몇 글자 이상인 문자열만 출력
- ```-t x```: 글자가 숨겨진 위치(문자열이 들어가있는 주소) 찾기
> ![IMAGE](/assets/images/Linux/image27.png)

---

### *6. Tr Command*

#### HOST (Linux)

>```bash
>man tr
>```

- ```tr```: 특정 문자를 다른 문자로 1:1 대응으로 바꾸는 명령어
```bash
echo "Hello" | tr "A-Za-z" "N-ZA-Mn-za-m" # ROT13 암호화 및 복호화 명령어
```
> ![IMAGE](/assets/images/Linux/image28.png)

---

### *7. Diff Command*

#### HOST (Linux)

>```bash
>man diff
>```

- ```diff```: 텍스트 파일을 한 줄씩 확인하여 어느 부분이 다르고, 무엇이 추가/삭제 되었는지 확인하는 명령어
- ```-U 0```: 수정된 핵심 내용만 출력
> ![IMAGE](/assets/images/Linux/image29.png)