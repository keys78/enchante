import React, { useEffect, useCallback, useState } from "react";

interface CardItem {
  id: number;
  title: string;
  copy: string;
}

const cardItems: CardItem[] = [
  {
    id: 1,
    title: "Stacked Card Carousel",
    copy:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla. Etiam sed interdum est."
  },
  {
    id: 2,
    title: "Second Item",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 3,
    title: "A Third Card",
    copy:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla."
  },
  {
    id: 4,
    title: "Fourth",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

interface Indexes {
  previousIndex: number;
  currentIndex: number;
  nextIndex: number;
}

function determineClasses(indexes: Indexes, cardIndex: number): string {
  if (indexes.currentIndex === cardIndex) {
    return "active";
  } else if (indexes.nextIndex === cardIndex) {
    return "next";
  } else if (indexes.previousIndex === cardIndex) {
    return "prev";
  }
  return "inactive";
}

const CardCarousel: React.FC = () => {
  const [indexes, setIndexes] = useState<Indexes>({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1
  });

  const handleCardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex >= cardItems.length - 1) {
      setIndexes({
        previousIndex: cardItems.length - 1,
        currentIndex: 0,
        nextIndex: 1
      });
    } else {
      setIndexes((prevState) => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems.length
            ? 0
            : prevState.currentIndex + 2
      }));
    }
  }, [indexes.currentIndex]);

  useEffect(() => {
    const transitionInterval = setInterval(() => {
      handleCardTransition();
    }, 4000);

    return () => clearInterval(transitionInterval);
  }, [handleCardTransition, indexes]);

  return (
    <div className="container">
      <ul className="card-carousel">
        {cardItems.map((card, index) => (
          <li
            key={card.id}
            className={`card ${determineClasses(indexes, index)}`}
          >
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardCarousel;
















import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CartItem, Product } from '../../types';
import { useAddQuantity, useAddToCart, useDecreaseQuantity } from '../hooks/CartCTABtn';
import img_s_x from '../../assets/png/img_s_x.jpg';
import { useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';

const selectedProductsArray = [
  {
    id: '1',
    category: 'men',
    name: 'Iphone Pro MAX',
    image: img_s_x,
    desc: 'no',
    color: 'red',
    free_shipping: true,
    brand: 'Apple',
    price: 900,
    star_ratings: 3,
  },
  {
    id: '2',
    category: 'women',
    name: 'Lipstick',
    image: img_s_x,
    desc: 'yes',
    color: 'red',
    free_shipping: true,
    brand: 'Apple',
    price: 900,
    star_ratings: 3,
  },
  {
    id: '3',
    category: 'men',
    name: 'Shoe',
    image: img_s_x,
    desc: 'go',
    color: 'red',
    free_shipping: true,
    brand: 'Apple',
    price: 900,
    star_ratings: 3,
  },
];

const SelectedProducts = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  const addToCart = useAddToCart();
  const addQuantity = useAddQuantity();
  const decreaseQuantity = useDecreaseQuantity();

  const [itemsToShow, setItemsToShow] = useState(3); // Default to 3 items per view

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 1024 && screenWidth >= 768) {
        setItemsToShow(2);
      } else if (screenWidth < 768) {
        setItemsToShow(1);
      } else {
        setItemsToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className='pt-44 pb-20'>
      <div className='mx-auto px-8'>
        <h1 className="text-4xl font-nunitosans font-bold leading-tight pb-12">Selected Products</h1>

        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          dynamicHeight={true}
          infiniteLoop={true}
          centerMode={true}
          centerSlidePercentage={10}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '2%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                }}
              >
                Previous
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '2%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                }}
              >
                Next
              </button>
            )
          }
          itemsToShow={2}
        >
          {selectedProductsArray.map((val: Product, i: number) => {
            const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === val.id);

            return (
              <div key={i}>
                <div key={val.id} className="product border border-black">
                  <h3>{val.name}</h3>
                  <img
                    className="w-[300px]"
                    src={val.image}
                    alt={val.name}
                  />
                  <div className="details">
                    <span>{val.desc}</span>
                    <span className="price">${val.price}</span>
                  </div>
                  {existingCartItem ? (
                    <div className="cart-actions">
                      <button
                        className="rounded p-2 bg-red-500 text-white"
                        onClick={() => decreaseQuantity(existingCartItem)}
                      >
                        -
                      </button>
                      <span>{existingCartItem.cartQuantity}</span>
                      <button
                        className="rounded p-2 bg-green-500 text-white"
                        onClick={() => addQuantity(existingCartItem)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="rounded p-4 bg-red-500 text-white"
                      onClick={() => addToCart(val)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}

export default SelectedProducts;
