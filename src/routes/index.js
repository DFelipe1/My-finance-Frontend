import { Routes, Route } from "react-router-dom";
import { Menu } from "../components/Menu";

import { Home } from '../pages/Home';
import { Inputs } from "../pages/Inputs";
import { CreateInput } from "../pages/Inputs/createInput";
import { Login }  from '../pages/Login';
import { Outputs } from "../pages/Outputs";
import { Create } from "../pages/Outputs/create";
import { Users } from "../pages/Users";
import { CreateForm } from "../pages/Users/createForm";

export function RoutesComponet() {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={
                <Menu>
                    <Home/>
                </Menu>
            } />

            <Route path="/inputs"  element={
                <Menu>
                    <Inputs/>
                </Menu>
            } />
            
            <Route path="/inputs/form" element={
                <Menu>
                    <CreateInput/>
                </Menu>
            } />

            <Route path="/outputs" element={
                <Menu>
                    <Outputs/>
                </Menu>
            } />

            <Route path="/outputs/form" element={
                <Menu>
                    <Create/>
                </Menu>
            } />

            <Route path="/users" element={
                <Menu>
                    <Users/>
                </Menu>
            } />

            <Route path="/users/form" element={
                <Menu>
                    <CreateForm/>
                </Menu>
            } />

            <Route path="/*" element={<h1>Not found page</h1>} />
        </Routes>
    )

}