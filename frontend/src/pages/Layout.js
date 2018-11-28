import React from "react";
import Footer from "./Footer";
import Header from "../containers/Header";

const Layout = props => (
    <div>
        <div className="row">
            <div className="col-12">
                <Header />
            </div>
        </div>
        <br />
        <div className="row">{props.children}</div>
        <div className="row">
            <div className="col-12">
                <Footer />
            </div>
        </div>
    </div>
);

export default Layout;
