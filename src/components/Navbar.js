import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const loadCart = () => {
        setCartView(true);
    };

    const items = useCart();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top" style={{ zIndex: "10" }}>
                <div className="container-fluid">
             
                    <Link className="navbar-brand fs-2 fw-bold text-warning" to="/">
                        ZestBites
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-dark fs-5 mx-3" to="/">
                                    Home
                                </Link>
                            </li>
                            {localStorage.getItem('token') && (
                                <li className="nav-item">
                                    <Link className="nav-link text-dark fs-5 mx-3" to="/myorder">
                                        My Orders
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {!localStorage.getItem('token') ? (
                            <div className="d-flex align-items-center">
                                <Link
                                    className="btn btn-outline-warning rounded-pill px-4 mx-2"
                                    to="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="btn btn-warning text-white rounded-pill px-4 mx-2"
                                    to="/signup"
                                >
                                    Signup
                                </Link>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div
                                    className="btn btn-light position-relative rounded-pill px-4 mx-2"
                                    onClick={loadCart}
                                >
                                    <Badge color="secondary" badgeContent={items.length}>
                                        <ShoppingCartIcon style={{ color: '#FF9800' }} />
                                    </Badge>
                                    <span className="ms-2">Cart</span>
                                </div>

                                {cartView && (
                                    <Modal onClose={() => setCartView(false)}>
                                        <Cart />
                                    </Modal>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="btn btn-danger rounded-pill px-4 mx-2"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
