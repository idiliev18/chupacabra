import React from "react";
import LoadingSVG from "../loading.svg";

function Loading() {
    return (
        <div className="center" style={{ minHeight: "100vh" }}>
            <img src={LoadingSVG} />
        </div>
    );
}

export default Loading;
