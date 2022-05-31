import { expressAxiosApi } from "~/src/resources";
import { test, Test } from "~/integration/express/test";
import { axiosResolver } from "~/src/libs/axios-resolver";

export const expressAxiosEndpoints = {
  test: () =>
    axiosResolver<Test.Res>(
      expressAxiosApi({ method: test.method, url: test.endpoint })
    ),
};
