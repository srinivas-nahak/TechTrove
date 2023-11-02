import { ReviewType } from "../../../utils/customTypes";
import Rating from "../../Rating/Rating";
import Card from "../../UI/Card/Card";
import styles from "./UserReviewItem.module.css";

const UserReviewItem: React.FC<
  React.HTMLProps<HTMLElement> & { review: ReviewType }
> = ({ review, ...props }) => {
  return (
    <Card
      className={`${styles["user-review-item-container"]} ${props.className}`}
    >
      <div className={styles["user-review-info"]}>
        <img src={review.userDisplayPicture} alt={review.name} />
        <p className={styles["user-review-info__username"]}>{review.name}</p>
        <Rating
          rating={review.rating}
          className={styles["user-review-info__rating"]}
        />
      </div>

      <p>{review.comment}</p>
    </Card>
  );
};

export default UserReviewItem;
