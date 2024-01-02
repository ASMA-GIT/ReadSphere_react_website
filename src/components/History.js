import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { format } from "date-fns";
import "./css/History.css";
import { useNavigate } from "react-router-dom";
import { TbHistoryToggle } from "react-icons/tb";
import NavBar from "./NavBar2";
import { BsCalendarDateFill } from "react-icons/bs";
import cart_empty from "../assests/cart_empty.png";

const History = () => {
  const { Firebaseauth, getData } = useFirebase();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = Firebaseauth.onAuthStateChanged((user) => {
      if (user) {
        const fetchPurchaseHistory = async () => {
          try {
            const data = await getData(
              `users/${user.uid}/purchaseHistory/orders`
            );
            if (data) {
              const historyArray = Object.values(data);
              console.log(historyArray);
              setPurchaseHistory(historyArray);
            }
          } catch (error) {
            console.error("Error fetching purchase history:", error.message);
          }
        };
        fetchPurchaseHistory();
      } else {
        setPurchaseHistory([]);
      }
    });

    return () => unsubscribe();
  }, [Firebaseauth, getData]);

  useEffect(() => {
    console.log("Updated purchase history:", purchaseHistory);
  }, [purchaseHistory]);

  return (
    <div className="HistoryPage">
      <NavBar />
      <div className="pageTitle">
        <h1>
          Order History <TbHistoryToggle />
        </h1>
      </div>
      {purchaseHistory.length === 0 ? (
        <div className="no_history">
          <div className="empty_cart">
            <div className="empty_cart_container">
              <img src={cart_empty} alt="" />
            </div>
          </div>
          <div>
            <h3>
              No Purchase <span className="highlight">History ⚠️</span>
            </h3>
            <p>Check back after your next order</p>
          </div>
          <div>
            <button className="btn" onClick={() => navigate("/catalog")}>
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="orderDetails_container">
          <h4 style={{textAlign:'right',fontSize:'x-large'}}>Total orders: {purchaseHistory.length}</h4>
          {purchaseHistory.map((purchase, i) => (
            <div key={i} className="order_card">
              <div className="section1">
                {purchase.cart && <img src={purchase.cart[0].image} alt="" />}
              </div>
              <div className="section4">
                {purchase.cart[0].title}
              </div>
              <div className="section2">
                  {purchase.timestamp && (
                    <h3>
                      <BsCalendarDateFill />{" "}
                      {format(
                        new Date(purchase.timestamp.seconds * 1000),
                        "MMM dd, yyyy "
                      )}
                    </h3>
                  )}
                  <h4 className="order_type">Subscription Purchase</h4>
                </div>
                <div className="section3">
                  <h3>Total: $ {purchase.formData.GrandTotal}</h3>
                </div>
              {/* <div className="section_right">
                
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
