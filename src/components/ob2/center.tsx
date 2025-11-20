import {
    $,
    type QRL,
    type Signal,
    useOnWindow,
    useSignal,
    useTask$,
} from "@builder.io/qwik";


/**
 * Vérifie si un élément est au centre de l'écran avec une tolérance relative.
 * @param elementREF Référence de l'élément à observer.
 * @returns Un signal booléen indiquant si l'élément est au centre de l'écran.
 */
export function useIsCenterOfScreen(
    elementREF: Signal<HTMLElement | undefined>,
    //onceObserver: boolean,
    isVisible: Signal<boolean | undefined>
): Signal<boolean | undefined> {
    const isCentered = useSignal<boolean>(false);
    const checkCentered: QRL<() => void> = $(() => {
        const el = elementREF.value;
        if (!el) {
            return;
        }

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

        isCentered.value = isVerticallyCentered && isHorizontallyCentered;


    });

    // 1. Gérer les événements de fenêtre (défilement et redimensionnement)
    // Ces appels DOIVENT être au niveau supérieur du hook.
    //useOnWindow("scroll", checkCentered);
    useOnWindow("resize", checkCentered);
    useOnWindow("scroll", checkCentered);


    useTask$(({ track }) => {
        track(() => isVisible.value);
        if (!isVisible.value) {
            return;
        }
        checkCentered();
    });

    // useTask$(({ track }) => {
    //     track(() => isCentered.value);
    //     if (onceObserver) {
    //         isCentered.value = true;
    //     }
    // });
    return isCentered;
}
