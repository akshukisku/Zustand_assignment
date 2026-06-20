// import { USER_ROLE } from "@/types/enum/enum";
import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup.string().email().required("Email is Required"),
  phone: yup.string().required("Phone Number is Required"),
  password: yup.string().required("Password is required"),
});