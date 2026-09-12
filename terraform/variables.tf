variable "cluster_name" {
  description = "اسم کلاستر kind"
  type        = string
  default     = "mini-cloud"
}

variable "registry_port" {
  description = "پورتی که رجیستری محلی روی هاست گوش می‌ده"
  type        = number
  default     = 5001
}
