export const clsx = (conditionals, others) => {
  return [
    others,
    Object.keys(conditionals)
      .filter((key) => conditionals[key])
      .join(" "),
  ].join(" ");
};

export const termsMapping = (key, data) => {
  if (!key) return;
  let result;
  data.map((item) => {
    let _letter = item.name_eng.toLowerCase().replace(/ /g, "-");
    if (key === _letter) {
      return (result = item);
    }
    return false;
  });
  return result || key;
};

export const codeMapping = ({ key, data, field = "name" }) => {
  if (!key) return;
  if (!data) return;
  let result;
  data.map((item) => {
    if (key === item.code || key === item.slackId || key === item.id) {
      switch (field) {
        case "name":
          return (result = item.name);
        case "all":
          return (result = item);
        case "location":
          return (result = item.location);
        default:
          return (result = item.name);
      }
    }
    return false;
  });
  return result || key;
};

export const fetcher = async (url, { setState }) => {
  const req = await fetch(url)
    .then(async (res) => {
      return {
        isOk: res.ok,
        statusCode: res.status,
        data: await res.json(),
      };
    })
    .then(async (res) => {
      setState(res.data);
    })
    .catch((error) => {
      console.warn(error);
      return {
        isOk: false,
        data: error,
      };
    });
};