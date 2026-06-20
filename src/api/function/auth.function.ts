import { supabase } from "@/lib/supabase.config";
import { LoginPayload, SignupPayload } from "@/types/interfaces/auth.interface";
import { setCookie } from "cookies-next";

export const signupFns = async (payload: SignupPayload) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    if (authError) throw authError;

    if (!authData.user) throw new Error("Auth User not created");

    const userID = authData.user.id;

    const { data: registrationData, error: faiedRegistrayion } = await supabase
      .from("users")
      .insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        role: "USER",
        auth_user_id: userID,
      });
    if (faiedRegistrayion) throw faiedRegistrayion;

    console.log("data in the regist", registrationData);
    return {
      success: true,
      message: "Signup Successfully",
      data: registrationData,
    };
  } catch (error) {
    const err = error as { message: string };
    return {
      success: false,
      message: err.message || "Signup Failed",
    };
  }
};
export const loginFns = async (payload: LoginPayload) => {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
    console.log("auth data", authData);
    if (authError) throw authError;
    if (!authData.user) throw new Error("Login Failed");
    const { data: profile, error: profileFailed } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", authData.user.id)
      .single();
    if (profileFailed) throw profileFailed;
    console.log("profile", profile);

    setCookie("token", authData.session.access_token, {
      maxAge: 60 * 60 * 24 * 7,
    });
    setCookie("role", profile.role, {
      maxAge: 60 * 60 * 24 * 7,
    });
    setCookie("user", JSON.stringify(profile), {
      maxAge: 60 * 60 * 24 * 7,
    });
    return {
      success: true,
      message: "Login Successfully",
      data: profile,
    };
  } catch (error) {
    const err = error as { message: string };
    return {
      success: false,
      message: err.message || "Signup Failed",
    };
  }
};
