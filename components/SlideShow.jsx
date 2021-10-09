import React, { Component } from 'react';
import { withRouter } from 'next/router';

class SlideShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slideIndex: 0,
		};

		for (let index = 0; index < props.imgArray.length; index++) {
			this[`imageRef${index}`] = React.createRef();
			this[`dotRef${index}`] = React.createRef();
		}
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.showSlides(), 8000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

  render() {
	const { section, imgArray, cssClass } = this.props;
	return (
	  <div id={section}>
		<div className="slideshow-container">
		  {imgArray.map((image, index) => {
			return (
			  <div
				className={`mySlides fadeImg ${cssClass}`}
				ref={this[`imageRef${index}`]}
				key={index}
			  >
				<img 
				  src={image}
				  style={{ width: "inherit", height: "inherit" }}
				/>
			  </div>
			);
		  })}
		</div>
		<br />
		<div style={{ textAlign: "center" }}>
		  {imgArray.map((image, index) => {
			return (
			  <span
				className="dot"
				ref={this["dotRef" + index]}
				key={index}
			  ></span>
			);
		  })}
		</div>
	  </div>
	);
  }

  showSlides = () => {
	const { imgArray } = this.props;

	var imageIndex = this.state.slideIndex;

	imgArray.forEach((image, index) => {
	  if (this[`imageRef${index}`] !== undefined) {
		if (this[`imageRef${index}`].current !== null) {
		  this[`imageRef${index}`].current.style.display = "none";
		}
	  }
	});

	imageIndex = imageIndex + 1;
	if (imageIndex > imgArray.length) {
	  imageIndex = 1;
	}
	imgArray.forEach((image, index) => {
	  if (this[`dotRef${index}`].current !== null) {
		this[`dotRef${index}`].current.className = this[
		  `dotRef${index}`
		].current.className.replace(" active", "");
	  }
	});

	if (this[`imageRef${imageIndex - 1}`].current !== null) {
	  this[`imageRef${imageIndex - 1}`].current.style.display = "block";
	}

	if (this[`dotRef${imageIndex - 1}`].current) {
	  this[`dotRef${imageIndex - 1}`].current.className += " active";
	}

	this.setState({ slideIndex: imageIndex });
  };
}

export default withRouter(SlideShow);
