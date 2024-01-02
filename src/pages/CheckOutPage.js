import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/BookContext";
import "./css/CheckOutPage.css";
import NavBar from "../components/NavBar2";
import { useNavigate } from 'react-router-dom';
import { HiMiniShoppingCart } from "react-icons/hi2";
import ShippingDetails from "../components/ShippingDetails";
import CardDetails from "../components/CardDetails";
import OrderSummary from "../components/OrderSummary";
import { TiTick } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { TbShoppingCartX } from "react-icons/tb";
import { useFirebase } from "../context/FirebaseContext";
import { Timestamp } from "firebase/firestore";
import Swal from 'sweetalert2';
import confirmOrder from '../assests/order_placed.png'
import { v4 as uuidv4 } from "uuid";

const CheckOutPage = () => {
  const { cart, setCart } = useGlobalContext();
  const { Firebaseauth, putData, getData } = useFirebase();
  const navigate = useNavigate();

  const [totalCost, setTotalCost] = useState(0);
  const [page, setPage] = useState(1);

  const formtitles = ["Shipping details", "Payment Info", "Order Summary"];

  const [formData, setFormData] = useState({
    StreetAddress: "",
    apt: "",
    State: "",
    ZipCode: "",
    Phone: "",
    Email: "",
    SubTotal: "",
    shipping: "4.89",
    tax: "2.00",
    GrandTotal: "",
  });

  const [cardData, setCardData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const orderConfirmPopup = () =>{
    Swal.fire({
      title: "Order Placed Successfully!",
      text: "Thank you for shopping with us. Your order has been confirmed.",
      imageUrl: confirmOrder,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Custom image"
    });
  }

  const handleSubmit = async () => {
    const user = Firebaseauth.currentUser;

    if (cart.length === 0) {
      return alert("add iems to cart to place order");
    }

    if (user) {
      try {
        const currentHistory = await getData(
          `users/${user.uid}/purchaseHistory`
        );

        const existingHistory = currentHistory?.orders || {};

        const purchaseId = uuidv4();

        const newPurchase = {
          [purchaseId]: {
            formData,
            cardData,
            cart,
            timestamp: Timestamp.now(),
          },
        };

        console.log(newPurchase);

        await putData(`users/${user.uid}/purchaseHistory`, {
          orders: { ...existingHistory, ...newPurchase },
        });

        orderConfirmPopup();
        navigate('/catalog')

        setCart([]);
      } catch (error) {
        console.error("Error updating purchase history:", error.message);
      }
    }
  };

  const PageDisplay = () => {
    if (page === 1) {
      return <ShippingDetails formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <CardDetails cardData={cardData} setCardData={setCardData} />;
    } else
      return (
        <OrderSummary
          formData={formData}
          setFormData={setFormData}
          totalcost={calcTotalCost}
        />
      );
  };

  const calcTotalCost = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const increaseQuant = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemIndex !== -1) {
      const updatedItem = { ...cart[itemIndex] };
      updatedItem.quantity += 1;

      const updatedCart = [...cart];
      updatedCart[itemIndex] = updatedItem;

      setCart(updatedCart);
    }
  };

  const decreaseQuant = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    console.log(itemIndex);
    if (itemIndex !== -1) {
      const updatedItem = { ...cart[itemIndex] };
      updatedItem.quantity = Math.max(updatedItem.quantity - 1, 1);

      const updatedCart = [...cart];
      updatedCart[itemIndex] = updatedItem;

      setCart(updatedCart);
    }
  };

  const removeCartItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  useEffect(() => {
    setTotalCost(calcTotalCost);
    // eslint-disable-next-line
  }, [cart]);

  return (
    <div>
      <NavBar />
      <div className="checkout">
        <div className="left-section">
          <div className="checkout_container">
            <div className="form_container">
              <div className="header">
                <div className="progressbar">
                  <div class="circle">{page > 1 ? <TiTick /> : "1"}</div>
                  <div className="step">Shipping Details</div>
                  <div class="circle">{page > 2 ? <TiTick /> : "2"}</div>
                  <div className="step">Payment Info </div>
                  <div class="circle">{page > 3 ? <TiTick /> : "3"}</div>
                  <div className="step"> Order Summary </div>
                  <div class="circle">{page > 4 ? <TiTick /> : "4"}</div>
                </div>
                <p>Step {page}</p>
                <h2 className="steptitle">{formtitles[page - 1]}</h2>
              </div>
              <div className="formbody">{PageDisplay()}</div>
              <div className="footer">
                <button
                  className="btn"
                  style={{
                    pointerEvents: page === 1 ? "none" : "auto",
                    opacity: page === 1 ? 0.5 : 1,
                  }}
                  disabled={page === 1}
                  onClick={() => {
                    setPage((currPage) => currPage - 1);
                  }}
                >
                  Prev
                </button>
                <button
                  className="btn"
                  disabled={page === formtitles.length + 1}
                  onClick={() => {
                    if (page >= formtitles.length) {
                      handleSubmit();
                    } else {
                      setPage((currPage) => currPage + 1);
                    }
                  }}
                >
                  {page >= formtitles.length ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="cart_items_scrollable">
            <div className="cart_items">
              <div className="cart_head">
                <h2 className="">
                  Shopping Cart <HiMiniShoppingCart className="cart-icon" />
                </h2>
              </div>
              <div
                classname="cart_body"
                style={{ height: "540px", width: "100%" }}
              >
                {cart.length === 0 ? (
                  <div
                    classname="emptyCart"
                    style={{
                      display: "flex",
                      textAlign: "center",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h1>
                        <TbShoppingCartX />
                      </h1>
                      <h2>
                        {" "}
                        Your cart is <span className="highlight">Empty ⚠️</span>
                      </h2>
                      <button
                        className="btn"
                        onClick={() => navigate("/catalog")}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="cart___items">
                    {cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <div className="cart-item__left">
                          <div className="cart-item-image">
                            <img src={item.image} alt="img" />
                          </div>
                        </div>
                        <div className="cart-item__right">
                          <div className="cart-item-details">
                            <h3 className="cart_title">Title: {item.title}</h3>
                            <p className="price">Price: ${item.price}</p>
                            <div className="quantity-container">
                              <button
                                className="quantitybtn"
                                onClick={() => decreaseQuant(item)}
                              >
                                -
                              </button>
                              <p> {item.quantity}</p>
                              <button
                                className="quantitybtn"
                                onClick={() => increaseQuant(item)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            className="delete"
                            onClick={() => removeCartItem(item.id)}
                          >
                            <MdDeleteForever />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grandTotal">
            <div className="alignRight">
              <h2>Grand Total: </h2>
              <div>
                <h2> $ {totalCost}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
