import React from "react";
import { render, screen, waitFor, cleanup, act } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MyContext from "../MyContext";
import { CountContext } from "../../App";

let renderContext;

const { count, setCount } = jest.fn();

describe("Testing react context", () => {
  beforeAll(() => {
    renderContext = render(
      <CountContext.Provider value={{ count, setCount }}>
        <MyContext />
      </CountContext.Provider>
    );
  });

  afterEach(cleanup);

  it("detect context in component", () => {
    const tree = renderer
      .create(
        <CountContext.Provider value={{ count, setCount }}>
          <MyContext />
        </CountContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
