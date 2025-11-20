import {
    
    type Signal,

    useSignal,

    useVisibleTask$,
} from "@builder.io/qwik";

// Pour une meilleure lisibilité et pour suivre les bonnes pratiques Qwik,
// on utilise useSignal pour stocker la réactivité.

/**
 * Vérifie si un élément est au centre de l'écran avec une tolérance relative.
 * @param elementREF Référence de l'élément à observer.
 * @returns Un signal booléen indiquant si l'élément est au centre de l'écran.
 */
export function useIntersectionObserver(
    elementREF: Signal<HTMLElement | undefined>,
    onceObserver: boolean,
    option?: IntersectionObserverInit
): Signal<boolean | undefined> {
    const isIntersercting = useSignal<boolean>(false);
    // biome-ignore lint/correctness/noQwikUseVisibleTask: Nécessaire pour accéder au DOM direct
    useVisibleTask$(({ cleanup }) => {
        if (!elementREF.value) return;

        const handleIntersection: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isIntersercting.value = true;
                    if (onceObserver && elementREF.value) {
                        observer.unobserve(elementREF.value);
                    }
                } else {
                    isIntersercting.value = false;
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: option?.threshold || 0.5,
            root: option?.root || null,
            rootMargin: option?.rootMargin || "0px",

        });
        observer.observe(elementREF.value);
        cleanup(() => {
            observer.disconnect();
        });
    }
    );
    return isIntersercting;
}
