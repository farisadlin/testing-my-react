import React from "react";
import { render, screen, waitFor, cleanup, act } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import MyAxios, { FetchingData } from "../MyAxios";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let renderAxios;

const API = "https://jsonplaceholder.typicode.com";

let mock;

describe("renders UI correctly", () => {
  it("render whole UI with snapshot", () => {
    const tree = renderer.create(<MyAxios />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("fetchData", () => {
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    cleanup();
    mock.reset();
  });
  it("fetches successfully data from an API", async () => {
    const posts = [
      {
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        userId: 1,
      },
      {
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        id: 2,
        title: "qui est esse",
        userId: 1,
      },
      {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
      },
    ];

    mock.onGet(`${API}/posts`).reply(200, {
      posts,
    });

    const result = await FetchingData();

    expect(mock.history.get[0].url).toEqual(`${API}/posts`);
    expect(result.data.posts).toEqual(posts);
  });
});

describe("when API calls fails", () => {
  it("fetches erroneously data from an API", async () => {
    const errorMsg = "Network Error";
    mock.onGet(`${API}/posts`).networkErrorOnce();
    const result = await FetchingData();
    expect(mock.history.get[0].url).toEqual(`${API}/posts`);
    expect(result).toEqual(errorMsg);
  });
});
