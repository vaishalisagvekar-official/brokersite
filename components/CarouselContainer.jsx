import Carousel from 'react-bootstrap/Carousel';

export default function CarouselContainer(props) {
	const { sectionId, list, containerCss, containerHeight} = props;
	return (
		<div id={sectionId} className={`${containerCss}`}>
			<Carousel>
				{
					list.map((item, index) => {
						let source = "";
						var snippet = "";
						if (typeof item == "string") {
							source = item;
						} else if (sectionId == "virtualTour") {
							source = item.tourImageLink;
							snippet = (
							<div className="">
								<h4></h4>
								<button
									className="btn tourBtn"
									onClick={(e) => (window.location.href = `${item.tourLink}`)}
								>
								Enter Virtual Tour
								</button>
							</div>
							);
						}
						return <Carousel.Item>
									<img className={`d-block w-100 ${containerHeight}`} src={source} alt="First slide"/>
									<Carousel.Caption className="centered">
										{snippet}
									</Carousel.Caption>
								</Carousel.Item>
				
					})
				}
				
			</Carousel>
		</div>
	)
}

