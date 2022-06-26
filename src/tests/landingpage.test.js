import { screen, render, queryByAttribute } from '@testing-library/react';
import Content from "../components/landing_page/content"
import AuthContext from "./AuthContext"

// test("if the main container is visbile and has login button", () => {
//     render(<AuthContext><Content/></AuthContext>)

//     expect(screen.getByTestId("landing_page_welcoming_container")).toBeInTheDocument()
//     expect(screen.getByTestId("landing_page_welcoming_container")).toBeVisible()
// })

// test("if the main container has NOT the login page", () => {
//     render(<AuthContext><Content/></AuthContext>)

//     expect(screen.getByTestId("register_page")).toBeNull()
// })