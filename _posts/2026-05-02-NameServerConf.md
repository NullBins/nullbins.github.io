---
layout: default
title: "Debian 리눅스 DNS(BIND9) 서버 구축"
date: 2026-05-02
categories: Linux
---

## DNS Service Configuration

### *1. Forward Lookup Zone Settings*

#### NameServer (Linux)

```vim
apt install -y bind9
```

<span class="text-red">※ 방화벽이 있다면 네임서버로 가는 DNS 포트를 열어준다 (UDP/TCP 53)</span>

```vim
vim /etc/bind/named.conf
```

> ![IMAGE](/assets/images/Linux/image13.png)

```vim
cp /var/cache/bind/db.0 /var/cache/bind/skills.zone
```
```vim
vim /var/cache/bind/skills.zone
```

> ![IMAGE](/assets/images/Linux/image14.png)

```vim
chown bind:bind -R /var/cache/bind/
```
```vim
named-checkconf /etc/bind/named.conf
named-checkzone skills.org /var/cache/bind/skills.zone
```

> ![IMAGE](/assets/images/Linux/image15.png)

<span class="text-red">※ 위와 같이 OK 가 출력이 돼야 한다</span>

```vim
systemctl restart bind9
```

---

### *2. Reverse Lookup Zone Settings*

#### NameServer (Linux)

```vim
apt install -y bind9
```

```vim
vim /etc/bind/named.conf
```

> ![IMAGE](/assets/images/Linux/image16.png)

```vim
cp /var/cache/bind/db.127 /var/cache/bind/192.rev
```
```vim
vim /var/cache/bind/192.rev
```

> ![IMAGE](/assets/images/Linux/image17.png)

```vim
chown bind:bind -R /var/cache/bind/
```

```vim
systemctl restart bind9
```

---

## DNS Master & Slave Service

### *1. DNS Master Server Settings*

#### MasterServer (Linux)

```vim
apt install -y bind9
```

```vim
vim /etc/bind/named.conf
```

> ![IMAGE](/assets/images/Linux/image18.png)

<span class="text-red">※ Slave DNS 서버로 사용할 서버 IP 주소를 적는다</span>

```vim
cp /var/cache/bind/db.0 /var/cache/bind/skills.zone
```
```vim
vim /var/cache/bind/skills.zone
```

> ![IMAGE](/assets/images/Linux/image19.png)

```vim
chown bind:bind -R /var/cache/bind/
```

```vim
systemctl restart bind9
```

### *2. DNS Slave Server Settings*

#### SlaveServer (Linux)

```vim
apt install -y bind9
```

```vim
vim /etc/bind/named.conf
```

> ![IMAGE](/assets/images/Linux/image20.png)

<span class="text-red">※ Master DNS 서버 IP 주소를 적는다</span>

```vim
systemctl restart bind9
```

```vim
chown bind:bind -R /var/cache/bind/
ls -l /var/cache/bind/skills.zone
```

> ![IMAGE](/assets/images/Linux/image21.png)

<span class="text-red">※ 위와 같이 zone 파일을 받아와야 한다</span>

---

## DNS Internal & External Zone

### *1. Internal and External Zone Settings*

#### NameServer (Linux)

```vim
apt install -y bind9
```

```vim
vim /etc/bind/named.conf
```

> ![IMAGE](/assets/images/Linux/image22.png)

<span class="text-red">※ 외부 네트워크와 내부 네트워크에 허용할 네트워크를 입력하면 된다</span>

```vim
systemctl restart bind9
```

---