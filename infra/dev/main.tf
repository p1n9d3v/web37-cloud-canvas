terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
    }
  }
  required_version = ">= 0.13"
}

provider "ncloud" {
  access_key = var.access_key
  secret_key = var.secret_key
  support_vpc = true
  region      = "KR"
}

module "vpc_subnet" {
  source          = "../modules/vpc_subnet"
  vpc_name        = "dev"
  ipv4_cidr_block = "10.1.0.0/16"
  subnets = [
    {
      subnet     = "10.1.1.0/24"
      zone       = "KR-1"
      subnet_type = "PUBLIC"
      name       = "good"
      usage_type = "GEN"
    },
    {
      subnet     = "10.1.2.0/24"
      zone       = "KR-1"
      subnet_type = "PRIVATE"
      name       = "good2"
      usage_type = "GEN"
    }
  ]
}