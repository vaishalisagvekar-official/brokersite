import CarouselContainer from './CarouselContainer';

export default function Amenities(props) {

	const changeBackground = (e) => {
		e.target.style.background = 'black';
	}

	const revertBackground = (e) => {
		e.target.style.background = 'none';
	}

    const { id, title, list, images } = props.amenitiesData;
    return (
        <div className="sectionTextColor">
            <div id={props.section} className="amenityContainer" >
                <h2 className="sectionTitle">{title} </h2>
                <div className="titleBorder"></div>                
                
                <div className="row sectionContent">
                    {
                        list.map((amenityObj, index) => {
                            return (
                                <div className={`col-5 col-sm-4 col-md-3 col-lg-2 ${props.containerCss} amenityIconContainr`}
                                    style={{ textAlign: "center" }}
                                    key={`amenityIcon_${index}`}
                                    onMouseOver={changeBackground}
                                    onMouseOut={revertBackground}>
                                        <div style={{height:'fit-content', verticalAlign: 'middle', margin: 'auto' }}>
                                            <img className={`${props.imageCss}`} src={amenityObj.icon} />
                                            <div className="amenityTitle">{amenityObj.title}</div>
                                        </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <CarouselContainer sectionId={`${id}_carousel`} list={images} containerCss="" containerHeight="carouselHeight">
            </CarouselContainer>
        </div>
        
    );
}