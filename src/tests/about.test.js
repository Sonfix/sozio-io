import { screen, render, queryByAttribute } from '@testing-library/react';
import Content from "../components/about/content"

test("if the containers are visbile and have text", () => {
    render(<Content/>)

    //now we are simply expecting these two container with text in it
    expect(screen.getByTestId("about-first-text-card")).toBeInTheDocument()
    expect(screen.getByTestId("about-second-text-card")).toBeInTheDocument()
})