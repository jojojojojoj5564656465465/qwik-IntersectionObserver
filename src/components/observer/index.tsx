import {
  $,
  component$,
  type Signal,
  useOnWindow,
  useSignal,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";
import styles from "./observer.css?inline";

/**
 *
 * @param element Ref of the elemenet you want to Observe
 * @returns Boolean
 * @description The goal it to see and animate if an element in in the center of the screen
 */
function useIntersectionObserverIsCenterScreen(
  elementREF: Signal<HTMLElement | undefined>
): Signal<boolean> {
  const rotating = useSignal<boolean>(false);
  // Nouveau signal pour "une fois centré"
  const hasBeenCentered = useSignal<boolean>(false);

  const checkCentered = $(() => {
    const el = elementREF.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const elCenterY = rect.top + rect.height / 2;
    const elCenterX = rect.left + rect.width / 2;
    const viewCenterY = window.innerHeight / 2;
    const viewCenterX = window.innerWidth / 2;
    const tolerance = 40; // tolérance en pixels pour considérer "centré"

    // Vérifie si l'élément est centré
    const isCurrentlyCentered =
      Math.abs(elCenterY - viewCenterY) < tolerance &&
      Math.abs(elCenterX - viewCenterX) < tolerance;

    // Si l'élément est actuellement centré, mettez à jour hasBeenCentered
    if (isCurrentlyCentered) {
      hasBeenCentered.value = true;
    }

    // Le signal `rotating` suivra `hasBeenCentered`
    rotating.value = hasBeenCentered.value;
  });

  useTask$(({ track }) => {
    track(() => elementREF.value);
    const el = elementREF.value;
    if (!el) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            checkCentered();
          }
        });
      },
      { threshold: 1, rootMargin: "100px" }
    );
    observer.observe(el);

    checkCentered();

    return () => {
      observer.disconnect();
    };
  });
  useOnWindow("scroll", checkCentered);
  useOnWindow("resize", checkCentered);

  // Retourne le signal `rotating` qui est maintenant basé sur `hasBeenCentered`
  return rotating;
}

export default component$(() => {
  useStyles$(styles);
  const squareRef = useSignal<HTMLElement>();

  const isInCenterOfScreen = useIntersectionObserverIsCenterScreen(squareRef);
  return (
    <section class="section1">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, mollitia
        placeat hic autem ea, reprehenderit impedit accusamus magni
        necessitatibus, quibusdam tenetur corporis? Atque quis soluta hic esse,
        dicta minus perferendis? Autem, nostrum blanditiis nesciunt dolorum
        facilis aut, deleniti voluptatum iusto asperiores ut ratione dignissimos
        doloribus placeat temporibus fuga numquam! Odio quisquam unde
        repellendus deleniti beatae. Magni quos minus, quis soluta laboriosam
        tempora modi a quisquam molestiae fugit ducimus! Laudantium, dolore,
        ullam ex atque illo cumque, debitis consectetur in minus reprehenderit
        molestias animi qui voluptas quaerat ducimus repellat totam harum ut
        sit? Autem cupiditate laudantium illum odio aliquam, debitis ad
        temporibus itaque quisquam ipsum aut nam officia exercitationem ratione
        impedit error suscipit in veniam quaerat accusantium nemo fugiat soluta!
      </p>
      <span
        ref={squareRef}
        class={`redSquare ${isInCenterOfScreen.value ? "rotating" : "notrotating"}`}
      >
        Carré rouge
      </span>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
        blanditiis natus animi ratione, ipsum atque unde? Animi, obcaecati.
        Optio dolorem a sit, quod voluptates, amet quos obcaecati, voluptas
        inventore non iure ipsam praesentium necessitatibus odio ipsa? Numquam
        odio magnam est omnis! Obcaecati, sequi modi repellat soluta explicabo
        tempore libero quo dolorem. Sed beatae aperiam eos repellendus corrupti,
        aliquam incidunt ullam ducimus rerum quibusdam! Consectetur, id.
        Suscipit, dicta perspiciatis! Quae itaque atque, tempora quod pariatur
        cupiditate fugiat? Nam dignissimos veniam quas fuga nobis reiciendis
        dicta, vel sit? Sapiente voluptatum maxime corrupti, obcaecati ratione
        atque quia explicabo? Praesentium accusamus repellat fugit quaerat.
      </p>
    </section>
  );
});
