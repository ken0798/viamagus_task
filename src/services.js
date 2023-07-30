export const type = {
  POST: "POST",
};

export const limit = 5;

const API_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(page) {
  const count = page * limit;
  const res = await fetch(`${API_URL}/posts?_start=${count}&_limit=${limit}`);
  const data = await res.json();
  return data;
}

export async function createPost(data) {
  const options = {
    method: type.POST,
    body: JSON.stringify({
      title: data.title,
      body: data.text,
      userId: 17,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetch(`${API_URL}/posts`, options);
  const result = await res.json();
  return result;
}

export async function getPostById(id) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  const data = await res.json();
  return data;
}
