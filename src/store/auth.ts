import { Storage } from "@/constants";
import { getStorage } from "@/utils/storage";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuthStatus: (auth: Partial<AuthState>) => void;
}

const initialAuthState: Pick<AuthState, "isAuthenticated"> = {
  isAuthenticated: !!getStorage(Storage.token),
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialAuthState,
  setAuthStatus: (auth) => set(auth),
}));
