import Footer from "./Footer"
import Header from "./Header"
import "../style/style1.css";
function Layout({children}){
    return(
        <>
         <Header />
       <div className="app-body">{children}</div>
      <Footer />
        </>
    )
}
export default Layout