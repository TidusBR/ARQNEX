import React from "react"


import bannerImage from './courses_images/Banner-casa-pavilhao.png';





export default function Courses() {



    return (
        <div className='container-courses'>
            <div className="row text-center" style={{
                padding: "100px 0",
                backgroundImage: `url(${bannerImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(219, 117, 44, 0.8)"
            }}>
                <div></div>
                <div></div>

            </div>
            <div className="">

                <div>

                </div>

            </div>

        </div>
    )
}