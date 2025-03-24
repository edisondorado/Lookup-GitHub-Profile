const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.PROD_URL,
  credentials: true
}));

app.get("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.get("/repos/:username", async (req, res) => {
  try {
    const { username } = req.params;
    let page = 1;
    let allRepos = [];
    while (true) {
      const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      });
      const repos = response.data;
      if (repos.length === 0) break;
      allRepos = allRepos.concat(repos);
      page++;
    }
    const data = allRepos;
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.get("/activity/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const data = await getYearlyActivity(username);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

async function getYearlyActivity(username) {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await axios.post('https://api.github.com/graphql', {
      query,
      variables: { username },
    }, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/json',
      },
    });
    const data = response.data.data.user.contributionsCollection.contributionCalendar;

    // console.log("Commits for year", data.totalContributions);
    // console.log(data.weeks);

    return data;
  } catch(e) {
    console.error(e);
    return null;
  }
}

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
