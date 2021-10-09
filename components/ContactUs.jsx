import EnquiryForm from "./EnquiryForm";

export default function ContactUs(props) {

    const { id, title, mapLink } = props.contactUsData;
    const brokerData = props.brokerData;
    const onSubmitEquiryForm = (e) =>{
		e.preventDefault();
		console.log("form submitted")
	}
    return (
        <div id={props.section} className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 contactUs">
                <div className="contactUsColContent">
                    <EnquiryForm isFromModal={false}></EnquiryForm>
                </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 contactUs brokerDetails">
                <div className="verticallyMiddle" className="contactUsColContent">
                    <p>[ OUR CONTACT DETAILS ]</p>
                    <h4>{brokerData.fullName}</h4>
                    <p>{`An authorized channel partner of `}</p>
                    <div className="row">
                        <div className="col-2">
                            <img  src="/assets/images/place.png"/>
                        </div>
                        <div className="col-10">
                            <div className="brokerDetailsTitle">OUR ADDRESS</div>
                            <p>{brokerData.address}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <img  src="/assets/images/mail.png"/>
                        </div>
                        <div className="col-10">
                            <div className="brokerDetailsTitle">EMAIL ADDRESS</div>
                            <p>{brokerData.emailId}<br/>
                                {brokerData.alternateEmailId ? brokerData.alternateEmailId : ''}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <img  src="/assets/images/phone.png"/>
                        </div>
                        <div className="col-10">
                            <div className="brokerDetailsTitle">OUR PHONE</div>
                            <p>{brokerData.mobileNumber}<br/>
                                {brokerData.alternateMobileNo ? brokerData.alternateMobileNo : ''}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-2">
                        <img  src="/assets/images/document.png"/>
                    </div>
                    <div className="col-10">
                        <div className="brokerDetailsTitle">RERA NUMBER</div>
                        <p>{brokerData.reraNumber}</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 contactUs contactUsMap">
                <iframe 
                    src={mapLink} 
                    className="fullSize"
                    title="Our location on google map">
                </iframe>
            </div>
        </div>
    );	
}