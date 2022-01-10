import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import StylesContext from './StylesContext';
import AppContext from '../../AppContext';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ArrowUpward } from '@material-ui/icons';
import { ArrowDownward } from '@material-ui/icons';
import { PortalWithState } from 'react-portal';

const MainImgContainer = styled.div`
  position: relative;
  padding: 1rem;
  padding-top: 5rem;
  grid-column-start: 1;
  grid-column-end: 2;
  height: 650px;
  width: 600px;
`;

const MainImage = styled.img`
 width: 100%;
 height: 100%;
 object-fit: cover:
 padding: 2rem;
 position: relative;
 cursor: zoom-in;
 border: 4px solid  #38062B;
 box-shadow: 0 2px 3px rgba(0, 0, 0, 2);
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-height: 1200px;
  max-width: 1200px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;
const ModalBody = styled.section`
  background-color: rgb(220, 245, 253);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: auto;
  display: flex;
  justify-content: center;
  border: 1rem solid #38062b;
`;
const ThumbnailContainer = styled.div`
  z-index: 1;
  width: 50px;
  max-height: 420px;
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
  left: 30px;
  top: 120px;
`;
const Down = styled.button`
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  color: #fdf0d5;
  background-color: #38062b;
`;
const Up = styled.button`
  position: absolute;
  left: 50%;
  top: -35px;
  transform: translateX(-50%);
  color: #fdf0d5;
  background-color: #38062b;
`;
const Left = styled.button`
  z-index: 1;
  left: 90px;
  position: absolute;
  top: 50%;
  color: #fdf0d5;
  background-color: #38062b;
`;
const Right = styled.button`
  right: 1rem;
  z-index: 1;
  position: absolute;
  top: 50%;
  color: #fdf0d5;
  background-color: #38062b;
`;
const ModalImg = styled.img`
  width: 1000px;
  height: 1000px;
`;

const LeftExpand = styled.button`
  z-index: 3;
  left: 90px;
  top: 50%;
  color: #fdf0d5;
  background-color: #38062b;
`;
const RightExpand = styled.button`
  right: 3rem;
  z-index: 3;
  top: 50%;
  color: #fdf0d5;
  background-color: #38062b;
`;
const ThumbnailImage = styled.img`
  border: ${props => (props.selected ? '3px solid #38062B' : null)};
  width: 100%;
  height: 50px;
  object-fit: cover;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 8);
`;
const ThumbnailExpandedImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #38062b;
`;

const ThumbnailExpandedContainer = styled.div`
  z-index: 1;
  bottom: 0;
  max-height: 420px;
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: space-evenly;
  padding: 0.5rem;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export default function ImageGallery() {
  const { stylesDataContent, currentStyleContent } = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setmodalOpen] = useState(false);
  const { selectedProductContext } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [zoomMode, setZoomMode] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [size, setSize] = useState(100);

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentPage(0);
  }, [currentStyle, selectedProduct]);

  useEffect(() => {
    const mainEl = document.querySelector('main');

    if (modalOpen) {
      if (mainEl) {
        mainEl.style.filter = 'blur(3px)';
      }
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (mainEl) {
        mainEl.style.filter = 'none';
      }
    };
  }, [modalOpen]);

  // useEffect (() => {
  //   setSize(100);
  //   setMouseX(0);
  //   setMouseY(0);
  // }, [zoomMode]);

  const renderPhoto = () => {
    return getItemsForPage(currentPage).map((photo, index) => {
      const imageRendered = photo?.thumbnail_url
        ? photo?.thumbnail_url[0] === 'h'
          ? photo?.thumbnail_url
          : photo?.url
        : null;
      return (
        <ThumbnailImage
          selected={
            currentStyle.photos[currentIndex].thumbnail_url ===
            photo?.thumbnail_url
          }
          src={imageRendered}
          key={photo.thumbnail_url}
          onClick={() =>
            currentPage === 0
              ? setCurrentIndex(index)
              : setCurrentIndex(7 * currentPage + index)
          }
        ></ThumbnailImage>
      );
    });
  };
  const renderExpandedPhotos = () => {
    return currentStyle.photos.map((photo, index) => {
      const imageExpandRendered = photo?.thumbnail_url
        ? photo?.thumbnail_url[0] === 'h'
          ? photo?.thumbnail_url
          : photo?.url
        : null;
      return (
        <ThumbnailExpandedImage
          onClick={() => setCurrentIndex(index)}
          src={imageExpandRendered}
          key={photo.thumbnail_url}
        ></ThumbnailExpandedImage>
      );
    });
  };
  // const handleMouseOver = () => {
  //   setZoomMode(false);
  // };
  // const handleMouseOut = () => {
  //   setZoomMode(false);
  // };

  // const handleMouseMovement = (e) => {
  //   const {left, top, width, height} =
  //   e.target.getBoundingClientRect();
  //   const x = (e.pageX - left) / width * 100;
  //   const y = (e.pageY - top) / height * 100;
  //   //console.log(x, y);
  //   setMouseX(x);
  //   setSize(250);
  //   setMouseY(y);
  // };
  // const OnClose = () => {
  //   setSize(100);
  // };
  // const src = currentStyle.photos[currentIndex].url;

  // const ModalImg = {
  //   width: '1000px',
  //   height: '1000px',
  //   cursor: 'zoom-in',
  //   //backgroundImage: src,
  //   //backgroundPosition: `${mouseX}% ${mouseY}%`
  // };
  // const ZoomImg = {
  //   width: '100%',
  //   height: '100%',
  //   cursor: 'zoom-out',
  //   '&:hover': {
  //     backgroundImage: src,
  //     opacity: 0,
  //     backgroundPosition: `${mouseX}% ${mouseY}%`,
  //     backgroundSize: `${size}%`
  //   }
  // };
  const renderPortal = ({ portal }) => {
    return portal(
      <div>
        <ModalContainer onClick={e => setmodalOpen(!modalOpen)}>
          <ModalBody
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <ModalImg src={currentStyle.photos[currentIndex].url}></ModalImg>
            <ThumbnailExpandedContainer>
              <LeftExpand
                onClick={e => {
                  e.stopPropagation();
                  {
                    currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : null;
                  }
                }}
              >
                <ChevronLeftIcon />
              </LeftExpand>
              {renderExpandedPhotos()}
              <RightExpand
                onClick={e => {
                  {
                    currentIndex < currentStyle.photos.length - 1
                      ? setCurrentIndex(currentIndex + 1)
                      : null;
                  }
                }}
              >
                <ChevronRightIcon />
              </RightExpand>
            </ThumbnailExpandedContainer>
          </ModalBody>
        </ModalContainer>
      </div>
    );
  };

  const getItemsForPage = () => {
    const numberOfItemsToShow = 7;
    const start = currentPage * numberOfItemsToShow;
    const end = (currentPage + 1) * numberOfItemsToShow;
    return currentStyle.photos.slice(start, end);
  };

  const getpage = newindex => {
    const min = currentPage * 7;
    const max = currentPage * 7 + 7 || 7;
    if (newindex >= max) {
      setCurrentPage(currentPage + 1);
    }

    if (newindex < min) {
      setCurrentPage(currentPage - 1);
    }
    setCurrentIndex(newindex);
  };

  return (
    <MainImgContainer>
      <ThumbnailContainer>
        {currentPage !== 0 && (
          <Up onClick={() => setCurrentPage(currentPage - 1)}>
            <ArrowUpward />
          </Up>
        )}
        {renderPhoto()}
        {getItemsForPage().length === 7 && (
          <Down onClick={() => setCurrentPage(currentPage + 1)}>
            <ArrowDownward />
          </Down>
        )}
      </ThumbnailContainer>

      {currentIndex > 0 && (
        <Left onClick={() => getpage(currentIndex - 1)}>
          <ChevronLeftIcon size='large' />
        </Left>
      )}
      {currentIndex < currentStyle.photos.length - 1 && (
        <Right onClick={() => getpage(currentIndex + 1)}>
          <ChevronRightIcon />
        </Right>
      )}
      <MainImage
        src={currentStyle.photos[currentIndex].url}
        onClick={() => setmodalOpen(!modalOpen)}
      ></MainImage>
      {modalOpen ? (
        <PortalWithState defaultOpen closeOnEsc>
          {renderPortal}
        </PortalWithState>
      ) : null}
    </MainImgContainer>
  );
}

// const renderPortal = ({ portal }) => {
//   return portal(
//     <div>
//       <ModalContainer
//         onClick={(e) => setmodalOpen(false)}>
//         <ModalBody
//           onClick = {(e) => {
//             e.stopPropagation();
//           }}>
//           {zoomMode ?
//             <div style={ZoomImg}>
//               <img
//                 onClick={() => setZoomMode(!zoomMode)}
//                 onMouseMove={(e) => handleMouseMovement(e)}
//                 onMouseOver = {() => handleMouseOver}
//                 onMouseOut = {() => handleMouseOut}
//                 src = {currentStyle.photos[currentIndex].url}>
//               </img>
//             </div>
//             :
//             <>
//               <ModalImg
//                 onClick={() => setZoomMode(!zoomMode)} src={src}>
//               </ModalImg>
//               <ThumbnailExpandedContainer>
//                 <LeftExpand onClick={(e) => {
//                   e.stopPropagation();
//                   { currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : null; }
//                 }}><ChevronLeftIcon/>
//                 </LeftExpand>
//                 {renderExpandedPhotos()}
//                 <RightExpand onClick={(e) => {
//                   { currentIndex < currentStyle.photos.length - 1 ? setCurrentIndex(currentIndex + 1) : null; }
//                 }}><ChevronRightIcon/></RightExpand>
//               </ThumbnailExpandedContainer>
//             </>
//           }
//         </ModalBody>
//       </ModalContainer>
//     </div>
//   );
// };
