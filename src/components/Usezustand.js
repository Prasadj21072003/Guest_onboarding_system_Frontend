import { create } from "zustand";

const Usezustand = create((set) => ({
  user: {},
  setuser: (data) => set({ user: data }),
  guestlogin: {},
  setguestlogin: (data) => set({ guestlogin: data }),
}));

export default Usezustand;
