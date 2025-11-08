
import React, { useState, useEffect } from 'react';
import { fetchDetailsByUrl } from '../../api/swapi';
import LoadingSpinner from '../ui/LoadingSpinner';

const DetailItem = ({ label, value }) => (
  <p className="text-gray-300 mb-1">
    <span className="font-semibold text-white">{label}:</span> {value || 'N/A'}
  </p>
);

const CharacterDetailsModal = ({ character, onClose }) => {
  const [homeworldDetails, setHomeworldDetails] = useState(null);
  const [loadingHomeworld, setLoadingHomeworld] = useState(true);
  const [errorHomeworld, setErrorHomeworld] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      setLoadingHomeworld(true);
      setErrorHomeworld(null);
      try {
        const details = await fetchDetailsByUrl(character.homeworld);
        setHomeworldDetails(details);
      } catch (err) {
        setErrorHomeworld('Failed to load homeworld data.');
      } finally {
        setLoadingHomeworld(false);
      }
    };

    if (character.homeworld) {
      fetchHomeworld();
    } else {
      setLoadingHomeworld(false);
      setHomeworldDetails({ name: 'N/A', terrain: 'N/A', climate: 'N/A', population: 'N/A' });
    }
  }, [character.homeworld]);

  const formattedDate = character.created 
    ? new Date(character.created).toLocaleDateString('en-GB', { 
        day: '2-digit', month: '2-digit', year: 'numeric' 
      }).replace(/\//g, '-')
    : 'N/A';
  
  const filmCount = character.films ? character.films.length : 0;
  const massDisplay = character.mass !== 'unknown' ? `${character.mass} kg` : 'Unknown';
  const heightDisplay = character.height !== 'unknown' ? `${(character.height / 100).toFixed(2)} m` : 'Unknown';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-gray-900 text-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
        
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-3xl leading-none text-yellow-400 hover:text-white"
        >
          &times;
        </button>

        <div className="p-8">
          <h2 className="text-4xl font-extrabold text-yellow-400 border-b-2 border-yellow-400 pb-3 mb-6">
            {character.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Character Stats</h3>
              <DetailItem label="Height" value={heightDisplay} />
              <DetailItem label="Mass" value={massDisplay} />
              <DetailItem label="Birth Year" value={character.birth_year} />
              <DetailItem label="Number of films" value={filmCount} />
              <DetailItem label="Date Added (dd-MM-yyyy)" value={formattedDate} />
            </div>

          
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Homeworld Details</h3>
              {loadingHomeworld && <LoadingSpinner />}
              {errorHomeworld && <p className="text-red-500">{errorHomeworld}</p>}
              
              {!loadingHomeworld && homeworldDetails && (
                <>
                  <DetailItem label="Name" value={homeworldDetails.name} />
                  <DetailItem label="Terrain" value={homeworldDetails.terrain} />
                  <DetailItem label="Climate" value={homeworldDetails.climate} />
                  <DetailItem label="Population" value={homeworldDetails.population === 'unknown' ? 'Unknown' : homeworldDetails.population.toLocaleString()} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsModal;