output "vpc_id" {
    description = "The ID of VPC."
    value = ncloud_vpc.vpc.id
}

output "public_subnet" {
    description = "The name to create. If omitted, Terraform will assign a random, unique name."
    value = ncloud_subnet.public[*]
}

output "private_subnet" {
    description = "The name to create. If omitted, Terraform will assign a random, unique name."
    value = ncloud_subnet.private[*]
}