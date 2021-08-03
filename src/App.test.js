// myForm.test.js
import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer'
import userEvent from "@testing-library/user-event";

import { MyForm } from "./components/myForm.js";

let renderLogin, handleSubmit;

beforeEach(() => {
  handleSubmit = jest.fn();
  renderLogin = render(<MyForm withSubmit={handleSubmit} />);
});

afterEach(cleanup);

describe("render logic correctly", () => {
  it("rendering and submitting a basic Formik form", async () => {
    userEvent.type(renderLogin.getByLabelText(/first name/i), "John");
    userEvent.type(renderLogin.getByLabelText(/last name/i), "Dee");
    userEvent.type(
      renderLogin.getByLabelText(/email/i),
      "john.dee@someemail.com"
    );

    userEvent.click(renderLogin.getByRole("button", { text: /submit dong/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        email: "john.dee@someemail.com",
        firstName: "John",
        lastName: "Dee",
      });
    });
  });
});

describe("renders UI correctly", () => {
  it("render whole UI with snapshot", () => {
    const tree = renderer.create(<MyForm  />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})