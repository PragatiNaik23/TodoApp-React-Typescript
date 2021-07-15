import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useState } from "react";

interface currentUserInterface {
    username?: string | undefined;
    setUserName?: Dispatch<SetStateAction<string>> 
}

const currentUserContext = createContext<currentUserInterface | null>(null);

type userProviderProps = {
    children: ReactNode;
  };

function UserProvider({
    children,
  }: userProviderProps): ReactElement{
    const [username, setUserName] = useState('');

    return (
        <currentUserContext.Provider
      value={{username, setUserName}}
    >
      {children}
    </currentUserContext.Provider>
    );

}

const UserConsumer = currentUserContext.Consumer;
 
export { UserProvider, UserConsumer };
export default currentUserContext;

