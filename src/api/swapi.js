// src/api/swapi.js

const BASE_URL = 'https://swapi.dev/api';

export async function fetchCharacters({ page = 1, search = '' }) {

  const url = search 
    ? `${BASE_URL}/people/?search=${search}` 
    : `${BASE_URL}/people/?page=${page}`;
    
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch characters.');
  }
  return response.json();
}

export async function fetchDetailsByUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for URL: ${url}`);
  }
  return response.json();
}