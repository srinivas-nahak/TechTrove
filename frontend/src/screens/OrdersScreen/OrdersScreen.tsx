import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Card from "../../components/UI/Card/Card";
import {
  useCancelOrderMutation,
  useGetOrdersAdminQuery,
  useGetOrdersQuery,
  useUpdateOrderAdminMutation,
} from "../../store/apiSlices/orderApiSlice";
import { OrderType } from "../../utils/customTypes";
import styles from "./OrdersScreen.module.css";
import {
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import CustomModalDialog from "../../components/CustomModalDialog/CustomModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import apiSlice from "../../store/apiSlices/apiSlice";
import BackButton from "../../components/UI/BackButton/BackButton";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

let updatingOrderId: undefined | string = undefined;
const OrdersScreen = () => {
  const dispatch = useDispatch();

  const [selectedOrder, setSelectedOrder] = useState<number | undefined>(
    undefined
  );

  const { screenWidth } = useGetScreenWidth();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const userInfo = useSelector((state: RootState) => state.authReducer);

  //Resetting all the query caches
  useEffect(() => {
    dispatch(apiSlice.util.resetApiState());
  }, []);

  const {
    data: orders,
    isLoading: isOrderItemsLoading,
    //isSuccess: isOrderItemsSuccess,
    //isError,
    //error,
  } = userInfo.isAdmin ? useGetOrdersAdminQuery() : useGetOrdersQuery();

  const [
    updateOrderAdmin,
    {
      //data: updatedOrder,
      isLoading: isUpdateLoading,
      //isSuccess: isUpdateSuccess,
    },
  ] = useUpdateOrderAdminMutation();

  const [
    cancelOrder,
    {
      isLoading: isCancelledOrderLoading,
      //isSuccess: isCancelledOrderSuccess
    },
  ] = useCancelOrderMutation();

  //Showing Loader
  if (isOrderItemsLoading) {
    return <Loader />;
  }

  //Showing no orders text
  if (!orders || orders?.length === 0) {
    return <h1 style={{ textAlign: "center" }}>No orders found!</h1>;
  }

  const orderItemClickHandler = (index: number) => {
    setSelectedOrder((currentSelectedOrder) => {
      if (currentSelectedOrder === index) {
        return undefined;
      }
      return index;
    });
  };

  const orderUpdateHandler = async (order: OrderType) => {
    updatingOrderId = order._id;
    if (userInfo.isAdmin) {
      //Mutating the order
      await updateOrderAdmin({ ...order, isDelivered: !order.isDelivered });
    } else {
      setShowDeleteDialog(true);
    }
  };

  const cancelorderUpdateHandler = async () => {
    setShowDeleteDialog(false);
    await cancelOrder(updatingOrderId!);
    //updatingOrderId = undefined;
  };

  const getOrderStatus = (orderId: string, deliveryStatus: boolean) => {
    if (updatingOrderId === orderId && isUpdateLoading) {
      return <Loader customSize="2rem" />;
    }

    return (
      <li className={styles["order-item-status"]}>
        <span
          className={styles["order-item-status-dot"]}
          style={
            deliveryStatus
              ? { backgroundColor: "#36ba3c" }
              : { backgroundColor: "orange" }
          }
        ></span>
        {deliveryStatus ? "Delivered" : "In transit"}
      </li>
    );
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
        className={styles["order-item-body__details-container"]}
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
    <div className={styles["orders-screen-container"]}>
      {showDeleteDialog && (
        <CustomModalDialog
          message="Delete the Order?"
          dialogType="choice"
          clickHandler={cancelorderUpdateHandler}
          cancelClickHandler={() => setShowDeleteDialog(false)}
        />
      )}
      {screenWidth > 550 && <BackButton />}
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

            return (
              <Card
                className={styles["order-item-container"]}
                key={order._id}
                onClick={() => orderItemClickHandler(index)}
              >
                {isCancelledOrderLoading && updatingOrderId === order._id ? (
                  <Loader customSize="2rem" />
                ) : (
                  <ul className={styles["order-item-header"]}>
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

                    {getOrderStatus(order._id!, order.isDelivered)}
                    <li className={styles["order-item-price"]}>
                      <div>
                        ${order.totalPrice}{" "}
                        <small style={{ display: "block" }}>(with taxes)</small>
                      </div>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          orderUpdateHandler(order);
                        }}
                      >
                        {userInfo.isAdmin ? (
                          !order.isDelivered ? (
                            <FaCheck />
                          ) : (
                            <FaTimes />
                          )
                        ) : (
                          <FaTrash />
                        )}
                      </span>
                    </li>
                  </ul>
                )}
                {getProductsList(order.orderedItems, index)}
              </Card>
            );
          })}
      </div>
    </div>
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
