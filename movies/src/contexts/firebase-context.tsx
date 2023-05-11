import { FirebaseApp, initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import React from "react";

export interface FirebaseContextProps {
  firebaseApp: FirebaseApp | null;
  firebaseAuth: Auth | null;
}

const firebaseConfig = {
  apiKey: "AIzaSyD1ZfoFuvM_VPgXBDMxNC8R9gslOErNyNs",
  authDomain: "reactmovies-90cc4.firebaseapp.com",
  projectId: "reactmovies-90cc4",
  storageBucket: "reactmovies-90cc4.appspot.com",
  messagingSenderId: "1087180156732",
  appId: "1:1087180156732:web:55866e8a6f772de8a9f839",
  measurementId: "G-Z1GR4P3CMQ",
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

const initFirebase = () => {
  if (!app || getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  }

  return app;
};

const FirebaseContext = React.createContext<FirebaseContextProps>({
  firebaseApp: initFirebase(),
  firebaseAuth: null,
});

export const FirebaseContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [firebaseApp, setFirebaseApp] = React.useState<FirebaseApp | null>(app);
  const [firebaseAuth, setFirebaseAuth] = React.useState<Auth | null>(auth);

  //For security: set context props if they doesn't exists already
  React.useEffect(() => {
    if (!firebaseApp) {
      setFirebaseApp(initFirebase());
    }

    if (!firebaseAuth) {
      setFirebaseAuth(getAuth());
    }
  }, [firebaseApp, firebaseAuth]);

  const contextValue: FirebaseContextProps = React.useMemo(
    () => ({
      firebaseApp,
      firebaseAuth,
    }),
    [firebaseApp, firebaseAuth]
  );

  //A context is a component that doesn't return HTML
  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

//Hook
export const useFirebaseContext = () =>
  React.useContext<FirebaseContextProps>(FirebaseContext);
