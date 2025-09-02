// Providers.tsx
"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./authProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authenticator.Provider>
      {children} {/* everything that might call useAuthenticator */}
    </Authenticator.Provider>
  );
};

export default Providers;
