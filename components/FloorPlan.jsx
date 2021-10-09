import CarouselContainer from './CarouselContainer';

export default function FloorPlan(props) {

    const { id, title, images } = props.floorPlanData;
    return (
        <div id={props.section} className="amenityContainer">
            <h2 className="sectionTextColor sectionTitle">{title}</h2>
            <div className="titleBorder"></div>                
            <CarouselContainer sectionId={id} list={images} containerCss="sectionContent" containerHeight="carouselHeight_1"></CarouselContainer>
        </div>
    );
}