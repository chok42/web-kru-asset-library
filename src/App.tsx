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
import Profile from './pages/Profile';
//pages assets
import AssetTable from './pages/asset/AssetTable';
import AssetInsert from './pages/asset/AssetInsert';
import AssetUpdate from './pages/asset/AssetUpdate';
import AssetDetail from './pages/asset/AssetDetail';
//services
import { EmployeeAuthenService } from './services/employee.service';
import PublicAsset from './pages/public-asset/PublicAsset';
import { getStorage, removeStorage } from './constants/constant';
import PublicMain from './pages/public-main/PublicMain';
import AssetTypeTable from './pages/asset-types/AssetTypeTable';
import AgencyTable from './pages/asset-agency/AgencyTable';

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
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="SignUp " />
              <SignUp />
            </>
          }
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdminLayout>
  );
}
export default App;
