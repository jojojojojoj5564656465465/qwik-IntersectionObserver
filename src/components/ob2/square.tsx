// components/Square.tsx
import {
	component$,
	useComputed$,
	useSignal,
	useStylesScoped$,
	useTask$,
} from "@builder.io/qwik";
import { useIsCenterOfScreen } from "./center";
import styles from "./main.css?inline";
import { useIntersectionObserver } from "./useIntersectionObserver";

export const Square = component$((props: { id: number }) => {
	useStylesScoped$(styles);
	const square = useSignal<HTMLElement>();
	const onceObserver = false;

	const isVisible = useIntersectionObserver(square, onceObserver, {
		threshold: 0.1,
	});
	const isCentered = useIsCenterOfScreen(square, isVisible);

	const stayTrue = useSignal<boolean>(false);

	const isCenterdAndVisible = useComputed$(() => {
		return isVisible.value && isCentered.value;
	});

	useTask$(({ track }) => {
		track(() => isVisible.value);
		track(() => isCentered.value);
		if (onceObserver && isVisible.value && isCentered.value) {
			stayTrue.value = true;
		}
	});

	useTask$(({ track }) => {
		track(() => isVisible.value);
		track(() => isCentered.value);

		console.log(
			`[Square ${props.id}] ↕️  isVisible: ${isVisible.value ? "✅" : "❌"} centered: ${isCentered.value ? "✅" : "❌"}`,
		);
	});

	return (
		<span
			ref={square}
			class={stayTrue.value || isCenterdAndVisible.value ? "rotating" : "no"}
			style={{
				display: "block",
				backgroundColor: "yellow",
				minHeight: "50px",
				border: "1px solid red",
			}}
		>
			CARRÉ {props.id}
		</span>
	);
});
