import React, { Component } from "react";

export class ViewPanel extends Component {
render(){
    return(
        <div>
            <img className="LargeImg" src={process.env.PUBLIC_URL + "/server/ImgDB/Publication/ABerghoff-MA/DS0001-PNGs/CH0001/DR0001/ABerghoffMA-DS0001TP0232DR0001CH0001PL(ZA)-Full.png"} alt={"BigImg"}></img>
        </div>
    );
}
}
