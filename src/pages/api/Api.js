//import data from '../../data/data.json';

export async function fetchAPI() {
  // STRAPI
  const url = `${process.env.REACT_APP_API_URL}`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, config).catch(err => err);
  const data = await res.json();

  return { data };
}

export async function findOneId(id) {
  // STRAPI
  const url = `${process.env.REACT_APP_API_URL}${id}`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, config).catch(err => err);
  const data = await res.json();

  return { data };
}

export async function modifyOneScore(id, score) {
  // STRAPI
  const url = `${process.env.REACT_APP_API_URL}${id}`;
  const creds = { score };
  const config = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds)
  };

  const res = await fetch(url, config).catch(err => err);

  if (res instanceof Error) {
    const error = await res.json();
    const messages = `${[...Object.entries(error)]}`;
    console.log('Erreurs : ', messages);
  }
}
