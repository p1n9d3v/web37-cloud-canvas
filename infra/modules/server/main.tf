terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
    }
  }
  required_version = ">= 0.13"
}

resource ncloud_server "servers" {
    for_each = {for s in var.servers : s.name => s }
    server_image_product_code = each.value.server_image_product_code
    server_product_code = each.value.server_product_code
    server_spec_code = each.value.server_spec_code
    member_server_image_no = each.value.member_server_image_no
    name = each.value.name
    description = each.value.description
    login_key_name = each.value.login_key_name
    zone = each.value.zone
    subnet_no = each.value.subnet_no
}