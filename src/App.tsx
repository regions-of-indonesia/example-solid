import { createEffect, createSignal } from "solid-js";

import { create } from "@regions-of-indonesia/client";
import type { Region } from "@regions-of-indonesia/types";

import Label from "./components/Label";
import Select from "./components/Select";
import RegionSelectOptions from "./components/RegionSelectOptions";

const client = create();

function App() {
  const [provinces, setProvinces] = createSignal<Region[]>([]);
  const [districts, setDistricts] = createSignal<Region[]>([]);
  const [subdistricts, setSubdistricts] = createSignal<Region[]>([]);
  const [villages, setVillages] = createSignal<Region[]>([]);

  const [selectedProvinceCode, setSelectedProvinceCode] = createSignal<string>("");
  const [selectedDistrictCode, setSelectedDistrictCode] = createSignal<string>("");
  const [selectedSubdistrictsCode, setSelectedSubdistrictsCode] = createSignal<string>("");
  const [selectedVillageCode, setSelectedVillageCode] = createSignal<string>("");

  const mount = async () => {
    try {
      setProvinces(await client.province.find());
    } catch (error) {
      setProvinces([]);
    }
  };

  mount();

  createEffect(async () => {
    setSelectedDistrictCode("");

    try {
      setDistricts(await client.district.find(selectedProvinceCode()));
    } catch (error) {
      setDistricts([]);
    }
  });

  createEffect(async () => {
    setSelectedSubdistrictsCode("");

    try {
      setSubdistricts(await client.subdistrict.find(selectedDistrictCode()));
    } catch (error) {
      setSubdistricts([]);
    }
  });

  createEffect(async () => {
    setSelectedVillageCode("");

    try {
      setVillages(await client.village.find(selectedSubdistrictsCode()));
    } catch (error) {
      setVillages([]);
    }
  });

  return (
    <>
      <div class="container max-w-screen-lg mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
        <h1 class="mb-4 lg:mb-6 text-center text-lg md:text-xl 2xl:text-2xl font-mono font-bold">Regions of Indonesia</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <div class="flex flex-col gap-1">
            <Label for="select-provinces">Provinces</Label>
            <Select id="select-provinces" value={selectedProvinceCode()} onChange={setSelectedProvinceCode}>
              <option value="" disabled>
                Select...
              </option>
              <RegionSelectOptions regions={provinces()} />
            </Select>
          </div>
          <div class="flex flex-col gap-1">
            <Label for="select-districts">Districts</Label>
            <Select id="select-districts" value={selectedDistrictCode()} onChange={setSelectedDistrictCode}>
              <option value="" disabled>
                Select...
              </option>
              <RegionSelectOptions regions={districts()} />
            </Select>
          </div>
          <div class="flex flex-col gap-1">
            <Label for="select-subdistricts">Subdistricts</Label>
            <Select id="select-subdistricts" value={selectedSubdistrictsCode()} onChange={setSelectedSubdistrictsCode}>
              <option value="" disabled>
                Select...
              </option>
              <RegionSelectOptions regions={subdistricts()} />
            </Select>
          </div>
          <div class="flex flex-col gap-1">
            <Label for="select-villages">Villages</Label>
            <Select id="select-villages" value={selectedVillageCode()} onChange={setSelectedVillageCode}>
              <option value="" disabled>
                Select...
              </option>
              <RegionSelectOptions regions={villages()} />
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
