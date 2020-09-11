# Study
기술의목마름
# Goal
- Python based Web Framework
- Embedded Javascript ES5 based .net SCADA Framework

# Development Environment
- Window based Docker
- CentOS lastest 8
- Python 3.8.5
- Go 1.15.2
- VSCode Remote Deveopment Attach to Running Container (Docker)

# Setup Development Environment
- Docker
  - powershell
  - docker search centos
  - docker images
  - docker pull centos or docker pull centos:8
  - docker run -it -p 8081:8082 --name testbed /bin/bash
  - docker ps
  - docker ps -a
  - docker rm [containername]
  - docker rmi [imagename]
  - docker stop [containername]
  - docker start [containername]
  - docker exec -it [containername] /bin/bash
  
- CentOS
  - mkdir workspace
  
- Python 3.8.5
  - yum install gcc openssl-devel bzip2-devel libffi-devel
  - yum install wget
  - yum install make
  - wget https://www.python.org/ftp/python/3.8.5/Python-3.8.5.tgz
  - ./configure, make, make install
  
- Go 1.15.2
  - wget https://golang.org/dl/go1.15.2.linux-amd64.tar.gz
  - tar -C /usr/local -xf go1.15.2.linux-amd64.tar.gz
  - shell PATH setting
  
- git
  - yum install git
  - git config -l
  - git config --global color.ui auto
  - git config --global alias.st status
  - git config --global user.name "[name]"
  - get config --global user.email [mailaddress]
  - github setting
  
- VSCode (Windows)
  - install extension "Remote Development"
  - restart
  - ^~+p
  - Docker running state
  - Remote-Containers : Attach to Running Container...
  - Select Docker Container
  - giithub setting
  - Python Plug_in Install
  - Go Plug_in Install
  
# Trouble Shooting
- docker /bin/bash
