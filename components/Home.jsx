import React, { Component, useState } from 'react';
import { withRouter } from 'next/router';

import globalStyles from '../styles/styles.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';

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
	}

	componentDidMount(){
		// var settings = {
		// 	themeColor : '#0A0A0A'
		// }
		this.setStyleOfWholeBody({});
	}

	// Set font family of our choice for whole body
	setStyleOfWholeBody = (settings) => {
		var r = document.querySelector('.microsite-content');
		if(settings.fontFamily) r.style.setProperty('--fontFamily', settings.fontFamily);
		if(settings.lineHeight) r.style.setProperty('--lineHeight', settings.lineHeight);
		if(settings.themeColor) r.style.setProperty('--themeColor', settings.themeColor);
		if(settings.fontColor) r.style.setProperty('--fontColor', settings.fontColor);
	}

	render() {
		
		const { logoLong } = this.props.projectData;
		let sections = [];
		if(this.props.projectData.websiteMenus !== undefined){
			sections = this.props.projectData.websiteMenus.sections ? this.props.projectData.websiteMenus.sections : [];
		}

	return (
		<div className="microsite-content">
			<style jsx global>
					{globalStyles}
			</style>
			<Navbar collapseOnSelect expand="lg" fixed="top" className="navbar themeColor">
				<Navbar.Brand href="#banner"><img 
					className="logo"
					src={logoLong} alt="Project Logo" /></Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="navbar-collapse">
					<Nav className="me-auto navs">
						{
							sections.map((section, index) => {
								if(section.id !== "footer"){
									const sectionName = section.title.toLocaleUpperCase();
									return <Nav.Link href={`#${section.id}`} className="nav-link">{sectionName}</Nav.Link>
								}
							})
						}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			
			{
				sections.map((section) => {
						switch (section.id) {
							case 'banner':
								return <SlideShow 
											key={section.id} 
											section={section.id}
											imgArray={section.images} 
											cssClass={"bannerContainer"}>
										</SlideShow>
								break;

							case 'about':
								return <AboutUs 
											key={section.id}
											section={section.id} 
											aboutUsData={section} 
											cssClass={"verticallyMiddle"}>
										</AboutUs>
								break;

							case 'amenities':
								return <Amenities 
											key={section.id}
											section={section.id} 
											amenitiesData={section} 
											imageCss="amenityIcon" 
											containerCss="verticallyMiddle">
										</Amenities>
								break;

							case 'virtualTour':
								return <VirtualTour
											key={section.id}
											section={section.id}
											virtualTourData={section}>
										</VirtualTour>
								break;

							case 'gallery':
								return <Gallery 
											key={section.id}
											section={section.id} 
											galleryData={section}>
										</Gallery>
								break;
						
							case 'floorPlans':
								return <FloorPlan
											key={section.id}
											section={section.id}
											floorPlanData={section}
										></FloorPlan>
								break;
					
							case 'contactUs':
								return <ContactUs
											key={section.id}
											section={section.id}
											contactUsData={section}
											brokerData={this.props.brokerData}
										></ContactUs>
								break;
					
							case 'footer':
								return <Footer
											key={section.id}
											section={section.id}
											footerData={section}
											cssClass={"verticallyMiddle"}
										></Footer>
								break;
						
							default:
								break;
						}
				})
			}
			<ModalContainer id="enquiryFormId" title="Get In Touch">
				<EnquiryForm isFromModal={true}></EnquiryForm>
			</ModalContainer>
		</div>
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
				</strong>
			</div>
		</div>
	);
}

function ModalContainer(props) {

	const [show, setShow] = useState(false);
	
	console.log("came in modal container")
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
