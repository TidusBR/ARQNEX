import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import CenterArea from "../components/center_area/CenterArea"
import Login from "./Login"
import { useState } from "react";

export default function Home() {
    const [renderLogin, setRenderLogin] = useState(false);

    return (
        <div>
            {renderLogin && <Login open={renderLogin} setOpen={setRenderLogin}></Login>}
            <Header setRenderLogin={setRenderLogin}></Header>
            <CenterArea></CenterArea>
            <Footer></Footer>
        </div>
    )
}