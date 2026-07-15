import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import type { Connect } from 'vite';

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';
const GITHUB_USER = 'Newer1107';

const CONTRIBS_QUERY = `
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

export default defineConfig({
  server: {
    host: '::',
    port: 8080,
    allowedHosts: ['raunaktech.site'],
    hmr: {
      overlay: false,
    },
  },

  preview: {
    host: '::',
    port: 8080,
    allowedHosts: ['raunaktech.site'],
  },

  plugins: [
    react(),
    // Dev-only: handle /api/github-contribs locally so the frontend works
    // without needing `vercel dev`. In production, Vercel routes /api/*
    // to serverless functions automatically.
    {
      name: 'dev-api-proxy',
      configureServer(server) {
        server.middlewares.use('/api/github-contribs', (async (
          req: Connect.IncomingMessage,
          res: import('http').ServerResponse,
          next: Connect.NextFunction,
        ) => {
          const token = process.env.GITHUB_TOKEN;
          if (!token) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'GITHUB_TOKEN not set in .env' }));
            return;
          }

          try {
            const response = await fetch(GITHUB_GRAPHQL, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: CONTRIBS_QUERY,
                variables: { username: GITHUB_USER },
              }),
            });

            if (!response.ok) {
              res.statusCode = 502;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'GitHub API request failed' }));
              return;
            }

            const json = await response.json();
            const calendar =
              json.data?.user?.contributionsCollection?.contributionCalendar;

            if (!calendar) {
              res.statusCode = 502;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Unexpected GitHub API response' }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.end(JSON.stringify(calendar));
          } catch {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to fetch GitHub contributions' }));
          }
        }) as any);
      },
    },
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
