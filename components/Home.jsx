import React, { Component, useState } from 'react';
import { withRouter } from 'next/router';

import globalStyles from '../styles/styles.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';


import SlideShow from './SlideShow';
import AboutUs from './AboutUs';
import Amenities from './Amenities';
import VirtualTour from './VirtualTour';
import Gallery from './Gallery';
import FloorPlan from './FloorPlan';
import ContactUs from './ContactUs';
import EnquiryForm from './EnquiryForm';

class Home extends Component {
	constructor(props) {
		super(props);
		let sections = [];
		if(this.props.projectData.websiteMenus !== undefined){
			sections = this.props.projectData.websiteMenus.sections ? this.props.projectData.websiteMenus.sections : [];
		}
		for (let index = 0; index < sections.length; index++) {
			this[`sectionRef${index}`] = React.createRef();
		}
	}

	componentDidMount(){
		// var settings = {
		// 	themeColor : '#0A0A0A'
		// }
		this.setStyleOfWholeBody({});
		if(screen.width < 1200){
			var prevScrollpos = window.pageYOffset;
			if(prevScrollpos == 0){
				document.getElementById("logoDiv").style.top = "0";
				document.getElementById("menus").style.top = `${document.getElementById("logoDiv").offsetHeight}px`;
			}
			window.onscroll = function() {
				var currentScrollPos = window.pageYOffset;
				if (prevScrollpos > currentScrollPos) {
					document.getElementById("logoDiv").style.top = "0";
					document.getElementById("menus").style.top = `${document.getElementById("logoDiv").offsetHeight}px`;
				} else {
					document.getElementById("logoDiv").style.top = `-${document.getElementById("logoDiv").offsetHeight}px`;
					document.getElementById("menus").style.top = "0";
				}
				prevScrollpos = currentScrollPos;
			}
		}
	}

	// Set font family of our choice for whole body
	setStyleOfWholeBody = (settings) => {
		var r = document.querySelector('.root');
		if(settings.fontFamily) r.style.setProperty('--fontFamily', 'Titillium Web');
		if(settings.lineHeight) r.style.setProperty('--lineHeight', settings.lineHeight);
		if(settings.fontColor) r.style.setProperty('--fontColor', settings.fontColor);
		if(settings.themeColor) r.style.setProperty('--themeColor', settings.themeColor);
	}

	handleMenuClick = (menuIndex) => {
		const sections = this.props.projectData.websiteMenus.sections;
		sections.forEach((section, index) => {
			if (this[`sectionRef${index}`].current !== null) {
			  this[`sectionRef${index}`].current.className = this[`sectionRef${index}`].current.className.replace(" current", "");
			}
		  });
		this[`sectionRef${menuIndex}`].current.className += " current";
	}

	render() {
		console.log(this.props)
		const { logoLong } = this.props.projectData;
		let sections = [];
		if(this.props.projectData.websiteMenus !== undefined){
			sections = this.props.projectData.websiteMenus.sections ? this.props.projectData.websiteMenus.sections : [];
		}
		const contactUsSection = sections.filter((section) => section.id == "contactUs")
		const footerSection = sections.filter((section) => section.id == "footer")


	return (
		<>
			<style jsx global>
					{globalStyles}
			</style>
			<div className="header">
				<div className="menubar themeColor">
					<div className="row logoDiv" id="logoDiv">
						<a href="#banner">
							<img className="logo" src={logoLong} alt="Project Logo" />
						</a>
					</div>
					<div className="row menus themeColor" id="menus">
						{
							sections.map((section, index) => {
								if(section.id !== "footer"){
									if(index == 0){
										const sectionName = section.title.toLocaleUpperCase();
										return <a href={`#${section.id}`} 
												className="nav-link current" 
												style={{width: 'auto', whiteSpace: 'nowrap', margin: 'auto'}} 
												key={`nav-link${index}`} 
												ref={this[`sectionRef${index}`]}
												onClick={() => this.handleMenuClick(index)}>
													{sectionName}
												</a>
									} else {
										const sectionName = section.title.toLocaleUpperCase();
										return <a href={`#${section.id}`} 
												className="nav-link" 
												style={{width: 'auto', whiteSpace: 'nowrap', margin: 'auto'}} 
												key={`nav-link${index}`} 
												ref={this[`sectionRef${index}`]}
												onClick={() => this.handleMenuClick(index)}>
													{sectionName}
												</a>
									}
								}
							})
						}
					</div>
				</div>
			</div>

			{/* .menus a:after,
.menus a:before {
  transition: all .5s;
}
.menus a {
  position:relative;
  z-index: 1;
}

.menus a:hover {
  transform: scale(1.1);
  box-shadow: 0 0 11px rgba(33,33,33,.2);
  color: var(--themeColor) !important;
  background-color: var(--fontColor)
} */}
			
			{
				sections.map((section, index) => {
					if(section.id == 'banner'){
						return <SlideShow 
									key={section.id} 
									section={section.id}
									imgArray={section.images} 
									cssClass={"bannerContainer"}>
								</SlideShow>
					}
			
					if(section.id == 'about') {
						return <AboutUs 
									key={section.id}
									section={section.id} 
									aboutUsData={section} 
									cssClass={"verticallyMiddle"}>
								</AboutUs>
					}
		
					if(section.id == 'amenities') {
						return <Amenities 
									key={section.id}
									section={section.id} 
									amenitiesData={section} 
									imageCss="amenityIcon" 
									containerCss="verticallyMiddle">
								</Amenities>
					}
		
					if(section.id == 'virtualTour') {
						return <VirtualTour
									key={section.id}
									section={section.id}
									virtualTourData={section}>
								</VirtualTour>
					}
		
					if(section.id == 'gallery') {
						return <Gallery 
									key={section.id}
									section={section.id} 
									galleryData={section}>
								</Gallery>
					}
		
					if(section.id == 'floorPlans') {
						return <FloorPlan
									key={section.id}
									section={section.id}
									floorPlanData={section}
								></FloorPlan>
					}

					
				})
			}
			{
				contactUsSection.length > 0 ? (
					<ContactUs
						key={contactUsSection[0].id}
						section={contactUsSection[0].id}
						contactUsData={contactUsSection[0]}
						brokerData={this.props.brokerData}
					></ContactUs>
				) : (
					<ContactUs
						key="contactUs"
						section="contactUs"
						brokerData={this.props.brokerData}
					></ContactUs>
				)
			}
			{ 
				footerSection.length > 0 ? (
					<Footer
						key={footerSection[0].id}
						section={footerSection[0].id}
						footerData={footerSection[0]}
						cssClass={"verticallyMiddle"}
					></Footer>
				) : ''
			}

			<ModalContainer id="enquiryFormId" title="Get In Touch">
				<EnquiryForm isFromModal={true}></EnquiryForm>
			</ModalContainer>
		</>
		);
	}
}

export default withRouter(Home);

function Footer(props){
	const [show, setShow] = useState(false);

	const { description, disclaimer } = props.footerData;
	
	return (
		<div>
			<div className="row footer">
				<strong>
					{description}
					<br />
					<br />
					{
						disclaimer !== "" ? (
							<>
								<div onClick={() => setShow(true)} style={{cursor : 'pointer'}}>Disclaimer</div>
								<Modal
									show={show}
									onHide={() => setShow(false)}
									backdrop="static"
									keyboard={false}
								>
									<Modal.Header closeButton>
										<Modal.Title>Disclaimer</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div className="disclaimer">
											{disclaimer}
										</div>
									</Modal.Body>
								</Modal>						
				
							</>
						) : ''
					}
				</strong>
			</div>
		</div>
	);
}

function ModalContainer(props) {

	const [show, setShow] = useState(false);
	
	return (
		<>
			<div id="enquire-now" className="enquire-now" onClick={() => setShow(true)}>
				<a href="#" className="enquire-now-btn btn  btn-lg" >ENQUIRE NOW</a>
			</div>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.children}
				</Modal.Body>
			</Modal>
		</>
	)
}
