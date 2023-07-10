actor {
  stable var latestName : Text = "";

  public func greet(name : Text) : async Text {
    let tmp = "Hello, " # name # "! (from Motoko)";
    latestName := tmp;
    return tmp;
  };

  public query func getLatestName() : async Text {
    return latestName;
  };

};
