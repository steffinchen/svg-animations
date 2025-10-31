export const predefinedAnimations = {
  wiggle: {
    name: 'wiggle',
    css: 'wiggle 1s infinite ease-in-out',
    keyframes: `@keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
}`,
  },
  spin: {
    name: 'spin',
    css: 'spin 2s linear infinite',
    keyframes: `@keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
}`,
  },
  pulse: {
    name: 'pulse',
    css: 'pulse 1.5s infinite',
    keyframes: `@keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
}`,
  },
};
