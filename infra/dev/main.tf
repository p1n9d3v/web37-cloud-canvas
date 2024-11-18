terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
    }
  }
  required_version = ">= 0.13"
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


module "server" {
  source = "../modules/server"
  login_key_name = "dev-login"
  servers = [
    {
      name = "test"
      subnet_no = module.vpc_subnet.public_subnets[0].good.id
      server_image_product_code = "SW.VSVR.OS.LNX64.ROCKY.0808.B050"
    }
  ]
}