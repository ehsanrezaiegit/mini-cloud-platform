terraform {
  required_version = ">= 1.6"
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

provider "docker" {}

# ۱. شبکه‌ای که هم رجیستری و هم نودهای kind روش قرار می‌گیرن
resource "docker_network" "kind" {
  name = "kind"
}

# ۲. کانتینر رجیستری خصوصی
resource "docker_image" "registry" {
  name = "registry:2"
}

resource "docker_container" "registry" {
  name    = "kind-registry"
  image   = docker_image.registry.image_id
  restart = "always"

  ports {
    internal = 5000
    external = var.registry_port
  }

  networks_advanced {
    name = docker_network.kind.name
  }
}

# ۳. فایل تنظیمات کلاستر رو از template می‌سازیم
resource "local_file" "kind_config" {
  filename = "${path.module}/kind-config.generated.yaml"
  content = templatefile("${path.module}/kind-config.yaml.tftpl", {
    cluster_name  = var.cluster_name
    registry_port = var.registry_port
  })
}

# ۴. خود کلاستر kind (چون provider رسمی نداره، با local-exec می‌سازیمش)
resource "null_resource" "kind_cluster" {
  depends_on = [docker_network.kind, docker_container.registry, local_file.kind_config]

  triggers = {
    cluster_name = var.cluster_name
    config_hash  = local_file.kind_config.content_md5
  }

  provisioner "local-exec" {
    command = "kind create cluster --name ${self.triggers.cluster_name} --config ${local_file.kind_config.filename}"
  }

  provisioner "local-exec" {
    when    = destroy
    command = "kind delete cluster --name ${self.triggers.cluster_name}"
  }
}

# ۵. به کلاستر می‌گیم رجیستری محلی رو بشناسه (استاندارد رسمی kind)
resource "null_resource" "registry_configmap" {
  depends_on = [null_resource.kind_cluster]

  triggers = {
    cluster_name = var.cluster_name
  }

  provisioner "local-exec" {
    command = <<-EOT
      kubectl --context kind-${self.triggers.cluster_name} apply -f - <<EOK
      apiVersion: v1
      kind: ConfigMap
      metadata:
        name: local-registry-hosting
        namespace: kube-public
      data:
        localRegistryHosting.v1: |
          host: "localhost:${var.registry_port}"
          help: "https://kind.sigs.k8s.io/docs/user/local-registry/"
      EOK
    EOT
  }
}
