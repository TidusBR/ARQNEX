import { Button } from '@mui/material';

export default function ButtonUpload() {
    return <Button variant='outlined' className="button-upload d-flex align-items-center py-1 px-3 bg-white rounded fw-bold text-black" style={{border: "2px solid #EEEEEE", fontSize: "0.8rem"}}>
        <i>
            <svg xmlns="http://www.w3.org/2000/svg" id="ic_upload" width="24" height="24" viewBox="0 0 24 24">
                <rect id="Rectangle_27" data-name="Rectangle 27" width="24" height="24" fill="none"/>
                <path id="Path_30" data-name="Path 30" d="M19.35,10.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,20H19a4.986,4.986,0,0,0,.35-9.96ZM14,13v4H10V13H7l5-5,5,5Z" fill="#1d252c"/>
            </svg>
        </i>
        Upload
    </Button>
}