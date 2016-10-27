import data from './exportVal.js';
console.log(data);
if (data.data.isSafe) {
  console.log(`MSG: ${data.data.msg}`);
  console.log(data.methods.deal(65));
}

const log = () => {
  console.log('message:  from index.js');
}
// 运行函数
log();

const sex = 'male';
const person = {
  name: 'cp',
  age: 18,
  sex
};

(() => {
  const fn = ({name, age, sex}) => {
    console.log(`name: ${name} age: ${age} sex: ${age}`);
  }
  fn(person);
})();