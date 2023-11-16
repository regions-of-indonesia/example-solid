import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import clsx from "clsx";

const Label = (props: JSX.IntrinsicElements["label"]) => {
  const [local, other] = splitProps(props, ["class", "classList", "onChange"]);
  return <label {...other} class={clsx("text-neutral-11 text-base font-medium", local.class, local.classList)} />;
};

export default Label;
