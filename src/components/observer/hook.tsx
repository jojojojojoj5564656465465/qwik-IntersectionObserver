import {
  $,
  type Signal,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";

/**
 * Vérifie si un élément est au centre de l'écran.
 * @param elementREF Référence de l'élément à observer.
 * @returns Un signal booléen indiquant si l'élément est au centre de l'écran.
 */
export function useIntersectionObserverIsCenterScreen(
  elementREF: Signal<HTMLElement | undefined>
) {
  // Stocke les dimensions et la position de l'élément
  const rect = useStore<Omit<DOMRect, "toJSON">>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  // Signal pour indiquer si l'élément est au centre de l'écran
  const isCentered = useSignal(false);

  // Fonction pour vérifier si l'élément est au centre de l'écran
  const checkCentered = $(() => {
    const el = elementREF.value;
    if (!el) return false;

    // Met à jour `rect` avec les dimensions et la position de l'élément
    Object.assign(rect, el.getBoundingClientRect());

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Logique pour vérifier si l'élément est au centre de l'écran
    const verticalCenter = rect.top + rect.height / 2;
    const horizontalCenter = rect.left + rect.width / 2;

    // Seuil pour considérer que l'élément est au centre (par exemple, 20% de la hauteur/largeur de la fenêtre)
    const verticalThreshold = windowHeight * 0.2;
    const horizontalThreshold = windowWidth * 0.2;

    const isVerticallyCentered =
      verticalCenter >= windowHeight / 2 - verticalThreshold &&
      verticalCenter <= windowHeight / 2 + verticalThreshold;

    const isHorizontallyCentered =
      horizontalCenter >= windowWidth / 2 - horizontalThreshold &&
      horizontalCenter <= windowWidth / 2 + horizontalThreshold;

    isCentered.value = isVerticallyCentered && isHorizontallyCentered;
    return isCentered.value;
  });

  // Utilisation de `useTask$` pour observer les changements de `elementREF`
  useTask$(({ track }) => {
    track(() => elementREF.value);

    const el = elementREF.value;
    if (!el) {
        console.warn("No element Found");
        return;
    };

    // Configuration de l'observateur d'intersection
    const observer = new IntersectionObserver(
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

    // if (isCentered.value===true) {
    //   observer.unobserve(el)
    // }
    // Nettoyage : déconnecter l'observateur lorsque le composant est détruit
    return () => {
      observer.disconnect();
    };
  });
  // Retourne le signal indiquant si l'élément est au centre de l'écran
  return isCentered;
}
