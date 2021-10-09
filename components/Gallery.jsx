import React, { Component, useState } from 'react';
import { withRouter } from 'next/router';
import ViewGallery from './ViewGallery';

class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImgIndex : -1
		}
	}

	openGallery = (index) => {
		this.setState({ selectedImgIndex : index})
	}

	removeViewGallery = () => {
		this.setState({ selectedImgIndex : -1})
	}

	render() {
		const { images } = this.props.galleryData;
		return (
			<div id={this.props.section}>
				<div className="row">
					{images.map((image, index) => {
						return (
							<React.Fragment>
								<div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 galleryImgDiv" key={`gallery${index}`} onClick={() => this.openGallery(index)}>
									<img  src={image} />
									{/* <div className="overlay">
										<a href="#" className="icon" title="User Profile">
											+
										</a>
									</div> */}
								</div>
							</React.Fragment>
						);
					})}
				</div>
				{
					this.state.selectedImgIndex !== -1 ? (
							<ViewGallery id="viewgalleryId" imgIndex={this.state.selectedImgIndex} images={images} onClose={this.removeViewGallery}>
								Hello there
							</ViewGallery>
					) : ''
				}
			</div>
		);
	}
}

export default withRouter(Gallery);
