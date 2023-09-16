import { For, createEffect, createSignal } from "solid-js";

import { create } from "@regions-of-indonesia/client";
import type { Region } from "@regions-of-indonesia/types";

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
        <h1 class="mb-4 lg:mb-6 text-center text-lg lg:text-xl font-mono">Regions of Indonesia</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <div>
            <select
              class="select select-bordered select-xs w-full"
              value={selectedProvinceCode()}
              onChange={(event) => {
                setSelectedProvinceCode(event.currentTarget.value);
              }}
            >
              <option value="" disabled>
                Select...
              </option>

              <For each={provinces()}>{(region) => <option value={region.code}>{region.name}</option>}</For>
            </select>
          </div>
          <div>
            <select
              class="select select-bordered select-xs w-full"
              value={selectedDistrictCode()}
              onChange={(event) => {
                setSelectedDistrictCode(event.currentTarget.value);
              }}
            >
              <option value="" disabled>
                Select...
              </option>

              <For each={districts()}>{(region) => <option value={region.code}>{region.name}</option>}</For>
            </select>
          </div>
          <div>
            <select
              class="select select-bordered select-xs w-full"
              value={selectedSubdistrictsCode()}
              onChange={(event) => {
                setSelectedSubdistrictsCode(event.currentTarget.value);
              }}
            >
              <option value="" disabled>
                Select...
              </option>

              <For each={subdistricts()}>{(region) => <option value={region.code}>{region.name}</option>}</For>
            </select>
          </div>
          <div>
            <select
              class="select select-bordered select-xs w-full"
              value={selectedVillageCode()}
              onChange={(event) => {
                setSelectedVillageCode(event.currentTarget.value);
              }}
            >
              <option value="" disabled>
                Select...
              </option>

              <For each={villages()}>{(region) => <option value={region.code}>{region.name}</option>}</For>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
