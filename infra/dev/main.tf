terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
    }
  }
  required_version = ">= 0.13"
}

provider "ncloud" {
  support_vpc = true
  region      = "KR"
}

module "vpc_subnet" {
  source          = "../modules/vpc_subnet"
  vpc_name        = "dev"
  ipv4_cidr_block = "10.1.0.0/16"
  private_subnet = {
    dev-test-1 = {
      subnet     = "10.1.1.0/24"
      zone       = "KR-1"
      name       = "good"
      usage_type = "GEN"
    }
  }
}