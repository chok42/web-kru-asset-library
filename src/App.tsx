import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

//common
import Loader from './common/Loader';
//components
import PageTitle from './components/PageTitle';
//layout
import AdminLayout from './layout/AdminLayout';
import PublicLayout from './layout/PublicLayout';
//pages Authentication
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
//pages assets
import AssetTable from './pages/assets/AssetTable';
import AssetInsert from './pages/assets/AssetInsert';
import AssetUpdate from './pages/assets/AssetUpdate';
import AssetDetail from './pages/assets/AssetDetail';
//services
import { EmployeeAuthenService } from './services/employee.service';
import PublicAsset from './pages/public-asset/PublicAsset';
import { getStorage, removeStorage } from './constants/constant';
import PublicMain from './pages/public-main/PublicMain';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true)
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    const key = getStorage('key');
    if (key) {
      const resp = await EmployeeAuthenService();
      if (resp === '200') {
        setLoading(false);
        setVisible(false);
        return;
      } else if (resp === '404') {
        removeStorage([]);
      }
    }
    setLoading(false);
    setVisible(true);
  };

  return loading ? (
    <Loader />
  ) : visible ? (
    <PublicLayout>
      <Routes>
      <Route
          index
          element={
            <>    
            <PageTitle title="Main" />
              <PublicMain />
            </>
          }
        />  

        <Route
          path="/asset"
          element={
            <>
              <PageTitle title="Asset" />
              <PublicAsset />
            </>
          }
        />
        <Route
          path="/library"
          element={
            <>
              <PageTitle title="Library " />
              <PublicAsset />
            </>
          }
        />        
        <Route
          path="/kru"
          element={
            <>
              <PageTitle title="Kru" />
              <PublicAsset />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />

        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </PublicLayout>
  ) : (
    <AdminLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Asset Tables " />
              <AssetTable />
            </>
          }
        />        
        <Route
          path='eommerce'
          element={
            <>
              <PageTitle title="eCommerce Dashboard " />
              <ECommerce />
            </>
          }
        />
                <Route
          path="/asset/table"
          element={
            <>
              <PageTitle title="Asset Tables" />
              <AssetTable />
            </>
          }
        />       
        <Route
          path="/asset/insert"
          element={
            <>
              <PageTitle title="Asset Insert" />
              <AssetInsert />
            </>
          }
        />
                <Route
          path="/asset/update"
          element={
            <>
              <PageTitle title="Asset Update" />
              <AssetUpdate />
            </>
          }
        />
        <Route
          path="/asset/detail"
          element={
            <>
              <PageTitle title="Asset Detail" />
              <AssetDetail />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar " />
              <Calendar />
            </>
          }
        />
                <Route
          path="/agency"
          element={
            <>
              <PageTitle title="Profile " />
              <Profile />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Profile " />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements " />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout " />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables " />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings " />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart " />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts " />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons " />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdminLayout>
  );
  // return loading ? (
  //   <Loader />
  // ) : (
    // <DefaultLayout>
    //   <Routes>
    //     <Route
    //       index
    //       element={
    //         <>
    //           <PageTitle title="eCommerce Dashboard " />
    //           <ECommerce />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/calendar"
    //       element={
    //         <>
    //           <PageTitle title="Calendar " />
    //           <Calendar />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/profile"
    //       element={
    //         <>
    //           <PageTitle title="Profile " />
    //           <Profile />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/forms/form-elements"
    //       element={
    //         <>
    //           <PageTitle title="Form Elements " />
    //           <FormElements />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/forms/form-layout"
    //       element={
    //         <>
    //           <PageTitle title="Form Layout " />
    //           <FormLayout />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/tables"
    //       element={
    //         <>
    //           <PageTitle title="Tables " />
    //           <Tables />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/settings"
    //       element={
    //         <>
    //           <PageTitle title="Settings " />
    //           <Settings />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/chart"
    //       element={
    //         <>
    //           <PageTitle title="Basic Chart " />
    //           <Chart />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/ui/alerts"
    //       element={
    //         <>
    //           <PageTitle title="Alerts " />
    //           <Alerts />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/ui/buttons"
    //       element={
    //         <>
    //           <PageTitle title="Buttons " />
    //           <Buttons />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/auth/signin"
    //       element={
    //         <>
    //           <PageTitle title="Signin " />
    //           <SignIn />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/auth/signup"
    //       element={
    //         <>
    //           <PageTitle title="Signup " />
    //           <SignUp />
    //         </>
    //       }
    //     />
    //   </Routes>
    // </DefaultLayout>
  // );
}

export default App;
