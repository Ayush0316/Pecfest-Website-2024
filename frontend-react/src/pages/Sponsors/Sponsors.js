import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/Navbar'
import VideoBackground from "../../components/VideoBackground";
import { BACKGROUNDS } from "../../utils/backgrounds";
import SponsorCard from '../../components/sponsorCard/SponsorCard';

export default function Sponsors() {
    const [data, setData] = useState([]);

    const fetchSponsors = async () => {
        try {
            const response = await fetch('https://api.pecfest.org/sponser/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            const result = await response.json();
            if (result?.statusCode === 200) {
                setData(result.data);
                console.log(data)
            } else {
                console.error('Error fetching sponsors list', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchSponsors();
    }, []);
    return (
        <div>
                <NavBar/>
                <VideoBackground url={BACKGROUNDS.Sponsors} style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: "-1"
                }} />
            <div style={{ display: 'flex', height: "80vh", width: "100%", overflow: "hidden", position: "relative" }}>
                <div style={{ width: '25%', height: '90%', marginTop: '30px', marginLeft: '100px', opacity: 0.50, background: 'black', borderRadius: 85, backdropFilter: 'blur(1000000px)', padding: '30px' }} >
                    <div style={{ color: 'white', fontSize: 50, fontFamily: 'Labrada', fontWeight: '700', wordWrap: 'break-word',display: 'flex',justifyContent: 'center',}}>Sponsors</div>
                    <div style={{ width: '100%', height: '100%', textAlign: 'justify', color: 'white', fontSize: 27, fontFamily: 'Judson', fontWeight: '700', wordWrap: 'break-word', marginTop: '20px' }}>Over the past years PECFEST has had the privilege to have hosted a number of sponsors which provided a very entertaining experience to our visitors as well as the brand. The crowd engagement, media exposure, sampling and brand building opportunities offered at PECFEST are unparalleled. </div>
                </div>
                <div style={{ width: '55%', overflowY: 'auto', paddingTop: '150px', marginLeft: '100px', marginRight: '100px', background: 'transparent', padding: '30px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                    {Array.isArray(data?.sponsers) && data.sponsers.length > 0 ? (
                        data.sponsers.map((category, index) => (
                            <SponsorCard key={index} category={category} />
                        ))
                    ) : (
                        <p>No sponsors available.</p>
                    )}
                </div>
            </div>
            </div>
            );
}
