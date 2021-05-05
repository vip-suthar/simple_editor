function a(){
    console.log(10)
}
a.prototype.c = 2;
//console.log(Object.getPrototypeOf(a).constructor.is())
let b = ()=>{};
console.log(b)
// b.prototype.add = function(){
//     console.log(10+20);
// }
// let c = {c:'c'}
// b.b = 'b';
//b.push('c');
console.log(a.prototype);
console.log(b.prototype)

// get4rmPath