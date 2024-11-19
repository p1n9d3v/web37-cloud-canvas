terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
    }
  }
  required_version = ">= 0.13"
}

resource "ncloud_login_key" "servers_login_key" {
  key_name = var.login_key_name
}

resource "ncloud_server" "public_servers" {
    for_each = {for s in var.public_servers : s.name => s }
    server_image_product_code = each.value.server_image_product_code
    server_product_code = each.value.server_product_code
    server_spec_code = each.value.server_spec_code
    member_server_image_no = each.value.member_server_image_no
    name = each.value.name
    description = each.value.description
    login_key_name = ncloud_login_key.servers_login_key.key_name
    zone = each.value.zone
    subnet_no = each.value.subnet_no
}

resource "ncloud_server" "private_servers" {
    for_each = {for s in var.private_servers : s.name => s }
    server_image_product_code = each.value.server_image_product_code
    server_product_code = each.value.server_product_code
    server_spec_code = each.value.server_spec_code
    member_server_image_no = each.value.member_server_image_no
    name = each.value.name
    description = each.value.description
    login_key_name = ncloud_login_key.servers_login_key.key_name
    zone = each.value.zone
    subnet_no = each.value.subnet_no
}

resource "ncloud_public_ip" "public_ips" {
  for_each = {for ps in ncloud_server.public_servers : ps.name => ps}
  server_instance_no = each.value.id
}