export const rootReducer = function (state = 0, action) {
    switch (action.type) {
      case "test":
        return state + 1;
        
    }
  };

