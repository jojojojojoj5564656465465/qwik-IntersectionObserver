import {
  $,
  type Signal,
  useComputed$,
  useOnWindow,
  useStore,
  useTask$,
} from "@builder.io/qwik";

// Pour une meilleure lisibilité et pour suivre les bonnes pratiques Qwik,
// on utilise useSignal pour stocker la réactivité.

/**
 * Vérifie si un élément est au centre de l'écran avec une tolérance relative.
 * @param elementREF Référence de l'élément à observer.
 * @returns Un signal booléen indiquant si l'élément est au centre de l'écran.
 */
export function useIntersectionObserverIsCenterScreen2(
  elementREF: Signal<HTMLElement | undefined>,
  onceObserver: boolean,
  option?: IntersectionObserverInit
): Signal<boolean | undefined> {
  const isCenteredStore = useStore({
    intersecting: false,
    current: false,
    hasBeen: false,
  });

  const checkIfHasBeenEverCentered = $(() => {
    if (isCenteredStore.current && !isCenteredStore.hasBeen) {
      isCenteredStore.hasBeen = true;
    }
  });
  const centered = useComputed$(() => {
    checkIfHasBeenEverCentered();
    if (isCenteredStore) {
      switch (onceObserver) {
        case true:
          return isCenteredStore.hasBeen;
        case false:
          return isCenteredStore.current;
        default:
          return false;
      }
    }
  });
  // LOGIQUE CENTRALE (utilisée par Scroll, Resize, et Task)
  const checkCentered = $(() => {
    const el = elementREF.value;
    if (!el) {
      return;
    }
    const emoji = (x: boolean) => (x ? "✅" : "❌");

    const rect: DOMRect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    // Calcul du centre de l'élément
    const verticalCenter = rect.top + rect.height / 2;
    const horizontalCenter = rect.left + rect.width / 2;

    // Seuil de tolérance: 20% de la fenêtre (ajustez si nécessaire)
    const verticalThreshold = windowHeight * 0.2;
    const horizontalThreshold = windowWidth * 0.2;

    const isVerticallyCentered =
      verticalCenter >= windowHeight / 2 - verticalThreshold &&
      verticalCenter <= windowHeight / 2 + verticalThreshold;

    const isHorizontallyCentered =
      horizontalCenter >= windowWidth / 2 - horizontalThreshold &&
      horizontalCenter <= windowWidth / 2 + horizontalThreshold;

    // Mise à jour du signal réactif
    isCenteredStore.current = isVerticallyCentered && isHorizontallyCentered;
    ///checkIfHasBeenEverCentered();
    // Log de débogage pour la surveillance
    console.log(
      `[Observer] ↕️ intersecting=${emoji(isCenteredStore.intersecting)} curr=${emoji(isCenteredStore.current)} hasBeen=${emoji(isCenteredStore.hasBeen)}`
    );
  });

  // 1. Gérer les événements de fenêtre (défilement et redimensionnement)
  // Ces appels DOIVENT être au niveau supérieur du hook.
  //useOnWindow("scroll", checkCentered);
  useOnWindow("resize", checkCentered);
  useOnWindow("scroll", checkCentered);

  // 2. Gérer l'initialisation et l'IntersectionObserver
  useTask$(({ track }) => {
    // Suit l'élément référé. Si elementREF.value change, la task redémarre.
    track(() => elementREF.value);

    const el = elementREF.value as HTMLElement;

    // Initialisation
    if (el) {
      checkCentered();
    } else {
      return; // Sort si l'élément n'est pas encore monté
    }


    const fnObserver = $((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        checkCentered();
        isCenteredStore.intersecting = true;
      } else {
        isCenteredStore.intersecting = false;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(fnObserver);
      },
      {
        threshold: option?.threshold || 0.5,
        rootMargin: option?.rootMargin || "-50px",
      }
    );

    observer.observe(el);

    // Nettoyage : déconnecter l'observateur lorsque la task se termine
    return () => {
      observer.disconnect();
      // On n'a pas besoin de désenregistrer les useOnWindow, Qwik le fait
      // automatiquement quand le hook est détruit.
    };
  });
 

  return centered;
}
