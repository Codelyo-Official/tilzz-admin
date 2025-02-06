import React, {useEffect} from "react";
import "./styles.css"

function DashboardLayout({children}) {

    useEffect(() => {}, []);

    return (
        <div className="main-user-dashboard">
            <div className="leftdiv">
                <div>
                    <h4 className="leftbar-heading">GENERAL</h4>
                    <div className="leftbar-items">
                        <div className="active-leftbar"><x-fas-magic
                            style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>
                            Stories</div>
                        <div><x-ri-dashboard-fill
                            style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>
                            Categories</div>
                        <div><x-bx-news
                            style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>
                            News Feed</div>
                    </div>
                </div>
            </div>
            <div className="rightdiv">{children}</div>
        </div>
    );
}

export default DashboardLayout;
