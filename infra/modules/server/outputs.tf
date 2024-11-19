output "servers_login_key" {
  value     = ncloud_login_key.servers_login_key.private_key
  sensitive = true
}