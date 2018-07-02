class Test {
  constructor() {
    console.log('hello world');
  }
}

console.log('test');

export default async (event: any, context: AWSLambda.Context) => {
  return new Test();
};
