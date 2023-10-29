import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "./Rating.module.css";
import { Fragment } from "react";

const Rating: React.FC<
  React.HTMLProps<HTMLElement> & { rating: number; numReviews?: number }
> = ({ rating, numReviews, className }) => {
  function getStar(rating: number, index: number) {
    if (rating >= index + 1) {
      return <FaStar key={index} />;
    } else if (rating >= index + 0.5) {
      return <FaStarHalfAlt key={index} />;
    } else {
      return <FaRegStar key={index} />;
    }
  }

  const stars = Array.from({ length: 5 }, (_, index) => (
    <Fragment key={index}>{getStar(rating, index)}</Fragment>
  ));

  // const reviewText = numReviews
  //   ? `${numReviews} ${numReviews > 1 ? "reviews" : "review"}`
  //   : "";

  return (
    <div className={`${className} ${styles.Rating}`}>
      {stars}{" "}
      {numReviews && (
        <span style={{ fontSize: "0.85rem" }}>({numReviews})</span>
      )}
    </div>
  );
};

export default Rating;
