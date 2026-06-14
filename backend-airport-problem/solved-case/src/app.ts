import { Hono } from 'hono';
import { flightsRoutes } from './routes/flights';
import { standsRoutes } from './routes/stands';

export function createApp() {
  const app = new Hono();
  app.get('/health', (c) => c.json({ ok: true }));
  app.route('/flights', flightsRoutes);
  app.route('/stands', standsRoutes);
  return app;
}
