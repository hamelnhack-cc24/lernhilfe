export namespace Config {
  let config = {
    loggedIn: false,
  };

  export function get() {
    return config;
  }

  export function save() {
    localStorage.setItem('config', JSON.stringify(config));
  }

  export function load() {
    config = JSON.parse(localStorage.getItem('config')!);
  }
}
