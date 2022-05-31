// import { useEffect } from "react";
// import { useImmer } from "use-immer";
// import { useMemo } from "react";
// import { useSelector } from "~/src/react/hooks/redux";
import { toast } from "~/src/redux/stores/application";
import { wrapper } from "~/src/redux/wraper";
import {
  expressReduxApi,
  nextReduxApi,
  // expressAxiosEndpoints,
  // nextAxiosEndpoints,
} from "~/src/resources";
import { MainLayout } from "~/src/view/layouts/main-layout";

const TestApiPage = () => {
  const expressTest = expressReduxApi.endpoints.test.useQuery();
  const nextTest = nextReduxApi.endpoints.test.useQuery();

  // const resouces = {
  //   expressReduxTest: () => expressReduxApi.endpoints.test.select({}),
  //   nextReduxTest: () => nextReduxApi.endpoints.test.select({}),
  //   // expressAxiosTest: async () => await expressAxiosEndpoints.test(),
  //   // nextAxiosTest: async () => await nextAxiosEndpoints.test(),
  // };

  // const expressTestSelector = useMemo(
  //   () => expressReduxApi.endpoints.test.select(),
  //   []
  // );
  // const nextTestSelector = useMemo(
  //   () => nextReduxApi.endpoints.test.select(),
  //   []
  // );

  // const expressTest = useSelector(expressTestSelector);
  // const nextTest = useSelector(nextTestSelector);

  // const [state, setState] = useImmer({
  //   expressTest: null,
  //   nextTest: null,
  // });

  // useEffect(() => {
  //   resouces.expressTest().then(({ data }) => {
  //     setState((state) => {
  //       state.expressTest = data.test;
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   resouces.nextTest().then(({ data }) => {
  //     setState((state) => {
  //       state.nextTest = data.test;
  //     });
  //   });
  // }, []);

  return (
    <MainLayout>
      <h1>Test Api Page</h1>

      <h2>Express Redux Test {expressTest.data?.test?.toString()}</h2>
      <h2>Next Redux Test {nextTest.data?.test?.toString()}</h2>

      {/* <h2>Express Redux Test {resouces.expressReduxTest.toString()}</h2> */}
      {/* <h2>Next Redux Test {resouces.nextReduxTest.toString()}</h2> */}

      {/* <h2>Express Axios Test {state?.expressTest?.toString()}</h2> */}
      {/* <h2>Next Axios Test {state?.expressTest?.toString()}</h2> */}
    </MainLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   // TestApiPage.getInitialProps = wrapper.getInitialPageProps(
//   (store) => async (ctx) => {
//     // console.log("hello");
//     store.dispatch(toast.actions.showErrorToast());
//     // const expressTest = await store.dispatch(
//     //   expressReduxApi.endpoints.test.initiate()
//     // );
//     // const nextTest = await store.dispatch(
//     //   nextReduxApi.endpoints.test.initiate()
//     // );
//     // console.log("expressTest", expressTest.data);
//     // console.log("nextTest", nextTest.data);
//     // return { props: {} };
//   }
// );

export default TestApiPage;
