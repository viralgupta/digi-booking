module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/user/login",
        destination: "http://localhost:5000/api/user/login",
      },
      {
        source: "/api/user/signup",
        destination: "http://localhost:5000/api/user/signup",
      },
      {
        source: "/api/event/myevents",
        destination: "http://localhost:5000/api/event/myevents",
      },
      {
        source: "/api/event/createevent",
        destination: "http://localhost:5000/api/event/createevent",
        },
      {
        source: "/api/event/verifyevent",
        destination: "http://localhost:5000/api/event/verifyevent",
      },
      {
        source: "/api/event/verifybooking",
        destination: "http://localhost:5000/api/event/verifybooking",
      },
    ];
  };
  return {
    rewrites,
  };
};