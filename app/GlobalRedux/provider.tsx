"use client";

import { Provider } from "react-redux";
import { store } from "./store";

// Chlidren any because we don't know what the children will be

export function Providers({ children }: { children: any }) {
  return <Provider store={store}>{children}</Provider>;
}
