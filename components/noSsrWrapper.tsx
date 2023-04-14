import dynamic from "next/dynamic";
import React, { FC, PropsWithChildren } from "react";

const NoSSRWrapper: FC<PropsWithChildren> = (props) => <React.Fragment>{props.children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
