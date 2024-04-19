import {create} from "zustand";

type settingTypes = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSetting = create<settingTypes>((set)=>({
     isOpen:false,
     onOpen: () => set({ isOpen:true }),
     onClose:() => set({ isOpen:false }),
}));