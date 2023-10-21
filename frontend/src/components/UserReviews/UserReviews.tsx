import { ReviewType } from "../../utils/customTypes";
import UserReviewItem from "./UserReviewItem/UserReviewItem";
import styles from "./UserReviews.module.css";

const UserReviews = () => {
  const reviews: ReviewType[] = [
    {
      userId: "r1",
      userDisplayPicture: "./images/user_imgs/emily_anderson.jpg",
      rating: 5.0,
      name: "Emily Anderson",
      comment:
        "Great store! I found the latest smartphone at an amazing price. Fast shipping and excellent customer service.",
    },
    {
      userId: "r2",
      userDisplayPicture: "./images/user_imgs/jacob_williams.jpg",
      rating: 4.0,
      name: "Jacob Williams",
      comment:
        "Good selection of tech products. Prices are competitive. The only downside is the slightly. Great experience overall!",
    },
    {
      userId: "r3",
      userDisplayPicture: "./images/user_imgs/olivia_mitchell.jpg",
      rating: 3.5,
      name: "Olivia Mitchell",
      comment:
        "Decent store. Product quality is okay, but customer service could be more responsive. But looking forward to explore.",
    },
    {
      userId: "r4",
      userDisplayPicture: "./images/user_imgs/choi_sing.jpg",
      rating: 4.0,
      name: "Choi Sing",
      comment:
        "I had a positive experience shopping here. The website is user-friendly, and the products arrived in good condition.",
    },
    {
      userId: "r5",
      userDisplayPicture: "./images/user_imgs/benjamin_taylor.jpg",
      rating: 3.0,
      name: "Benjamin Taylor",
      comment:
        "Not satisfied with my purchase. The item was damaged on arrival, and it took a long time. Could be better service!",
    },
    {
      userId: "r6",
      userDisplayPicture: "./images/user_imgs/sophia_roberts.jpg",
      rating: 3.5,
      name: "Sophia Roberts",
      comment:
        "Impressive tech store! The variety of products and deals are unmatched. Quick delivery, and excellent customer support.",
    },

    {
      userId: "r7",
      userDisplayPicture: "./images/user_imgs/ava_davis.jpg",
      rating: 4.0,
      name: "Ava Davis",
      comment:
        "A reliable tech store. Competitive prices, but delivery can be slow at times. Overall, a good place to buy tech from.",
    },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     onNextHandler();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className={styles["user-reviews-container"]}>
      <h1>What our Customers say!</h1>
      <div className={styles["user-reviews"]}>
        {reviews.map((review, index) => (
          <div className={styles["user-review-item"]} key={review.userId}>
            <UserReviewItem review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;

//left: index === position ? "0" : `${index * 25}rem`,
