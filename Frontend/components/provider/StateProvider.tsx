"use client";

import { store } from "../../store/index";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface Props {
  children?: ReactNode;
}

const StateProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StateProvider;
