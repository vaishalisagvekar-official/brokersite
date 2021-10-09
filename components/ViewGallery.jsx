import React, { Component, useState } from 'react';
import { withRouter } from 'next/router';

import Modal from 'react-bootstrap/Modal';

class ViewGallery extends React.Component {
	constructor(props) {
		super(props);
		this.viewGalleryRef = React.createRef();
		this.state = {
			slideIndex : props.imgIndex,
			show : true
		}

		for (let index = 0; index < props.images.length; index++) {
			this[`myGallerySlides${index}`] = React.createRef();
			this[`demoRef${index}`] = React.createRef();
		}
		this.galleryListRowRef = React.createRef();
	}

	componentDidMount() {
		// $(`#viewgalleryId`).modal('show');
		this.showSlides(this.state.slideIndex);
	}

	// Show next images in bottom list(scroll forward bottom list view)
	scrollNext = () => {
		this.galleryListRowRef.current.scrollLeft = this.galleryListRowRef.current.scrollLeft + this.galleryListRowRef.current.offsetWidth;
	};

	// Show previous images in bottom list(scroll backwards bottom list view)
	scrollBack = () => {
		this.galleryListRowRef.current.scrollLeft = this.galleryListRowRef.current.scrollLeft - this.galleryListRowRef.current.offsetWidth;
	};

	handleClose = () => {
		this.setState({show : false});
		this.props.onClose();
	}

	render() {
		const { images } = this.props;
		const { show } = this.state;
		return (

			<Modal
				show={show}
				onHide={this.handleClose}
				backdrop="static"
				keyboard={false}
				id={this.props.id}
				fullscreen="xxl-down"
				className="viewGallery-content"
			>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body>
					<div className="container">
						<div style={{position : 'relative'}}>
							{
								images.map((singleImg, index) => {
									return (
										<div className="myGallerySlides" ref={this[`myGallerySlides${index}`]} key={`myGallerySlides${index}`}>
											<img className="viewedImg" src={images[this.state.slideIndex]} />
										</div>
									)
								})
							}
							<a className="prev anchorTag" onClick={() => this.plusSlides(-1)}>❮</a>
							<a className="next anchorTag" onClick={() => this.plusSlides(1)}>❯</a>
							<div className="galleryListContainer" >
								<a className="galleryListPrev anchorTag" onClick={() => this.scrollBack()}>❮</a>
								<div className="rowDiv" ref={this.galleryListRowRef} >
									{
										images.map((singleImg, index) => {
											return (
												<div className="column" key={`column${index}`}>
													<img className="demo cursor" ref={this[`demoRef${index}`]} src={singleImg} onClick={() => this.currentSlide(index)} alt="The Image" />
												</div>
											)
										})
									}
								</div>
								<a className="galleryListNext anchorTag" onClick={() => this.scrollNext()}>❯</a>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		);
	}

	plusSlides = (n) => {
		let tempIndex = this.state.slideIndex + n;
		if (tempIndex >= this.props.images.length) {
			tempIndex = 0;
		}
		if (tempIndex < 0) { 
			tempIndex = this.props.images.length - 1;
		}
		this.showSlides(tempIndex);
	}

	currentSlide = (n) => {
		this.showSlides(n);
	}

	showSlides = (n) => {
		let number = n;
		for (var i = 0; i < this.props.images.length; i++) {
			this[`myGallerySlides${i}`].current.style.display = "none";
		}
		for (var i = 0; i < this.props.images.length; i++) {
			this[`demoRef${i}`].current.className = this[`demoRef${i}`].current.className.replace(" active", "");
		}
		this[`myGallerySlides${number}`].current.style.display = "block";
		this[`demoRef${number}`].current.className += " active";

		this.setState({ slideIndex : number}) 
	}
}

export default withRouter(ViewGallery);
