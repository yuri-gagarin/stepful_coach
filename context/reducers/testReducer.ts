export type TestState = {
  loading: boolean;
  value: any;
  testModels: any[];
};

export type TestFirst = {
  readonly type: "TestFirst";
  readonly payload: { value: any; };
};
export type TestIndex = {
  readonly type: "TestIndex";
  readonly payload: {
    loading: boolean; value: any; testModels: any[];
  }
};
export type TestCreate = {
  readonly type: "TestCreate";
  readonly payload: {
    loading: boolean; value: any; newTestModel: any;
  }
};
export type TestDelete = {
  readonly type: "TestDelete";
  readonly payload: {
    loading: boolean; value: any; deletedTestModel: any;
  }
};

export type TestAction = TestFirst | TestIndex | TestCreate | TestDelete;

export const INITIAL_TEST_STATE: TestState = { loading: false, value: "test", testModels: [] };

export const testReducer = (initialTestState: TestState = INITIAL_TEST_STATE, action: TestAction): TestState => {
  switch (action.type) {
    case "TestFirst": {
      return {
        ...initialTestState,
        ...action.payload
      };
    }
    case "TestIndex": {
      return {
        ...initialTestState,
        ...action.payload
      }
    }
    case "TestCreate": {
      return {
        ...initialTestState,
        ...action.payload
      }
    }
    case "TestDelete": {
      return {
        ...initialTestState,
        ...action.payload
      }
    }
    default: return initialTestState;
  }
};
