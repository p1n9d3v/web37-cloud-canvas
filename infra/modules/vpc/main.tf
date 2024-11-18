resource "ncloud_vpc" "vpc" {
    for_each = toset(va)
}