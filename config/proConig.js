export const dev_base_url = "http://localhost:8000";
export const test_base_url = "http://106.52.154.94";
export const uat_base_url = "http://106.52.154.94";
export const prod_base_url = "http://106.52.154.94";

const { REACT_APP_ENV } = process.env;
let base_url;

switch (REACT_APP_ENV) {
  case "development":
    base_url = dev_base_url;
    break;
  case "test":
    base_url = test_base_url;
    break;
  case "uat":
    base_url = uat_base_url;
    break;
  case "production":
    base_url = prod_base_url;
    break;

  //本地开发环境
  default:
    base_url = "http://106.52.154.94";
    break;
}

export default base_url;
