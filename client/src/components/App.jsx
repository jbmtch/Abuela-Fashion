import React, { useState, useEffect, Fragment, Suspense} from 'react';
import axios from 'axios';
import AppContext from '../AppContext.js';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const Overview = React.lazy(() => import('./questionsAnswers/QuestionsAnswers.jsx'));
const QuestionsAnswers = React.lazy(() => import('./ratingsReviews/RatingsReviews.jsx'));
const RatingsReviews = React.lazy(() => import('./relatedItems/RelatedItems.jsx'));
const RelatedItems = React.lazy(() => import('../AppContext.js'));

import {serverURL} from '../config.js';

const Body = styled.div `
  font-family: 'Open Sans';
  font-style: normal;
  background: #38062b;
  background: linear-gradient(0deg, rgba(56,6,43,1) 10%, rgba(177,169,172,1) 51%, rgba(253,240,213,1) 100%);
`;


export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // For selecting the current product to be shown

  useEffect(() => {
    let clearId = setTimeout(() => {
      const getApi = async () => {
        try {

          const res = await axios.get(
            `${serverURL}/products`
          );

          setProducts(res.data);
          setSelectedProduct(res.data[0]);
          setIsLoaded(true);
        } catch (err) {
          console.error(err);
        }
      };
      getApi();
    }, 400);

    return () => clearTimeout(clearId);
  }, []);

  document.body.addEventListener('click', e => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    const element = e.srcElement.localName;
    const widgetData = e.path.slice(-6);
    const widget = widgetData[0].className;
    const date = new Date().toISOString();

    const sendClickData = async () => {
      try {
        const body = {
          element: element,
          widget: widget,
          time: date,
        };
        const res = await axios.post(
          `${serverURL}/interactions`,
          body,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          },
        );
      } catch (err) {
        console.error(err);
      }
    };

    sendClickData();
  });

  return (
    <Body>
      <Fragment>
          <>
          <Suspense fallback={<Loader
            type='Oval'
            color='#38062B'
            height={160}
            width={160}
            arialLabel='loading-indicator'
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          }>
              <AppContext.Provider
                value={{
                  productsContext: [products, setProducts],
                  selectedProductContext: [selectedProduct, setSelectedProduct],
                }}
              >
                <Overview />
                <RelatedItems />
                <QuestionsAnswers />
                <RatingsReviews />
              </AppContext.Provider>
            </Suspense>
          </>
      </Fragment>
    </Body>
  );
}
