import { createContext } from "react";

const currentUser = createContext<string | undefined>(undefined);

export default currentUser;
