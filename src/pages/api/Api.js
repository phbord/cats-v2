//import data from '../../data/data.json';

export async function fetchAPI() {
  // const url = "https://latelier.co/data/cats.json";
  // const config = {
  //   method: "GET",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  // const res = await fetch(url, config).catch(err => err);
  // const data = await res.json();
  // const images = await data.images;

  // console.log('res: ',res);
  // console.log('data: ',images);
  // return data;

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


  // JSON file
  // const images = await data.images;
  // return images;
}

export async function findOneId(id) {
  // STRAPI
  //const url = `http://localhost:1337/images/${id}`;
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
  //const url = `http://localhost:1337/images/${id}`;
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
