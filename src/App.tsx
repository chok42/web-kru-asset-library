import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

//common
import Loader from './common/Loader';
//components
import PageTitle from './components/PageTitle';
//layout
import AdminLayout from './layout/AdminLayout';
import PublicLayout from './layout/PublicLayout';
//services
import { EmployeeAuthenService } from './services/employee.service';
//constants
import { getStorage, removeStorage } from './constants/constant';
//page Authentication
import SignIn from './pages/Authentication/SignIn';
//pages assets
import PublicAsset from './pages/public-asset/PublicAsset';
import PublicMain from './pages/public-main/PublicMain';
import AssetTable from './pages/asset/AssetTable';
import AssetInsert from './pages/asset/AssetInsert';
import AssetUpdate from './pages/asset/AssetUpdate';
import AssetDetail from './pages/asset/AssetDetail';
//page asset type
import AssetTypeTable from './pages/asset-types/AssetTypeTable';
//page agency
import AgencyTable from './pages/asset-agency/AgencyTable';
//pages employee
// import EmployeeTable from './pages/employee/EmployeeTable';
// import EmployeeDetail from './pages/employee/EmployeeDetail';
// import EmployeeUpdate from './pages/employee/EmployeeUpdate';
// import EmployeeInsert from './pages/employee/EmployeeInsert';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetchData();
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
              <PageTitle title="Library" />
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
          path="/asset/asset-type"
          element={
            <>
              <PageTitle title="AssetType Tables" />
              <AssetTypeTable />
            </>
          }
        />
        <Route
          path="/agency"
          element={
            <>
              <PageTitle title="Agency " />
              <AgencyTable />
            </>
          }
        />    
          {/* <Route
          path="/employee"
          element={
            <>
              <PageTitle title="Employee " />
              <EmployeeTable />
            </>
          }
        />
                  <Route
          path="/employee/insert"
          element={
            <>
              <PageTitle title="Employee " />
              <EmployeeInsert />
            </>
          }
        />
                          <Route
          path="/employee/update"
          element={
            <>
              <PageTitle title="Employee " />
              <EmployeeUpdate />
            </>
          }
        />
                                  <Route
          path="/employee/detail"
          element={
            <>
              <PageTitle title="Employee " />
              <EmployeeDetail />
            </>
          }
        /> */}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdminLayout>
  );
}
export default App;
