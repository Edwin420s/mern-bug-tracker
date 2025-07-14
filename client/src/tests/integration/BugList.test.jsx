import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import BugList from '../../pages/BugList';

// Mock API responses
const server = setupServer(
  rest.get('/api/bugs', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: '1',
          title: 'Test Bug 1',
          description: 'Description 1',
          status: 'open',
          createdAt: '2023-01-01T00:00:00.000Z'
        },
        {
          _id: '2',
          title: 'Test Bug 2',
          description: 'Description 2',
          status: 'in-progress',
          createdAt: '2023-01-02T00:00:00.000Z'
        }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('BugList Integration Test', () => {
  it('should fetch and display bugs', async () => {
    render(
      <MemoryRouter>
        <BugList />
      </MemoryRouter>
    );

    // Check loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for bugs to load
    await waitFor(() => {
      expect(screen.getByText('Test Bug 1')).toBeInTheDocument();
      expect(screen.getByText('Test Bug 2')).toBeInTheDocument();
      expect(screen.getByText('open')).toBeInTheDocument();
      expect(screen.getByText('in-progress')).toBeInTheDocument();
    });
  });

  it('should display error message when fetch fails', async () => {
    server.use(
      rest.get('/api/bugs', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <MemoryRouter>
        <BugList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error fetching bugs/i)).toBeInTheDocument();
    });
  });
});