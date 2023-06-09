import React, { useEffect, useCallback, useState } from "react";

interface CardItem {
  image: string;
}

interface CardItemsProps {
  cardItems: CardItem[];
}

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

const CardCarousel: React.FC<CardItemsProps> = ({ cardItems }) => {
  const [indexes, setIndexes] = useState<Indexes>({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1
  });

  const handleCardTransition = useCallback(() => {
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
  }, [indexes.currentIndex, cardItems]);

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
            key={index}
            className={`card ${determineClasses(indexes, index)}`}
          >
            <img src={card.image} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardCarousel;
