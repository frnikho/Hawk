import React from "react";

function Home() {
    return (
        <div className="container">
            <div className="row m-5">
                <div className="col">
                    <h1 className="text-center text-white">Hawk</h1>
                </div>
            </div>
            <div className="row justify-content-center m-5">
                <div className="col-sm-5">
                    <div className="container">
                        <div className="row m-5">
                            <div className="col">
                                <h1 className="text-center">Play</h1>
                            </div>
                            <div className="col">
                                <form>
                                    <div className="form-group">
                                        <label>Pseudo</label>
                                        <input type="text" className="form-control" placeholder="Taper un pseudo"></input>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Create room</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;