import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './component/common/Navbar';
import OpenRoute from './component/auth/OpenRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import VerifyEmail from './pages/VerifyEmail';
import PrivateRoute from './component/auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import MyProfile from './component/Dashboard/MyProfile';
import Settings from './component/Dashboard/settings/Settings';
import AddRooms from './component/Dashboard/AddRooms/AddRooms';
import MyRoom from './component/Dashboard/myRoom/MyRoom';
import EditHome from './component/Dashboard/myRoom/EditHome';
import MyAllRoom from './component/Dashboard/myRoom/allRoomsData/MyAllRoom'
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import RoomData from './component/Home/RoomData';
import CityHome from './component/Home/CityHome';
import Room from './component/Home/Room';


function App() {
  return (
    <div className="App">
        <Navbar />
         <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/:cityName' element={<OpenRoute> <CityHome/> </OpenRoute>}/>
           <Route path='/home/:homeId' element={<OpenRoute> <RoomData/> </OpenRoute>}/>
           <Route path='/home/:homeId/:roomId' element={<OpenRoute> <Room/> </OpenRoute>}/>
           <Route path='/login' element={<OpenRoute> <Login/> </OpenRoute>}/>
           <Route path='/signup' element={<OpenRoute> <SignUp/> </OpenRoute>}/>
          
           <Route path='/verify-email' element={<OpenRoute> <VerifyEmail/> </OpenRoute>}/>
           <Route path='/forgot-password' element = {<OpenRoute><ForgotPassword/></OpenRoute>}/>
           <Route path='/update-password/:id' element = {<OpenRoute><UpdatePassword/></OpenRoute>}/>

           <Route element = {<PrivateRoute><Dashboard/></PrivateRoute>}>
             <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
             <Route path='/dashboard/settings' element={<Settings/>}/>
             <Route path='/dashboard/add-rooms' element = {<AddRooms/>}/>
             <Route path='/dashboard/my-rooms' element = {<MyRoom/>}/>
             <Route path='/dashboard/edit-home/:homeId' element = {<EditHome/>}/>
             <Route path='/dashboard/All-Room-Data/:homeId' element = {<MyAllRoom/>}/>

             <Route path="*" element={<Error/>}/>
           </Route>

        </Routes>
    </div>
  );
}

export default App;
