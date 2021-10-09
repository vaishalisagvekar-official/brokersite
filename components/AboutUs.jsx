export default function AboutUs(props) {

    const { id, displayTitle, image, description, brochureLink } = props.aboutUsData;
    return (
        <div id={props.section}>
            <div className="row aboutUs">
                <div className="col-12 col-md-6 aboutSections">
                    <img  src={image} style={{ width: "100%", height: "100%" }} />
                </div>
                <div className={`col-12 col-md-6 aboutSections ${props.cssClass}`}>
                    <h2 className="aboutTitle">{displayTitle.toLocaleUpperCase()}</h2>
                    <div className="titleBorder" style={{ margin: '0', color: 'inherit'}}></div>
                    <div className="description">{description}\n vaishali</div>
                    <button className="btn themeColor brochure description" onClick={(e) => window.open(brochureLink)}>
                        DOWNLOAD BROCHURE
                    </button>
                </div>
            </div>
        </div>
    );
}