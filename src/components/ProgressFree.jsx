import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Loadings from '../global/Loading';
import axios from 'axios';

const BestFree = () => {
  const navigate = useNavigate();
  const [newData, setNewdata] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(0);
  const [ref, setRef] = useState(null);
  const baseURL = process.env.REACT_APP_API_KEY;

  const getProgressData = async () => {
    setLoad(true);
    try {
      const { data } = await axios.get(
        `${baseURL}/post/gif/images/2?size=6&page=${page}`
      );
      if (!data) {
        return;
      }
      setNewdata(newData.concat(data.data));
    } catch (error) {
      console.log(error);
    }

    setLoad(false);
  };

  useEffect(() => {
    getProgressData();
  }, [page]);

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  const options = {
    rootMargin: '30px',
    threshold: 0.5,
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((page) => page + 1);

        observer.observe(entry.target);
      }
    });
  };

  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(onIntersect, options);
      setTimeout(() => {
        observer.observe(ref);
      }, 500);
    }
    return () => observer && observer.disconnect();
  }, [ref]);

  console.log(newData);

  return (
    <ListBox>
      {load === true ? <Loadings /> : null}
      {newData.map((item, index) => (
        <BestBox key={item.id}>
          <BestImg
            productImg={item?.imgUrl}
            onClick={() => {
              navigate(`/progressdetail/${item.id}`);
            }}
          />
          <BestDesc>
            <Profile img={item?.profileImg} />
            <Nickname>{item?.nickname}</Nickname>
          </BestDesc>
        </BestBox>
      ))}
      <div ref={setRef}>.</div>
    </ListBox>
  );
};

export default BestFree;

const Width = styled.div`
  width: 350px;
`;

const ListBox = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const BestBox = styled(Width)`
  height: 300px;
  margin-top: 50px;
  display: inline-block;
  margin-left: 35px;
`;

const BestImg = styled.div`
  width: 350px;
  height: 300px;
  display: block;
  background: url(${(props) => props.productImg});
  ${({ theme }) => theme.backgroundSet('contain')};

  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);
  transition: 0.2s ease-in;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const BestDesc = styled(Width)`
  height: 50px;
  margin-top: 20px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
`;

const Profile = styled(Button)`
  margin-right: 20px;
  border-radius: 50%;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('cover')};
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: 800;
`;

const Nickname = styled(Span)`
  margin-right: 100px;
  display: inline-block;
  padding: 15px 0;
  position: relative;
  font-family: 'NotoBold';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #2e3248;
  line-height: 180%;
  letter-spacing: -0.02em;
`;
