import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ProductItem from "../../components/ProductItem/ProductItem";
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "../../store/apiSlices/productApiSlice";
import { errorHandler } from "../../utils/errorHandler";
import styles from "./AllProductsScreen.module.css";
import BackButton from "../../components/UI/BackButton/BackButton";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { useEffect, useRef, useState } from "react";

const AllProductsScreen: React.FC<{ showTrendingProducts?: boolean }> = ({
  showTrendingProducts,
}) => {
  //The screen was not scrolling to the top sometimes so doing it manually
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let categoryHeading = showTrendingProducts
    ? "You can also look at"
    : "Our Top Picks";

  const categories = {
    all: "All Products",
    smart_phones: "Smart Phones",
    game_consoles: "Game Consoles",
    earphones: "Earphones",
    cameras: "Cameras",
  };

  const { category } = useParams();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category
  );
  const [showLoader, setShowLoader] = useState(false);

  const categoriesContainerRef = useRef<HTMLUListElement | null>(null);

  categoryHeading = selectedCategory
    ? categories[selectedCategory as keyof typeof categories]
    : categoryHeading;

  const {
    data: products,
    isLoading,
    error,
  } = selectedCategory && selectedCategory !== "all"
    ? useGetProductsByCategoryQuery(selectedCategory)
    : useGetProductsQuery();

  if (error) {
    return errorHandler(error);
  }

  const categoryClickHandler = (clickedCategory: string) => {
    setSelectedCategory(clickedCategory);

    const targetCategory: HTMLElement | null = document.querySelector(
      `[ref-key="${clickedCategory}"]`
    );
    //Scrolling to particular position
    if (targetCategory) {
      targetCategory.scrollIntoView({ block: "end" });

      // Calculating the offset to center the button on the screen
      const containerWidth = categoriesContainerRef.current?.offsetWidth;
      const buttonWidth = targetCategory.offsetWidth;
      const scrollLeft =
        targetCategory.offsetLeft - (containerWidth! - buttonWidth);
      categoriesContainerRef.current!.scrollLeft = scrollLeft;
    }

    //Showing loader for interactive UX
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 500);
  };

  return (
    <div className={styles["products-container"]}>
      {!category && <h1>{categoryHeading}</h1>}

      {category && (
        <div className={styles["product-categories-container"]}>
          <BackButton />
          <ul
            className={styles["product-categories"]}
            ref={categoriesContainerRef}
          >
            {Object.entries(categories).map(([categoryKey, categoryName]) => {
              const activeButtonClassName =
                categoryKey === selectedCategory
                  ? `${styles["active-button"]}`
                  : "";

              return (
                <li key={categoryKey} ref-key={categoryKey}>
                  <CustomButton
                    onClick={() => categoryClickHandler(categoryKey)}
                    className={activeButtonClassName}
                  >
                    {categoryName}
                  </CustomButton>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {isLoading || showLoader ? (
        <Loader />
      ) : (
        <div className={styles["product-items"]}>
          {products?.map((product, index) => {
            if (showTrendingProducts && index % 3 === 0 && index !== 0) {
              return;
            }

            return <ProductItem product={product} key={product._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default AllProductsScreen;
