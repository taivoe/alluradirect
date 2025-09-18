const cookie = 'max-age=604800;domain=localhost';

const headers = {
  cookie: cookie,
};

export const fetchOptions: FetchOptions = Object.freeze({
  credentials: 'include',
  headers,
});

interface FetchOptions {
  credentials: any;
  headers: {
    cookie: string;
  };
}
