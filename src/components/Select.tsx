import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import clsx from "clsx";

const Select = (
  props: Omit<JSX.IntrinsicElements["select"], "onChange" | "onchange"> & {
    onChange?: (
      value: string,
      event: Event & {
        currentTarget: HTMLSelectElement;
        target: HTMLSelectElement;
      }
    ) => void;
  }
) => {
  const [local, other] = splitProps(props, ["class", "classList", "onChange"]);
  return (
    <select
      {...other}
      class={clsx(
        "block w-full bg-neutral-1 text-neutral-12 focus:border-primary-9 rounded-xl focus:ring-primary-9",
        local.class,
        local.classList
      )}
      onChange={(event) => {
        local.onChange?.(event.currentTarget.value, event);
      }}
    />
  );
};

export default Select;
