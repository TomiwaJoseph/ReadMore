import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Preloader from "../components/Preloader";
import { logOutUser } from "../redux/actions/fetchers";

const Dashboard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const storeContext = useSelector((state) => state.store);
  const {
    fetchingData,
    noInternet,
    isAuthenticated,
    dashboard_info,
    userInfo,
    backendUrl,
  } = storeContext;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      <Preloader />;
      return navigate("/login", { state: { previousPath: pathname } });
    }
    // fetchDashboardInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (fetchingData) {
    return <Preloader />;
  }

  return (
    <>
      {!isAuthenticated ? (
        <Preloader />
      ) : (
        <div className="dashboard-container container">
          <h1>Dashboard</h1>
          <button onClick={() => logOutUser()} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
