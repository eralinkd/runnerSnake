import { useEffect, useCallback } from 'react';

// export function useOnClickOutside(
// 	ref,
// 	handler
// ) {
// 	useEffect(() => {
// 		const listener = (event) => {
// 			if (!ref.current || ref.current.contains(event.target)) {
// 				return;
// 			}
// 			handler();
// 		};

// 		const keyHandler = (event) => {
// 			if (event.key === 'Escape') {
// 				handler();
// 			}
// 		};

// 		document.addEventListener('mousedown', listener);
// 		document.addEventListener('touchstart', listener);
// 		document.addEventListener('keydown', keyHandler);

// 		return () => {
// 			document.removeEventListener('mousedown', listener);
// 			document.removeEventListener('touchstart', listener);
// 			document.removeEventListener('keydown', keyHandler);
// 		};
// 	}, [ref, handler]);
// }

export function useOnClickOutside(ref, handler) {
	const stableHandler = useCallback(handler, [handler]);

	const listener = (event) => {
		if (!ref.current || ref.current.contains(event.target)) {
			return;
		}
		stableHandler();
	};

	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			stableHandler();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		document.addEventListener('keydown', keyHandler);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
			document.removeEventListener('keydown', keyHandler);
		};
	}, [ref, stableHandler]);
}
