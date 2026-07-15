import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';
const USERNAME = 'Newer1107';

const QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            color
          }
        }
      }
    }
  }
}
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('GitHub API error:', response.status, body);
      return res.status(502).json({ error: 'GitHub API request failed' });
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GitHub GraphQL errors:', json.errors);
      return res.status(502).json({ error: 'GitHub API returned errors' });
    }

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return res.status(502).json({ error: 'Unexpected GitHub API response shape' });
    }

    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.status(200).json(calendar);
  } catch (err) {
    console.error('Failed to fetch GitHub contributions:', err);
    return res.status(502).json({ error: 'Failed to fetch GitHub contributions' });
  }
}
