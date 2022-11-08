import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    'Authorization': `token ${GITHUB_TOKEN}`
  }
});

export const fetchUsers = async (text) => {

  const response = await github.get(`/search/users?q=${text}`);
  return response?.data?.items;
}

export const getUserandRepos = async (username) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })
  const [user, repos] = await Promise.all([github.get(`/users/${username}`), github.get(`/users/${username}/repos?${params}`)]);

  return { user: user.data, repos: repos.data }
}

// export const fetchUser = async (name) => {
//   const response = await fetch(`/users/${name}`, {
//     headers: {
//       'Authorization': `token ${GITHUB_TOKEN}`
//     }
//   })

//   if(response.status === 404) {
//     window.location = '/notFound';
//     return ;
//   }
//   const data = await response.json();

//   return data;
// }

// export const fetchRepos = async (username) => {

//   const params = new URLSearchParams({
//     sort: 'created',
//     per_page: 10
//   })
//   const response = await fetch(`${GITHUB_URL}/users/${username}/repos?${params}`, {
//     headers: {
//       'Authorization': `token ${GITHUB_TOKEN}`
//     }
//   });
//   const data = await response.json();
  
//   return data;
// } 