FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    openssh-server \
    sudo \
    python3 \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /var/run/sshd
RUN useradd -m -s /bin/bash -G sudo devops && \
    echo "devops:devops" | chpasswd && \
    echo "devops ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config && \
    sed -i 's/#PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
