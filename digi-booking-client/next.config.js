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
        source: "/api/user/bookevent",
        destination: "http://localhost:5000/api/user/bookevent",
      },
      {
        source: "/api/user/myevents",
        destination: "http://localhost:5000/api/user/myevents",
      },
      {
        source: "/api/event/getevents",
        destination: "http://localhost:5000/api/event/getevents",
      }
    ];
  };
  return {
    rewrites,
  };
};