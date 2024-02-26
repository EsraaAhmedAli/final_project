// here................
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
//import Adminpage from "./components/Adminpage/Adminpage";
import Dashboard from './components/pages/Dashboard/Dashboard';


import WebsiteView from './components/pages/WebsiteView';
import Setting from './components/pages/Setting/Setting';
import AdminsDemo from './components/Primetable/Primetable';
import CreateNewAdmin from './components/pages/createNewAdmin/createNewAdmin';
//import Adminpage from './components/Adminpage/Adminpage';
//import AdminsDemo from './components/Primetable/Primetable';
//import AdminsDemo from './components/Primetable/Primetable';
//import BasicTable from './components/Table/Table';
//import Admins from './components/pages/Admins';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './theme/theme';
import Login2 from './Login2/Login2';

import News from './components/pages/News/News';
import Events from './components/pages/Events/Events';

import PermissionDemo from './components/pages/PermissionTable/PermissionTable';
import FacultiesDemo from './components/pages/FacultyTable/FacultyTable';
import AdminUpdatePage from './components/pages/AdminUpdatePage/adminUpdate';
import MyProfile from './components/pages/Setting/MyProfile';

import UpdateNews from './components/pages/News/UpdateNews';
import AddNews from './components/pages/News/AddNews';
import UpdateEvents from './components/pages/Events/UpdateEvents';
import AddEvents from './components/pages/Events/AddEvents';


function App() {
  
  return (
    
    <div className="AppGlass">
      <ThemeProvider>
      <BrowserRouter>
       <Sidebar/>
       
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admins" element={<AdminsDemo />} />
          <Route path="/login" element={<Login2 />}/>
          <Route path="/website" element={<WebsiteView />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/createNewAdmin" element={<CreateNewAdmin />} />
          <Route path="/permissionsTable" element={<PermissionDemo />} />
          <Route path="/facultiesTable" element={<FacultiesDemo />} />
          <Route path="/updatePage/:adminId"  element={<AdminUpdatePage/>}  />
          <Route path="/setting/my_profile"  element={<MyProfile/>}  />
          <Route path="/news/:id" element={<UpdateNews />} />
          <Route path="/news/add" element={<AddNews />} />
          <Route path="/events/:id" element={<UpdateEvents />} />
          <Route path="/events/add" element={<AddEvents />} />
        </Routes>
        
      
    </BrowserRouter>

    
    
    </ThemeProvider>
     
    </div>
  );
}

export default App;
/**return (
    <div className='Tableformat'>
        

<DataTable value={data} tableStyle={{ minWidth: '50rem' }}  >
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="permission" header="Permission"></Column>
                <Column field="status" header="status"></Column>
            </DataTable>



    </div>
  ) */