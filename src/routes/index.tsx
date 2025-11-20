import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
//import Observer from "../components/observer";
import {Obs2} from "../components/ob2";

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        <Obs2  />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
