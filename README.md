# Study
기술의목마름
# Goal
- Python based Web Framework
- Embedded Javascript ES5 based .net SCADA Framework
# Development Environment
- Window based Docker
- CentOS lastest 8
- Python 3.8.5
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
- CentOS
  - mkdir workspace
- Python 3.8.5
  - yum install gcc openssl-devel bzip2-devel libffi-devel
  - yum install wget
  - yum install make
  - wget https://www.python.org/ftp/python/3.8.5/Python-3.8.5.tgz
  - ./configure, make, make install
- git
  - yum install git
  - git config -l
  - git config --global color.ui auto
  - git config --global alias.st status
  - git config --global user.name "[name]"
  - get config --global user.email [mailaddress]
- VSCode (Windows)
  - install extension "Remote Development"
  - restart
  - ^~+p
  - Docker running state
  - Remote-Containers : Attach to Running Container...
  - Select Docker Container
  - giithub setting
