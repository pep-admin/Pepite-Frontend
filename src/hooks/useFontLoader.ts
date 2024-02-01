// Import de libs externes
import { useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';
// import assert from 'assert';

/**
 * Charge les polices de caractères spécifiées et affiche le contenu de l'élément root une fois le chargement terminé.
 */
function loadFontAndShowContent() {
  const font1 = new FontFaceObserver('League Spartan');
  const font2 = new FontFaceObserver('Pragati Narrow');
  const font3 = new FontFaceObserver('Square Peg');

  const promises = [font1.load(), font2.load(), font3.load()];

  Promise.all(promises)
    .then(() => {
      const rootElement = document.getElementById('root');
      // assert(
      //   rootElement !== null,
      //   "L'élément root n'a pas été trouvé dans le DOM.",
      // );
      if (rootElement === null) {
        throw new Error("L'élément root n'a pas été trouvé dans le DOM.");
      }
      rootElement.style.display = 'block';
    })
    .catch(error => {
      console.error('Erreur lors du chargement des polices : ', error);
    });
}

/**
 * Hook pour charger les polices avant d'afficher le contenu de l'application.
 */
export function useFontLoader() {
  useEffect(() => {
    loadFontAndShowContent();
  }, []);
}

export default useFontLoader;
