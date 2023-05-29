import React, { ReactNode } from "react";
import "./ContentWrapper.scss";

type MyComponentProps = {
  children: ReactNode;
};

const ContentWrapper: React.FC<MyComponentProps> = ({ children }) => {
  return <div className="content__wrapper">{children}</div>;
};

export default ContentWrapper;
