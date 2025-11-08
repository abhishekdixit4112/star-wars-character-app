// src/hooks/useCharacterData.js
import { useState, useEffect, useCallback, useMemo } from 'react'; 
import { fetchCharacters, fetchDetailsByUrl } from '../api/swapi';

const detailCache = {}; 

export const useCharacterData = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHomeworld, setFilterHomeworld] = useState('All');
  const [availableHomeworlds, setAvailableHomeworlds] = useState(new Set());

  const totalPages = Math.ceil(totalCount / 10); 

  const fetchAndCacheDetails = async (url) => {
    if (detailCache[url]) return detailCache[url];
    try {
      const details = await fetchDetailsByUrl(url);
      detailCache[url] = details.name;
      return details.name;
    } catch (e) {
      return 'Unknown';
    }
  };

  const fetchCharactersData = useCallback(async (page, search) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCharacters({ page, search }); 
      
      setCharacters(data.results);
      setTotalCount(data.count);

      const homeworldUrls = data.results.map(c => c.homeworld).filter(Boolean);
      const uniqueHomeworldUrls = [...new Set(homeworldUrls)];

      const homeworldNames = await Promise.all(
        uniqueHomeworldUrls.map(url => fetchAndCacheDetails(url))
      );
      
      homeworldNames.forEach(name => setAvailableHomeworlds(prev => new Set(prev).add(name)));

    } catch (err) {
      setError(err.message);
      setCharacters([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []); 

 
  useEffect(() => {
    const pageToFetch = currentPage; 
    fetchCharactersData(pageToFetch, searchTerm); 
    
  }, [currentPage, searchTerm, fetchCharactersData]); 

  
  useEffect(() => {
    if ((searchTerm !== '' || searchTerm === '') && currentPage !== 1) {
        setCurrentPage(1);
    }
  }, [searchTerm]); 

  const filteredCharacters = useMemo(() => {
    if (!characters) return []; 
    
    let filtered = characters.slice();
    
    if (filterHomeworld !== 'All') {
        filtered = filtered.filter(char => {
            const homeworldName = detailCache[char.homeworld];
            return homeworldName === filterHomeworld;
        });
    }
    return filtered;

  }, [characters, filterHomeworld]);


 
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    characters: filteredCharacters, 
    currentPage,
    totalPages,
    isLoading,
    error,
    goToNextPage,
    goToPreviousPage,
    searchTerm,
    setSearchTerm,
    filterHomeworld,
    setFilterHomeworld,
    availableHomeworlds: ['All', ...Array.from(availableHomeworlds).sort()],
  };
};