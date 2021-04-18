import Navbar from "../navbar/Navbar"

export default function DefaultLayout({ children }) {

    return <>
    <Navbar/>
    <div className="container mt-5">
        {children}
    </div>
</>
}