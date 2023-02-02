import { Configuration, DefaultApi } from 'explorer-client';

const configuration = new Configuration({
  basePath: 'http://localhost:3000',
});

export const explorerApi = new DefaultApi(configuration);