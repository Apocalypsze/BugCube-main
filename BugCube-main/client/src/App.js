import './App.css';
import {useEffect, useState, useRef } from "react";
import Axios from "axios";
import { PublicationMenu } from './components/Publication.jsx';
import { Grid } from '@material-ui/core';
import { ImageScroller } from './components/ImageScroller';
import Button from '@material-ui/core/Button';

function App() {
  //All Variables are stored in this section

  //var dnsName = "http://195.37.12.200:80"
  var dnsName = "http://localhost:3001"
  var [publist, setpublist] = useState([""]); 
  var [channelList, setChannelList] = useState([])
  var [datasetList, setDatasetList] = useState([])
  var [directionsOptionList, setDirectionOptionList] = useState([])

  var datasetLogger = useRef("")
  var channelLogger = useRef("")
  var directionLogger = useRef("")

  var [leftImgState, setLeftImgState] = useState(process.env.PUBLIC_URL + '/Img/BugCubeLogo.jpeg')
  var [rightImgState, setRightImgState] = useState(process.env.PUBLIC_URL + '/Img/BugCubeLogo.jpeg')

  var [imgList,setImgList] = useState([[],[],[],[]])
  var [textInfo, setTextInfo] = useState("")

  //On loadup run getlist function to fill dropdown menuns
  //These are all get functions which ask the server for the info
  useEffect( () => {
    getlist();
  },[] );

  const getlist = () => {
    Axios.get(dnsName + "/api/publist").then((response) => {
      setpublist(response.data);
      getDatasets(response.data[0]);
    });
  }

  //get request based on the currentinfo which is passed back via params
  const getDatasets = (currentInfo) => {
    datasetLogger.current = currentInfo;
    Axios.get(dnsName + "/api/datasets",{ params: { datasetname: datasetLogger.current } }).then((response) => {
      setDatasetList(response.data);
      getDirectionsOptions(response.data[0]);
    })
  }

  const getDirectionsOptions = (currentdir) => {
    directionLogger.current = currentdir;
    Axios.get(dnsName + "/api/directions",{ params: { directionsname: [directionLogger.current,datasetLogger.current] } }).then((response) => {
      setDirectionOptionList(response.data);
      getChannels(response.data[0]);
      getTextInfo();
    })
  }

  const getTextInfo = () => {
    Axios.get(dnsName + "/api/textinfo",{ params: { textname: [directionLogger.current,datasetLogger.current] } }).then((response) => {
      setTextInfo(response.data);
    })
  }

  const getChannels = async (currentInfo) => {
    channelLogger.current = currentInfo;

    Axios.get(dnsName + "/api/channels",{ params: { channelname: [channelLogger.current,datasetLogger.current,directionLogger.current] } }).then((response) => {
      setChannelList(response.data);
      getImgList(response.data[0]);

    })
  }

  const getImgList = (currentInfo) => {
    Axios.get(dnsName + "/api/images",{ params: { pathinfo: [directionLogger.current,datasetLogger.current,channelLogger.current,currentInfo] } }).then((response) => {
      setImgList([[],[],[],[]]);
      setImgList(response.data);
    })
  }


  return (
    <div className="App">
{/*For Future projects a navigation bar can be set here*/}
   {/*} <Grid item xs={12}>
      <div className="NavBar"></div>
    </Grid>
  */}

  {/*The dropdown menu section is built here*/}
    <Grid container spacing={2}>
        <Grid item xs={4}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
          <div className="MenuBar">
        <PublicationMenu id="Publication" list={publist} channelprop={getDatasets} labelName={"Publication: "}></PublicationMenu>
        <PublicationMenu id="Dataset" list={datasetList} channelprop={getDirectionsOptions} labelName={"Dataset: "}></PublicationMenu>
        <PublicationMenu id="DirectionsOption" list={directionsOptionList} channelprop={getChannels} labelName={"DirectionsOption: "}></PublicationMenu>
        <PublicationMenu id="Channel" list={channelList} channelprop={getImgList} labelName={"Channel: "}></PublicationMenu>
        </div>

  {/*The information box is created here*/}
          </Grid>
          <Grid item xs={12}  >
            <div className="InfoBox">
            <textarea readOnly="readonly" className="InnerBox" value={textInfo}></textarea>          
            </div>
            </Grid>
        </Grid>
    <div >  

  {/*The smaller preview of the image stacks are created here*/}
        <Grid container spacing={3} className="ScrollingContainer">
        <Grid item xs={3}>
          <ImageScroller imgprop={imgList[0]} leftImgProp={setLeftImgState} rightImgProp={setRightImgState}></ImageScroller>
        </Grid>
        <Grid item xs={3}>
          <ImageScroller imgprop={imgList[1]} leftImgProp={setLeftImgState} rightImgProp={setRightImgState}></ImageScroller>
        </Grid>
        <Grid item xs={3}>
          <ImageScroller imgprop={imgList[2]} leftImgProp={setLeftImgState} rightImgProp={setRightImgState}></ImageScroller>
        </Grid>
        <Grid item xs={3}>
          <ImageScroller imgprop={imgList[3]} leftImgProp={setLeftImgState} rightImgProp={setRightImgState}></ImageScroller>
        </Grid>
      </Grid>
      </div>

  {/*The download buttons are created here, they do not have the download function yet*/}
      <div >
      <Grid container spacing={2} >
      <Grid className="test1" container xs={12}>
        <Grid className="btn" xs={3} container direction="column" spacing={1}>
        <Grid item xs={12}>
            <Button variant="contained" color="default">Z-Stacks</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">T-Stacks-ZM</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">T-Stacks-ZN</Button>
          </Grid>
        </Grid>
        <Grid className="btn" xs={3} container direction="column" spacing={1}>
        <Grid item xs={12}>
            <Button variant="contained" color="default">Z-Stacks</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">T-Stacks-ZM</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">T-Stacks-ZN</Button>
          </Grid>
        </Grid>
        <Grid className="btn" xs={3} container direction="column" spacing={1}>
        <Grid item xs={12}>
            <Button variant="contained" color="default">Z-Stacks</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">T-Stacks-ZM</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">T-Stacks-ZN</Button>
          </Grid>
        </Grid>
        <Grid className="btn" xs={3} container direction="column" spacing={1}>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Z-Stacks</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">T-Stacks-ZM</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">T-Stacks-ZN</Button>
          </Grid>
        </Grid>
      </Grid>
      </Grid>

  {/*Footer for the website with an impression, privacy policy and contact information link*/}
      </div>
        <div className="footer">
          <a href="google.com">Impressum<br></br></a>
          <a href="google.com">Privacy policy<br></br></a>
          <a href="google.com">Contact Information<br></br></a>         
        </div>
      </Grid>

  {/*The two large panels are here to view specific info*/}
      <Grid item xs={4} class="Panelz">
      <Grid item xs={12}>
      <div className="PanelBar"></div> {/*This is a placeholder for a futre info div */}
      </Grid>
      <div id="Image-Panel-1">
        <img className="ImgHolder" src={leftImgState} alt="testing"></img>
      </div>
       </Grid>
       <Grid item xs={4} class="Panelz">
      <Grid item xs={12}>
      <div className="PanelBar"></div> {/*This is a placeholder for a futre info div */}
      </Grid>
      <div id="Image-Panel-2">
      <img className="ImgHolder" src={rightImgState} alt="testing" width="480" height="880"></img>
      </div>
       </Grid>
      </Grid>

    </div>
  );
}

export default App;
