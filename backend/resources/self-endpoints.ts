import { selfApi } from "../../backend/resources";
import { test, Test } from "~/integration/express/test";
import { axiosResolver } from "~/src/libs/axios-resolver";

export const expressAxiosEndpoints = {
  test: () =>
    axiosResolver<Test.Response>(
      selfApi({ method: test.method, url: test.endpoint })
    ),
};
