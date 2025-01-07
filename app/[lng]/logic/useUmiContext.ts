import { createContext } from "react";

import { useUmi } from "./useUmi";

type UmiContextType = ReturnType<typeof useUmi>;

export const UmiContext = createContext<UmiContextType>({} as UmiContextType);
