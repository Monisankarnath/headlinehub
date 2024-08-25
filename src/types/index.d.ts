declare module '@env' {
  export const ENV_BASE_URL: string;
  export const NEWS_API_KEY: string;
}

declare type QueryParamsType = Record<string | number, string | number> | null;

declare type REQ_METHODS_TYPE = 'GET';

declare type AppHeaderProps = {
  loadNextHeadlines: () => void;
};
