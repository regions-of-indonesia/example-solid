import { For } from "solid-js";

import type { Region } from "@regions-of-indonesia/types";

const RegionSelectOptions = (props: { regions: Region[] }) => (
  <For each={props.regions}>{(region) => <option value={region.code}>{region.name}</option>}</For>
);

export default RegionSelectOptions;
