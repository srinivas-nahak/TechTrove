import { ReviewType } from "../../../utils/customTypes";
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
      </div>
      <p>{review.comment}</p>
    </Card>
  );
};

export default UserReviewItem;
