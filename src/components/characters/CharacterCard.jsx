// src/components/characters/CharacterCard.jsx
import React from 'react';

const speciesColorMap = {
  'human': 'bg-blue-900/30 border-blue-600',
  'droid': 'bg-gray-700/30 border-gray-400',
  'wookiee': 'bg-amber-900/30 border-amber-600',
  'yoda': 'bg-green-700/30 border-green-400', 
  default: 'bg-indigo-900/30 border-indigo-600',
};

const getSpeciesStyle = (speciesUrl) => {
  const species = speciesUrl ? speciesUrl.toLowerCase() : 'default';
  const key = Object.keys(speciesColorMap).find(k => species.includes(k)) || 'default';
  return speciesColorMap[key];
};

const CharacterCard = ({ character, onCardClick }) => {
  const speciesUrl = character.species && character.species.length > 0 ? character.species[0] : null;
  const speciesStyle = getSpeciesStyle(speciesUrl);
  // Using character name as a seed for consistent placeholder image
  const imageUrl = `https://picsum.photos/seed/${character.name.replace(/\s/g, '')}/400/200`; 

  return (
    <div
      onClick={() => onCardClick(character)}
      className={`relative rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-[1.03] border-2 ${speciesStyle}`}
    >
      <img
        src={imageUrl}
        alt={character.name}
        className="w-full h-48 object-cover opacity-70"
        onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x200?text=Star+Wars+Character" }}
      />
      <div className="p-4">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">{character.name}</h3>
        <p className="text-sm text-gray-300">
          Height: <span className="font-semibold">{character.height} cm</span>
        </p>
      </div>
      <div className={`absolute top-0 right-0 p-2 text-xs font-medium rounded-bl ${speciesStyle.replace('/30', '/60').replace('border-', 'text-')}`}>
        {speciesUrl ? 'Details Available' : 'No Species Data'}
      </div>
    </div>
  );
};

export default CharacterCard;