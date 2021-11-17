import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
import styled from "styled-components";

import { findOneId, modifyOneScore, fetchAPI } from './api/Api';
import CardToSelectComponent from 'components/CardToSelectComponent';

const HomeStyles = styled.section`
  li {
    margin-bottom: ${(props) => props.theme.margins.spaceMarginY};
    display: flex;
    align-items: stretch;
  }
`;

const Home = () => {
  const history = useHistory();
  const [images, setImages] = useState(null);
  const [imagesMin, setImagesMin] = useState(0);
  const [imagesMax, setImagesMax] = useState(2);
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});

  useEffect(async () => {
    setImages(await fetchAPI());
    setCount(count + 2);

    if (count === images?.data?.length) {
      history.push('/scores');
    }
  }, [imagesMin]);

  useEffect(() => {
  }, [])

  const handleClick = async e => {
    const imgId = Number(e.target.nextSibling.alt);
    const newScore = Number(Object.values((await findOneId(imgId)))[0].score) + 1;
    // setData(Object.values((await findOneId(imgId)))[0]);
    console.log(Object.values((await findOneId(imgId)))[0].id,'===>',Object.values((await findOneId(imgId)))[0].score,'/',newScore);

    modifyOneScore(imgId, newScore);

    setIsClicked(true);
    setImagesMin(imagesMin + 2);
    setImagesMax(imagesMax + 2);
  };

  
  return (
    <HomeStyles className='container'>
      <h1>
        <span className='h1-start'>Votez</span>
        <span className='h1-end'>pour un chat</span>
      </h1>
      <ul className='row'>{
        images && images?.data?.map((image, index) => (isClicked === false || imagesMin <= index) && (index < imagesMax) && (
          <li key={uuid_v4()} 
              className='col-xs-12 col-sm-6'>
            <CardToSelectComponent image={image} index={index} handleClick={handleClick}/>
          </li>
        ))
      }</ul>
    </HomeStyles>
  );
};

export default Home;