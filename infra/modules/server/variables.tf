variable "servers" {
  description = "server module variables"
  type = list(object({
    server_image_product_code = optional(string)
    server_product_code = optional(string)
    server_spec_code = optional(string)
    member_server_image_no = optional(string)
    name = string
    description = optional(string)
    login_key_name = optional(string)
    zone = optional(string)
    subnet_no = string
  }))

  default = []
}