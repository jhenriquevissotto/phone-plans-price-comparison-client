export module Test {
  export type Response = {
    test: boolean;
  };
}

export const test = {
  name: "test",
  method: "get",
  endpoint: "/test",
};
