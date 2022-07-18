export type TestState = {
  loading: boolean;
  value: string;
};

export type TestFirst = {
  readonly type: "TestFirst";
  readonly payoad: { value: string; };
};

export type TestAction = TestFirst;

export const INITIAL_TEST_STATE: TestState = { loading: false, value: "test" };

export const testReducer = (initialTestState: TestState = INITIAL_TEST_STATE, action: TestAction): TestState => {
  switch (action.type) {
    case "TestFirst": {
      return {
        ...initialTestState,
        ...action.payoad
      };
    }
    default: return initialTestState;
  }
};
