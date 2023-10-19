export default function IconMessage(/*{notification}*/) {
    return (
        <i className="m-0">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="45" height="40" viewBox="0 0 45 40">
                <defs>
                    <filter id="Ellipse_5" x="19" y="0.423" width="26" height="26" filterUnits="userSpaceOnUse">
                    <feOffset dy="3"/>
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feFlood floodColor="#db752c" floodOpacity="0.161"/>
                    <feComposite operator="in" in2="blur"/>
                    <feComposite in="SourceGraphic"/>
                    </filter>
                </defs>
                <g id="ic_mail" transform="translate(-5737 43)">
                    <rect id="Rectangle_27" data-name="Rectangle 27" width="40" height="40" transform="translate(5737 -43)" fill="none"/>
                    <path id="Path_33" data-name="Path 33" d="M23.6,4H4.4A2.4,2.4,0,0,0,2.012,6.4L2,20.8a2.407,2.407,0,0,0,2.4,2.4H23.6A2.407,2.407,0,0,0,26,20.8V6.4A2.407,2.407,0,0,0,23.6,4Zm0,4.8-9.6,6-9.6-6V6.4l9.6,6,9.6-6Z" transform="translate(5743.423 -36.577)" fill="#1d252c"/>
                    <g transform="matrix(1, 0, 0, 1, 5737, -43)" filter="url(#Ellipse_5)">
                        <circle id="Ellipse_5-2" data-name="Ellipse 5" cx="4" cy="4" r="4" transform="translate(28 6.42)" fill="#db752c"/>
                    </g>
                </g>
            </svg>
        </i>
    )
}