import React from 'react';
function Footer() {
    return (
        <div className="container">
            <footer className="py-5">
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <h5>ADDRESS</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">1234 Street address HCM City</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Tel: 888-888-8888</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">E-mail: admin@email.com</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>USEFUL LINKs</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="/about" className="nav-link p-0 text-body-secondary">About</a></li>
                            <li className="nav-item mb-2"><a href="/dang-nhap" className="nav-link p-0 text-body-secondary">Login</a></li>
                            <li className="nav-item mb-2"><a href="/dangKy" className="nav-link p-0 text-body-secondary">Register</a></li>
                        </ul>
                    </div>
                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly digest of what's new and exciting from us.</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label  className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
                                    <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>&copy; 2023 Company, Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-tweeter"></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-instagram"></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-facebook"></i></a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Footer;