import { useState } from "react";
import Loader from "../../components/Loader";
import Card from "../../components/UI/Card/Card";
import {
  useGetOrdersAdminQuery,
  useGetOrdersQuery,
  useUpdateOrderAdminMutation,
} from "../../store/apiSlices/orderApiSlice";
import { OrderType } from "../../utils/customTypes";
import styles from "./OrdersScreen.module.css";
import { FaCheck, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import CustomModalDialog from "../../components/CustomModalDialog/CustomModalDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const OrdersScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState<number | undefined>(
    undefined
  );

  const [updatingOrderId, setUpdatingOrderId] = useState<string | undefined>(
    undefined
  );

  const userInfo = useSelector((state: RootState) => state.authReducer);

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = userInfo.isAdmin ? useGetOrdersAdminQuery() : useGetOrdersQuery();

  const [updateOrderAdmin, { isLoading: updateLoading }] =
    useUpdateOrderAdminMutation();

  if (isLoading) {
    return <Loader />;
  }

  const orderItemClickHandler = (index: number) => {
    setSelectedOrder((currentSelectedOrder) => {
      if (currentSelectedOrder === index) {
        return undefined;
      }
      return index;
    });
  };

  const orderHandler = (orderId: string) => {
    if (userInfo.isAdmin) {
      setUpdatingOrderId(orderId);
      updateOrderAdmin(orderId);
    }
  };

  const getStyle = (index: number) => {
    //Open
    if (index !== undefined && index === selectedOrder) {
      return {
        maxHeight: "999px",
        marginTop: "0.5rem",
        transition: "all 1s ease-in-out",
      };
    }

    //Close
    return {
      maxHeight: "0px",
      marginTop: "0.5rem",
      transition: "all 0.8s cubic-bezier(0,1,0,1)",
    };
  };

  const getProductsList = (orderedProducts: any[], index: number) => {
    return (
      <div
        className={styles["order-item-details-container"]}
        style={getStyle(index)}
      >
        {orderedProducts.map((product) => {
          return (
            <div
              className={styles["order-item-details"]}
              key={product.productId}
            >
              <img src={product.image} alt={product.name} />
              <small key={product.productId}>
                {product.name}{" "}
                <span>
                  x {product.qty} = ${product.qty * product.price}
                </span>
              </small>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {false && (
        <CustomModalDialog message="Delete the Order?" dialogType="choice" />
      )}
      <div className={styles["orders-container"]}>
        {orders &&
          orders.map((order: OrderType, index) => {
            const date = new Date(order.paidAt!.toString());

            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
            } as Intl.DateTimeFormatOptions;
            const readableDate = date.toLocaleDateString("en-US", options);

            if (updatingOrderId === order._id && updateLoading) {
              return <Loader />;
            }

            return (
              <Card
                className={styles["order-item-container"]}
                key={order._id}
                onClick={() => orderItemClickHandler(index)}
              >
                <ul className={styles["order-item-title"]}>
                  <li className={styles["order-item-id"]}>
                    <div>
                      Order # {order._id}{" "}
                      <span>
                        {index !== undefined && index === selectedOrder ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                    <small>{readableDate}</small>
                  </li>

                  <li className={styles["order-item-status"]}>
                    <span
                      className={styles["order-item-status-dot"]}
                      style={
                        order.isDelivered
                          ? { backgroundColor: "#36ba3c" }
                          : { backgroundColor: "orange" }
                      }
                    ></span>
                    {order.isDelivered ? "Delivered" : "In transit"}
                  </li>
                  <li className={styles["order-item-price"]}>
                    <div>
                      ${order.totalPrice}{" "}
                      <small style={{ display: "block" }}>(with taxes)</small>
                    </div>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        orderHandler(order._id!);
                      }}
                    >
                      {!order.isDelivered &&
                        (userInfo.isAdmin ? <FaCheck /> : <FaTimes />)}
                    </span>
                  </li>
                </ul>
                {getProductsList(order.orderedItems, index)}
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default OrdersScreen;

{
  /* <AnimatePresence>
  {selectedOrder !== undefined && selectedOrder === index && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <small key={product.productId}>
        {product.name} x {product.qty} = ${product.qty * product.price}
      </small>
    </motion.div>
  )}
</AnimatePresence>; */
}
