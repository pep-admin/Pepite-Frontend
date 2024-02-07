import { useSpring, config } from 'react-spring';

export function useVerticalAnimation(initialPosition) {
  // Créez l'animation avec la valeur initiale
  const [style, animate] = useSpring(() => ({
    transform: `translateY(${initialPosition}px)`,
    config: config.gentle,
  }));

  // Fonction pour déclencher l'animation
  const toggleAnimation = newPosition => {
    animate.start({
      transform: `translateY(${newPosition}px)`,
    });
  };

  return { style, toggleAnimation };
}
