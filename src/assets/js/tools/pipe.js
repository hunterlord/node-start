export let pipe = (data, filters) => {
  (typeof filters === 'function' ? [filters] : filters).map(
    filter =>
      data = typeof filter === 'string' ? pipe[filter](data) : filter(data)
  );
  return data;
};

// demo1
pipe.numeric = data => {
  if (typeof data === 'string') {
    data = data.replace(/[^\d]/g, '');
    return Number.parseInt(data);
  } else return data;
};

// demo2
pipe.toArray = data => {
  data = `${data}`;
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    arr.push(data.at(i));
  }
  return arr;
};
