---
layout: default
title: "Debian 리눅스 IP 주소 설정 및 라우팅"
date: 2026-05-02
categories: Linux
---

## Network IP Address Settings

### *1-1. IPv4 Address Settings (Static)*

#### HOST (Linux)

```vim
apt install -y net-tools iproute2
ip link set ens33 up
ifconfig ens33 up
```

<span class="text-red">※ 인터페이스 링크가 down되어 있다면 up시켜줘야 함</span>

```vim
ip addr add 192.168.0.1/24 dev ens33
ifconfig ens33 192.168.0.1/24
ifconfig ens33 192.168.0.1 netmask 24
ip route add default via 192.168.0.254
route add default gw 192.168.0.254
```

<span class="text-red">※ 위 방식들은 시스템이 종료되면 IP 주소 및 라우팅 테이블 정보가 사라짐</span>

```vim
vim /etc/network/interfaces
```

> ![IMAGE](/assets/images/Linux/image07.png)

<span class="text-red">※ ens33은 인터페이스이고, netmask, network, broadcast 들은 굳이 쓰지 않아도 된다</span>

```vim
systemctl restart networking
```

### *1-2. IPv4 Address Settings (DHCP)*

#### HOST (Linux)

```vim
vim /etc/network/interfaces
```

> ![IMAGE](/assets/images/Linux/image08.png)

```vim
systemctl restart networking
```

### *2-1. IPv6 Address Settings (Static)*

#### HOST (Linux)

```vim
vim /etc/network/interfaces
```

> ![IMAGE](/assets/images/Linux/image09.png)

```vim
systemctl restart networking
```

### *2-2. IPv6 Address Settings (DHCP)*

#### HOST (Linux)

```vim
vim /etc/network/interfaces
```

> ![IMAGE](/assets/images/Linux/image10.png)

```vim
systemctl restart networking
```

### *3. DNS Nameserver Settings*

#### HOST (Linux)

```vim
vim /etc/resolv.conf
```

> ![IMAGE](/assets/images/Linux/image11.png)

<span class="text-red">※ nameserver 2개인 이유는 보조 DNS 서버, search는 resolving 할때 도메인을 제외하기 위함 (IPv6도 똑같이 설정)</span>

---

## IPv4 & IPv6 Routing

### *1. Static IPv4 Routing*

#### ROUTER (Linux)

```vim
ip route add 172.16.0.0/24 via 192.168.0.254 dev ens33
route add -net 172.16.0.0/24 gw 192.168.0.254
```

<span class="text-red">※ 위 방식은 시스템이 종료되면 라우팅 테이블 정보가 사라짐</span>

```vim
vim /etc/network/interfaces
```

>```vim
>up ip route add 172.16.0.0/24 via 192.168.0.254 dev ens33
>up route add -net 172.16.0.0/24 gw 192.168.0.254
>```

<span class="text-red">※ via는 넥스트 홉 라우터 IP 주소, dev는 인터페이스 이름</span>

```vim
systemctl restart networking
```

```vim
ip route show
```

### *2. Static IPv6 Routing*

#### ROUTER (Linux)

```vim
ip -6 route add 2001:AAAA::/64 via 2001:ABCD::FFFF dev ens33
```

<span class="text-red">※ 위 방식은 시스템이 종료되면 라우팅 테이블 정보가 사라짐</span>

```vim
vim /etc/network/interfaces
```

> ![IMAGE](/assets/images/Linux/image12.png)

<span class="text-red">※ via는 넥스트 홉 라우터 IP 주소, dev는 인터페이스 이름</span>

```vim
systemctl restart networking
```

```vim
ip -6 route show
```