import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"
import DashboardProfile from "../components/DashboardProfile"
import DashboardSidebar from "../components/DashboardSidebar"
function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search])


  return (
    <div className="flex flex-col min-h-screen md:flex-row">
    <div className = "md:w-56">
      {/* sidebar */}
      <DashboardSidebar />
    </div>
      {/* profile */}
      {tab === "profile" && <DashboardProfile />}
    </div>
  )
}

export default Dashboard