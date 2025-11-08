// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useCharacterData } from '../hooks/useCharacterData'; // FIX: Correct Named Import
import CharacterCard from '../components/characters/CharacterCard';
import Pagination from '../components/characters/Pagination';
import CharacterDetailsModal from '../components/characters/CharacterDetailsModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const {
    characters,
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
    availableHomeworlds,
  } = useCharacterData();

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCardClick = (character) => setSelectedCharacter(character);
  const handleCloseModal = () => setSelectedCharacter(null);

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <header className="text-center py-6 border-b border-yellow-500 mb-8">
        <h1 className="text-5xl font-extrabold text-yellow-400">Star Wars Character App</h1>
        <p className="text-gray-400 mt-2">Discover the heroes and villains of a galaxy far, far away.</p>
      </header>
      
     
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        
       
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-yellow-500 focus:border-yellow-500 w-full md:w-80"
        />

        
        <select
          value={filterHomeworld}
          onChange={(e) => setFilterHomeworld(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-yellow-500 focus:border-yellow-500 w-full md:w-52"
        >
          {Array.isArray(availableHomeworlds) && availableHomeworlds.map(world => ( 
            <option key={world} value={world}>{world === 'All' ? 'Filter by Homeworld' : world}</option>
          ))}
        </select>
      </div>

     
      {error && (
        <div className="text-center p-4 bg-red-900 border border-red-500 text-white rounded-lg mx-auto max-w-lg">
          <p className="font-bold">Error: {error}</p>
          <p className="text-sm">Please check your network connection or try again.</p>
        </div>
      )}
      
      {isLoading && <LoadingSpinner />}

     
      {!isLoading && Array.isArray(characters) && characters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map(character => (
            <CharacterCard 
              key={character.url} 
              character={character} 
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}

     
      {!isLoading && Array.isArray(characters) && characters.length === 0 && (
         <div className="text-center text-gray-400 p-10">
            No characters found matching your search and filter criteria.
         </div>
      )}

     
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={goToNextPage}
          onPrevious={goToPreviousPage}
        />
      )}

    
      {selectedCharacter && (
        <CharacterDetailsModal 
          character={selectedCharacter} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default HomePage;