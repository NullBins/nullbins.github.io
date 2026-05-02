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

> ![IMAGE](https://github-production-user-asset-6210df.s3.amazonaws.com/101495051/586730771-295128c4-6ea0-426c-b065-fd466f71131e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260502T100347Z&X-Amz-Expires=300&X-Amz-Signature=b15a12b36af0d8d2dd1aa3feaee21f16807cbe744d82428d0e2ece86cae410e4&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng)

<span class="text-red">※ ens33은 인터페이스이고, netmask, network, broadcast 들은 굳이 쓰지 않아도 된다</span>

```vim
systemctl restart networking
```

### *1-2. IPv4 Address Settings (DHCP)*

#### HOST (Linux)

```vim
vim /etc/network/interfaces
```

> ![IMAGE](https://github-production-user-asset-6210df.s3.amazonaws.com/101495051/586731155-6c4f9084-9840-4d6b-961f-d10c5aedffc1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260502T100532Z&X-Amz-Expires=300&X-Amz-Signature=07b4fdbdf4cea83490efc55cefd0b42d94c878fcdf7b88da48d83ba464959302&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng)

```vim
systemctl restart networking
```

### *2-1. IPv6 Address Settings (Static)*

#### HOST (Linux)

```vim
vim /etc/network/interfaces
```

> ![IMAGE](https://github-production-user-asset-6210df.s3.amazonaws.com/101495051/586731246-1fda7498-e759-481c-9d0d-c438fb951376.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260502T100624Z&X-Amz-Expires=300&X-Amz-Signature=33d9d4852b7faade0fbcc4d167e47985bf262a9480ecaec7a2e6d817586fbfa9&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng)

```vim
systemctl restart networking
```

### *2-2. IPv6 Address Settings (DHCP)*

#### HOST (Linux)

```vim
vim /etc/network/interfaces
```

> ![IMAGE](https://github-production-user-asset-6210df.s3.amazonaws.com/101495051/586731289-50740b3f-0e30-482d-a946-cd6e602a99fc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260502T100700Z&X-Amz-Expires=300&X-Amz-Signature=8593abf3b233fddf5ca4456a0f88aab7887986cbab8ae08225df6fb51cdfa3c9&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng)

```vim
systemctl restart networking
```

### *3. DNS Nameserver Settings*

#### HOST (Linux)

```vim
vim /etc/resolv.conf
```

> ![IMAGE](https://github-production-user-asset-6210df.s3.amazonaws.com/101495051/586731342-7e16000b-e5b2-467a-90b7-0c885a5dcb3e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260502T100744Z&X-Amz-Expires=300&X-Amz-Signature=55b665020d6c4b70a69d1492016a16168fb0bbb1a4de6c1a98b53c438d53dcf3&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng)

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

> ![IMAGE](https://github-production-user-asset-6210df.s3.amazonaws.com/101495051/586732843-b84df0e8-36f4-4abb-b470-462fe6c25a1c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260502T102432Z&X-Amz-Expires=300&X-Amz-Signature=7935a969bb8a3f20f50468e1847b6d63e8b5835369bf5f39fb79244e942c12df&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng)

<span class="text-red">※ via는 넥스트 홉 라우터 IP 주소, dev는 인터페이스 이름</span>

```vim
systemctl restart networking
```

```vim
ip -6 route show
```