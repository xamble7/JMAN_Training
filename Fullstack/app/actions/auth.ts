"use server";

import { loginSchema, registerSchema } from "@/lib/definititons";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function signupAction(formData: FormData) {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const validateFields = registerSchema.safeParse(data);

  if (!validateFields.success) {
    return { errors: validateFields.error.issues };
  } else {
    const user = await prisma.users.findUnique({
      where: {
        email: validateFields.data!.email,
      },
    });
    if (user) {
      return { error: "User already exists. LogIn!" };
    } else {
      await prisma.users
        .create({
          data: {
            firstname: validateFields.data!.firstName,
            lastname: validateFields.data!.lastName,
            email: validateFields.data!.email,
            password: validateFields.data!.password,
          },
        })
        .then(() => {
          console.log("user added");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }
}
