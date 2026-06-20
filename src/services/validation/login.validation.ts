import * as yup from "yup"

export const LoginSchema = yup.object({
    email:yup.string().email().required("Email is Required"),
    password:yup.string().required("Password is Required")
})