import * as yup from "yup";

export const blogSchema = yup.object({
  title: yup.string().required("Title is Required"),
  slug: yup.string().required("Slug/Category is Required"),
  content: yup.string().required("Content is Required"),
  featured_images: yup
    .mixed<File>()
    .nullable()
    .defined(),
});