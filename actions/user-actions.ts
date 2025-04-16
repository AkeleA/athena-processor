"use server";

import prisma from "@/lib/db";
import { authSchema, signIn, signOut, auth, hashPassword } from "@/lib/auth";
import { z } from "zod";

export const getSession = async () => {
  return await auth();
};

// Login function
export const login = async (data: z.infer<typeof authSchema>) => {
  const validation = authSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid email or password format." };
  }

  try {
    const result = await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: "Invalid email or password." };
    }

    return { success: true, message: "Logged in successfully." };
  } catch (error) {
    return { success: false, message: "Login failed. Please try again." };
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut();
    return { success: true, message: "Logged out successfully." };
  } catch (error) {
    return { success: false, message: "Logout failed. Try again." };
  }
};

// Registration function
export const register = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const signUpSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const validation = signUpSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid input data." };
  }

  const { firstName, lastName, email, password } = validation.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { success: false, message: "Email already exists." };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, message: "Account created successfully!" };
  } catch (error) {
    return { success: false, message: "Registration failed. Try again." };
  }
};
