import { CatFactsResponse, Catfacth, RandomUserResponse, User } from './Interfaces.tsx';

export const fetchGetUsers = async () => {
    const api = 'https://randomuser.me/api/?results=20';
    const response = await fetch(api);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error al obtenerl lo usuarios');
    }
    return data;
}

export const fetchGetcatfacth = async () => {
    const api = 'https://catfact.ninja/facts';
    const response = await fetch(api);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error al obtenerl los datos de catfacth');
    }
    return data;
}

export const completeData = (catFactsData: CatFactsResponse, usersData: RandomUserResponse) => {
    if (!catFactsData?.data || !usersData?.results || catFactsData.data.length === 0 || usersData.results.length === 0) {
      return [];
    }

    if (catFactsData.data.length >= usersData.results.length) {

      console.log('Paco: mixdata if');
      return catFactsData.data.map((catFact: Catfacth, index: number) => ({
        catFact: catFact.fact,
        user: usersData.results[index % usersData.results.length]
      }));
    } else {
      console.log('Paco: mixdata else');
      return usersData.results.map((user: User, index: number) => ({
        catFact: catFactsData.data[index % catFactsData.data.length].fact,
        user: user
      }));
    }
  };
