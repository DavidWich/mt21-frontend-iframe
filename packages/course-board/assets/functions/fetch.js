const fetchUserCourses = async (email, token) => {
  return await fetch("/api/courses", {
    method: "POST",
    body: JSON.stringify({ email, token }),
    headers: { "CONTENT-TYPE": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching individual course data");
    }
  });
};

export default fetchUserCourses;
