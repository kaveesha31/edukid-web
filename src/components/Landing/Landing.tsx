import React from "react";

export function Landing() {

    return (
        <>
            <div className="header">
                <div className="header__left">
                    
                    <div>
                        <img src={"logos/logo.png"} alt="" style={{width:"50%"}}/>
                    </div>
                </div>

                <div className="header__icons">
                    <div className="icons">
                        <a href={"/login"} className="home_nav"><i className="material-icons">login</i>Login</a>
                        <a href={"/signup"} className="home_nav"><i className="material-icons">how_to_reg</i>SignUp</a>
                    </div>
                    
                </div>
            </div>
            <div className="mainBody">
                <div className="container">
                    <div className="row">
                            <div className="col-sm">
                                <div className="d-flex justify-content-center mt-4 mb-1 align-middle">
                                    <div className="image">
                                        <img className="image-girl" src={"\\images\\girl2.webp"} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="d-flex mt-5 mb-1 ml-3">
                                    <div className="text">
                                        <h1>For every student,<br />every classroom. <br />Real results.</h1> <br />
                                        <p>We’re a nonprofit with the mission to provide a free, world-class education for anyone, anywhere.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}
