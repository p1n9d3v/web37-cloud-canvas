variable "vpc_name" {
  description = "(Optional) The name to create. If omitted, Terraform will assign a random, unique name."
  type = string
  default = null
}

variable "ipv4_cidr_block" {
    description = "(Required) The CIDR block of the VPC. The range must be between /16 and/28 within the private band(10.0.0/8,172.16.0.0/12,192.168.0.0/16)."
    type = string
}

variable "public_subnet" {
  type = map(object({
    subnet = string
    zone = string
    name = string
    usage_type = string
  }))
  default = {}
}

variable "private_subnet" {
  type = map(object({
    subnet = string
    zone = string
    name = string
    usage_type = string
  }))

  default = {}
}