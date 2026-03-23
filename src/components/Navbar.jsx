import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const isAdmin = apiService.isAdmin();
    const isAuthenticated = apiService.isAuthenticated();
    const isAuditor = apiService.isAuditor();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const confirmLogout = () => {
        apiService.logout();
        setShowModal(false);
        // handleLogout();
        toggleMenu();
        navigate("/login")
    };

    const cancelLogout = () => {
        setShowModal(false);
    };
    // const handleLogout = () => {
    //     setShowModal(true)
    // }

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="navbar-logo full-name">
                    Secure Fintech Bank
                </Link>
                <Link to="/" className="navbar-logo short-name">
                    SFB
                </Link>
               

                {/* Hamburger */}
                <div className="menu-icon" onClick={toggleMenu}>
                    ☰
                </div>

                <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>

                    <li className="navbar-item">
                        <Link to="/home" className="navbar-link" onClick={toggleMenu}>Home</Link>
                    </li>

                    {isAuthenticated ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/profile" className="navbar-link" onClick={toggleMenu}>
                                    Profile
                                </Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/transfer" className="navbar-link" onClick={toggleMenu}>
                                    Transfer
                                </Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/transactions" className="navbar-link" onClick={toggleMenu}>
                                    Transactions
                                </Link>
                            </li>

                            {(isAdmin || isAuditor) && (
                                <>
                                    <li className="navbar-item">
                                        <Link to="/auditor-dashboard" className="navbar-link" onClick={toggleMenu}>
                                            Auditor Dashboard
                                        </Link>
                                    </li>

                                    <li className="navbar-item">
                                        <Link to="/deposit" className="navbar-link" onClick={toggleMenu}>
                                            Deposit
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li className="navbar-item">
                                <button
                                    className="navbar-link logout-btn"
                                    onClick={() => setShowModal(true)}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link" onClick={toggleMenu}>
                                    Login
                                </Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/register" className="navbar-link" onClick={toggleMenu}>Register</Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <p>Are you sure you want to logout?</p>

                        <div className="modal-actions">
                            <button onClick={confirmLogout} className="btn-confirm">
                                Yes
                            </button>

                            <button onClick={cancelLogout} className="btn-cancel">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </nav>
    );
}

export default Navbar;