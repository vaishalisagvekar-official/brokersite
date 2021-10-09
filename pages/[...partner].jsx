import React from 'react';

import projects from '../config/project.json';
import brokers from '../config/broker.json';

import Home from '../components/Home';

export async function getStaticPaths() {
	const pathArray = new Array();
	const allProjects = JSON.parse(JSON.stringify(projects));
	allProjects.forEach((project, index) => {
		if(project.isDeleted) return false;

		project.brokers = brokers.filter((broker) => project._id == broker.projectId);
		project.brokers.forEach((broker) => {
			console.log(" came to create path ")
			if(broker.isDeleted) {
				console.log("broker deleted")
				return false;
			}
			
			let brokerName = broker.fullName.replace(' ','-');
			brokerName = brokerName.toLowerCase();
			const paramObj = {
				params : {
					partner: [`${index}`, `${brokerName}`]
				}
			}
			console.log("path created")
			pathArray.push(paramObj);
		});
	})
	console.log(pathArray.length)
	// console.log(JSON.stringify(pathArray))
	return {
		paths: pathArray,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	console.log(params)
	let foundPartner;
	let foundBroker;
	
	foundPartner = projects[params.partner[0]];
	const projectsBrokers = brokers.filter((broker) => foundPartner.projectId !== broker.projectId);

	projectsBrokers.forEach((brokeObj) => {
		if(brokeObj.isDeleted) return false;

		let brokerName = brokeObj.fullName.replace(' ','-');
			brokerName = brokerName.toLowerCase();
		if (!foundBroker &&  brokerName == params.partner[1]) {
			foundBroker = brokeObj;
		}
	});

	// projects.forEach((partner) => {
	// 	console.log(params)
	// 	if (!foundPartner && partner.projectName == params.partner[0]) {
	// 		foundPartner = partner;
	// 	}
	// });
	return {
		props: {
			projectData: foundPartner,
			brokerData: foundBroker
		}
	};
}

export default function HomePage(data) {
	return <Home projectData={data.projectData} brokerData={data.brokerData}/>;
}
