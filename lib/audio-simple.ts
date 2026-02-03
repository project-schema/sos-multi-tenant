// Audio utility for playing sounds
class AudioManager {
	private audioContext: AudioContext | null = null;
	private sounds: Map<string, AudioBuffer> = new Map();

	constructor() {
		// Initialize audio context on first user interaction
		if (typeof window !== 'undefined') {
			this.initAudioContext();
		}
	}

	private initAudioContext() {
		try {
			this.audioContext = new (
				window.AudioContext || (window as any).webkitAudioContext
			)();
		} catch (error) {
			console.warn('Audio context not supported');
		}
	}

	// Play a simple beep sound
	playBeep(
		frequency: number = 800,
		duration: number = 100,
		type: OscillatorType = 'sine',
	) {
		if (!this.audioContext) {
			this.initAudioContext();
		}

		if (!this.audioContext) return;

		try {
			const oscillator = this.audioContext.createOscillator();
			const gainNode = this.audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(this.audioContext.destination);

			oscillator.frequency.setValueAtTime(
				frequency,
				this.audioContext.currentTime,
			);
			oscillator.type = type;

			// Fade in and out for smooth sound
			gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
			gainNode.gain.linearRampToValueAtTime(
				0.3,
				this.audioContext.currentTime + 0.01,
			);
			gainNode.gain.exponentialRampToValueAtTime(
				0.01,
				this.audioContext.currentTime + duration / 1000,
			);

			oscillator.start(this.audioContext.currentTime);
			oscillator.stop(this.audioContext.currentTime + duration / 1000);
		} catch (error) {
			console.warn('Failed to play audio:', error);
		}
	}

	// Play add to cart sound (higher pitch)
	playAddSound() {
		this.playBeep(1000, 150, 'sine');
	}

	// Play remove from cart sound (lower pitch)
	playRemoveSound() {
		this.playBeep(400, 200, 'sine');
	}

	// Play error sound
	playErrorSound() {
		this.playBeep(200, 300, 'sawtooth');
	}

	// Play success sound
	playSuccessSound() {
		this.playBeep(1200, 100, 'sine');
	}
}

// Create a singleton instance
export const audioManager = new AudioManager();

// Simple hook for easy usage
export const useAudio = () => {
	return {
		playAdd: () => audioManager.playAddSound(),
		playRemove: () => audioManager.playRemoveSound(),
		playError: () => audioManager.playErrorSound(),
		playSuccess: () => audioManager.playSuccessSound(),
		playBeep: (frequency?: number, duration?: number, type?: OscillatorType) =>
			audioManager.playBeep(frequency, duration, type),
	};
};

export const playSound = (type: 'add' | 'remove' | 'error' | 'success') => {
	const audio = new Audio();

	// You can add actual sound files to your public folder
	const sounds = {
		add: '/sounds/add.mp3',
		remove: '/sounds/remove.mp3',
		error: '/sounds/error.mp3',
		success: '/sounds/success.mp3',
	};

	audio.src = sounds[type];
	audio.volume = 0.3; // 30% volume
	audio.play().catch(() => {
		// Fallback to beep if audio file fails
	});
};
