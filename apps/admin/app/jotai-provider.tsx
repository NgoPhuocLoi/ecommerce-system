import React, { ReactNode } from "react";
import { Provider } from "jotai";

const JotaiProviders = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProviders;
