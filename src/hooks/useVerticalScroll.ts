import { useState, useEffect, useRef } from 'react';

const useVerticalScroll = (
  firstRender,
  loadDataFunction,
  displayType,
  setCriticsOfAcquaintances,
) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const pageRef = useRef(1);

  // Fonction pour charger plus de données
  const loadMore = async () => {
    if (loading || !hasMore) return; // Si en cours de chargement ou s'il n'y a plus de données on arrête la fonction
    console.log(`page n°${pageRef.current}`);

    setLoading(true); // chargement en cours
    const hasMoreData = await loadDataFunction(pageRef.current); // Vérifie si des données sont encore disponibles

    pageRef.current++; // incrémente le numéro de la page après chaque chargement de données

    setHasMore(hasMoreData);
    setLoading(false); // fin du chargement
  };

  // Observer pour détecter le scroll jusqu'à l'élément de référence en bas de page
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { rootMargin: '250px' }, // à 250px de la div de bas de page, on lance la fonction
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading]);

  // Réinitialise la pagination et recharger les données en fonction des dépendances
  useEffect(() => {
    if (firstRender.current) return;
    console.log('changement de type =>', displayType);

    pageRef.current = 1;
    setHasMore(true);
    setCriticsOfAcquaintances([]);
    loadMore();
    // Une fonction de réinitialisation ou un appel direct à loadMore peut être nécessaire ici
  }, [displayType]);

  return { observerRef, loading, hasMore };
};

export default useVerticalScroll;
