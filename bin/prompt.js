import rl from 'readline';

export default function(question) {
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  return new Promise((resolve, reject) => {
    r.question(question, answer => {
      r.close();
      resolve(answer);
    })
  })
}