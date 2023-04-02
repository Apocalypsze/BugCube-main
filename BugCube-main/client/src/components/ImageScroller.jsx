import React, { Component } from "react";
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import equal from 'fast-deep-equal'

export class ImageScroller extends Component {
  state = { 
    active: 0,
    images: []
  };

  componentDidMount() {
    this.stack.addEventListener("wheel", this.scrollEvent); 
   }

  componentDidUpdate(prevProps) {
    if(!equal(this.props.imgprop, prevProps.imgprop)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.setState({ 
        images: this.addURLFunction(this.props.imgprop),
        active: Math.round(this.props.imgprop.length / 2)
        
      });
    }
  } 

  componentWillUnmount() {
    this.stack.removeEventListener("wheel", this.scrollEvent);
  }

  scrollEvent = event => {
    console.log('scrollEvent', event.deltaY)

    var mouse_direction = Math.round(event.deltaY * 0.01);

    var newActive = this.state.active + mouse_direction;
    newActive = (this.state.images.length > newActive 
      && (0 <= newActive) ? 
      newActive : this.state.active);
    this.setState({
      active: newActive
    });
  }

  handleSliderValue = (event, value) => { 
    this.setState({
      active: value
    });
  }

  addURLFunction = (imgList) => {
    var listWithURL = []
    //var dnsName = "http://195.37.12.200:80"
    var dnsName = "http://localhost:3001"

    for (let i=0; i < imgList.length; i++){
      //var listWithURL = []
      listWithURL.push(dnsName + imgList[i])
    }
    return(listWithURL)
  }
    
//The panels where the scrollable image stacks are created and returned
  render() {
    var leftImgPanel = this.props.leftImgProp;
    var rightImgPanel = this.props.rightImgProp;
    
    return (
      <div ref={elem => this.stack = elem} style={{ display: 'flex', flexDirection: 'column'}}>
        <img src={this.state.images[this.state.active]} alt={"Error"} />
        <Slider defaultValue={this.state.active}
        aria-valuetext={`${this.state.active}`}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={this.state.images.length - 1}
        marks
        onChange = {this.handleSliderValue}
        value = {this.state.active}
        //defaultValue = {1}
        />
 {/*Buttons to show the image on the larger left and right panel*/}
        <div className="BtnBelow">
          <Grid container spacing={1}>
          <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={ (e) => (leftImgPanel( this.state.images[this.state.active])) }>
            Left
          </Button>
          </Grid>
          <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={ (e) => (rightImgPanel( this.state.images[this.state.active])) }>
            Right
          </Button>
          </Grid>
          </Grid>
        </div>
      </div>
      
    );
  }
}