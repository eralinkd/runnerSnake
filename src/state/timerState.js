import { create } from 'zustand';

const useTimerStore = create((set, get) => {
	let interval = null;

	const startGlobalTimer = () => {
		if (interval) return;

		interval = setInterval(() => {
			const { timers } = get();
			const hasActiveTimers = Object.values(timers).some(time => time > 0);

			if (!hasActiveTimers) {
				clearInterval(interval);
				interval = null;
				return;
			}

			set((state) => ({
				timers: Object.entries(state.timers).reduce((acc, [id, time]) => ({
					...acc,
					[id]: time > 0 ? time - 1 : 0
				}), {})
			}));
		}, 1000);
	};

	return {
		timers: {},
		setTimer: (id, seconds) => {
			set((state) => ({
				timers: {
					...state.timers,
					[id]: seconds
				}
			}));
			startGlobalTimer();
		},
		getTimer: (id) => get().timers[id] || 0,
	};
});

export default useTimerStore; 