import { loginFns, signupFns } from "@/api/function/auth.function";
import { supabase } from "@/lib/supabase.config";
import { AuthState, LoginPayload, SignupPayload } from "@/types/interfaces/auth.interface";
import { deleteCookie } from "cookies-next";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set)=>({
    isLoading:false,
    isAuthenticate:false,
    isError:null,
    role:null,
    user:null,
    signupUser: async (payload: SignupPayload) => {
    console.log("data in auth store", payload);
    set({ isLoading: true, isError: null });
    try {
      const res = await signupFns(payload);
      return res;
    } catch (error) {
      const err = error as { message: string };
      set({ isLoading: false, isError: err?.message });
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
  loginUser: async (payload: LoginPayload) => {
    set({ isLoading: true, isError: null });
    try {
      const res = await loginFns(payload);
      set({
        isLoading: false,
        isError: null,
        isAuthenticate: true,
        role: res.data.role,
        user: res.data,
      });
      return res;
    } catch (error) {
      const err = error as { message: string };
      set({ isLoading: false, isError: err?.message });
      return error;
    } finally {
      set({ isLoading: false });
    }
  },


logout: async () => {
  try {
    // Remove Supabase session
    await supabase.auth.signOut();

    // Remove custom cookies
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("user");

    set({
      isAuthenticate: false,
      role: null,
      user: null,
      isError: null,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
},
}))