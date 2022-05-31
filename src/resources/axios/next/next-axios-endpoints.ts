import { nextAxiosApi } from "~/src/resources";
import { test, Test } from "~/integration/next/test";
import { axiosResolver } from "~/src/libs/axios-resolver";

export const nextAxiosEndpoints = {
  test: () =>
    axiosResolver<Test.Res>(
      nextAxiosApi({ method: test.method, url: test.endpoint })
    ),
};
