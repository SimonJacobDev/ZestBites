import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
    >
      <div className="container py-5">
        <div className="row">
       
          <div className="col-md-4 mb-4">
            <h4
              className="fw-bold text-uppercase"
              style={{ color: "#ff9800" }} 
            >
              ZestBites
            </h4>
            <p className="small">
              Delivering delicious food to your doorstep. Fresh, fast, and
              flavorful.
            </p>
            <span className="text-muted" style={{ color: "#cccccc" }}>
              © 2025 ZestBites, Inc. All Rights Reserved.
            </span>
          </div>

         
          <div className="col-md-4 mb-4">
            <h5
              className="fw-bold text-uppercase"
              style={{ color: "#ff9800" }}
            >
              Quick Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/"
                  className="text-decoration-none"
                  style={{
                    color: "#ffffff",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#ff9800")}
                  onMouseOut={(e) => (e.target.style.color = "#ffffff")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/my-order"
                  className="text-decoration-none"
                  style={{
                    color: "#ffffff",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#ff9800")}
                  onMouseOut={(e) => (e.target.style.color = "#ffffff")}
                >
                  My Order
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
