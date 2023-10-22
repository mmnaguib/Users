import { useState } from "react"
import '../assets/css/Header.css';
import { UseAppSelector } from "../store/hooks";

const Header = () => {
    const [showBox, setShowBox] = useState<boolean>(false);
    const [dark, setDark] = useState<boolean>(false);
    const [notifacations, setNotifacations] = useState<boolean>(false);
    const user = UseAppSelector((state) => state.auth.user.name);
    console.log(user)
  return (
    <div className={dark ? "dark header" : 'header'}>
        <div className='right'>
            <div className='home'>
                <i className='fa fa-home'></i>
                <label className="homeLable">الصفحة الرئيسية</label>
            </div>
            <div className="notification">
                <i className="fa fa-bell" onClick={()=>setNotifacations(!notifacations)}></i>
                <span className="notiNumber">0</span>
                {notifacations && 
                <div className="noti-content">
                    <div className="noti-header">
                        <h5>الإشعارات</h5>
                        <i className="fa-regular fa-envelope"></i>
                    </div>
                    <div className="noti-body">
                    </div>
                </div>
                }
            </div>
        </div>
        {showBox && 
        <div className="searchBox">
            <i className="fa fa-search"></i>
            <input type="search" placeholder="explore ERP ..." />
            <i className="fa-solid fa-x" onClick={() => setShowBox(!showBox)}></i>
        </div> 
        }
        <div className='left'>
            <i className="fa fa-search" onClick={() => setShowBox(!showBox)}></i>
            <i className="fa fa-moon" onClick={() => setDark(!dark)}></i>
            <span style={{position: "relative"}}>
                <span className="userRole">
                    <span>System</span>
                    <br />
                    <span>Admin</span>
                </span>
                <i className="fa fa-user"></i>
            </span>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
    </div>
  )
}

export default Header
