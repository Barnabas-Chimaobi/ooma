import reducer, {increment, decrement, clear} from './increment';

describe('increment reducer', () => {
  it('should handle initial state', () => {
    return expect(reducer(undefined, {})).toEqual({value: 0, isLoading: false});
  });

  it('should handle INCREMENT', () => {
    expect(
      reducer(
        {value: 0, isLoading: false},
        {
          type: increment.type,
          isLoading: true,
          payload: 4,
        },
      ),
    ).toEqual({
      isLoading: true,
      value: 4,
    });
  });

  it('should handle DECREMENT', () => {
    expect(
      reducer(
        {value: 4, isLoading: false},
        {
          type: decrement.type,
          payload: 2,
        },
      ),
    ).toEqual({
      isLoading: false,
      value: 2,
    });
  });

  it('should handle CLEAR', () => {
    expect(
      reducer(
        {value: 2, isLoading: true},
        {
          type: clear.type,
        },
      ),
    ).toEqual({
      isLoading: false,
      value: 0,
    });
  });
});
