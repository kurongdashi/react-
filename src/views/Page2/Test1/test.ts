console.log('z-1');
setTimeout(() => {
    console.log('z-2');
}, 0);
new Promise((resolve, reject) => {
    console.log('z-3');
    setTimeout(() => {
        console.log('z-7');
        resolve(true);
        console.log('z-8');
    }, 2000);
}).then(() => {
    console.log('z-4');
});
setTimeout(() => {
    console.log('z-5');
}, 2000);
console.log('z-6');
