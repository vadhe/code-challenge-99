export const sum_to_n_a = function (n: number) {
  const result = Array.from({ length: n })
    .map((_, i) => i + 1)
    .reduce((acc, prev) => acc + prev);
  console.log(result);
  return result;
};

export const sum_to_n_b = function (n: number) {
  const a = Array.from({ length: n }).map((_, i) => i + 1);
  let result = 0;
  for (let i = 1; i <= a.length; i++) {
    result = result + i;
  }
  console.log(result);
  return result;
};

export const sum_to_n_c = function (n: number) {
  const a = Array.from({ length: n }).map((_, i) => i + 1);
  let result = 0;

  a.forEach((i) => {
    result = result + i;
  });

  console.log(result);
  return result;
};


const main = () => {
  const n = 5;
  sum_to_n_a(n);
  sum_to_n_b(n);
  sum_to_n_c(n);
}

main();