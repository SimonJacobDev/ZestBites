import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setorderData] = useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch("http://localhost:5000/api/auth/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
        }).then(async (res) => {
            let response = await res.json();
            setorderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <div>
                <Navbar />
            </div>

            <div className="container flex-grow-1 py-5">
                <div className="row">
                    {orderData && orderData.orderData
                        ? orderData.orderData.order_data
                              .slice(0)
                              .reverse()
                              .map((item, index) => (
                                  <div key={index}>
                                      {item.map((arrayData, idx) => (
                                          <div key={idx} className="mb-4">
                                              {arrayData.Order_date ? (
                                                  <div className="order-date mt-5">
                                                      <h4 className="text-center text-muted">
                                                          {arrayData.Order_date}
                                                      </h4>
                                                      <hr />
                                                  </div>
                                              ) : (
                                                  <div className="col-12 col-md-6 col-lg-3">
                                                      <div className="card border-light shadow-sm mt-3">
                                                          <img
                                                              src={arrayData.img}
                                                              className="card-img-top"
                                                              alt={arrayData.name}
                                                              style={{
                                                                  height: "180px",
                                                                  objectFit: "cover",
                                                              }}
                                                          />
                                                          <div className="card-body">
                                                              <h5 className="card-title">{arrayData.name}</h5>
                                                              <div className="d-flex justify-content-between align-items-center">
                                                                  <div className="d-flex flex-column">
                                                                      <span>{arrayData.qty}</span>
                                                                      <span>{arrayData.size}</span>
                                                                      <span>{arrayData.Order_date}</span>
                                                                  </div>
                                                                  <div className="fs-5 text-primary">
                                                                      ₹{arrayData.price}/-
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              )}
                                          </div>
                                      ))}
                                  </div>
                              ))
                        : "No orders found."}
                </div>
            </div>

            <Footer />
        </div>
    );
}
