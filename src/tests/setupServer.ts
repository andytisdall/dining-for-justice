import { http, JsonBodyType, HttpResponse } from 'msw';
import { setupServer } from 'msw/native';

import { store } from '../state/store';
import { api } from '../state/api';

interface Handler {
  path: string;
  method?: keyof typeof http;
  res: (req?: any) => Promise<JsonBodyType>;
}

export const createServer = (handlerConfig: Handler[]) => {
  const handlers = handlerConfig.map(config => {
    const method = http[config.method || 'get'];
    return method(
      'https://portal.ckoakland.org/api' + config.path,
      async (req: any) => {
        const response = await config.res(req);
        return HttpResponse.json(response);
      },
    );
  });

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  beforeEach(() => store.dispatch(api.util.resetApiState()));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};
