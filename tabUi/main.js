
// var test=[
//     {
//         id:1,
//         name:'A',
//         coin:0
//     },
//     {
//         id:2,
//         name:'B',
//         coin:1
//     },
//     {
//         id:3,
//         name:'C',
//         coin:2
//     },

//      {
//         id:4,
//         name:'E',
//         coin:3
//     },
// ];

// // map sẽ trả  về mảng mới có số lượng phần tử bằng số lượng phần tử có giá trị của mảng cũ
// // bên trong map cần truyền vào một function 
// function handler(test){
//     // return {
//     //     id:test.id,
//     //     name:`Test ${test.name}`,
//     //     coin:test.coin,
//     //     coinText: `Text ${test.coin}`
//     // }

//     // trong thực tế, ta dùng map để hiển thị dữ liệu
//     return `<h2>${test.name}</h2>`

// }
// var newTest=test.map(handler);
// console.log(newTest.join(''));
// //  result: <h2> A </h2><h2> B </h2><h2> C </h2><h2> E </h2>


var sports = [
    {
        name: 'Bơi lội',
        gold: 11
    },
    {
        name: 'Boxing',
        gold: 3
    },
    {
        name: 'Đạp xe',
        gold: 4
    },
    {
        name: 'Đấu kiếm',
        gold: 5
    },
]

function getTotalGold(preValue,currentValue ){
    //console.log( preValue+currentValue.gold)
    return preValue+currentValue.gold;
}
var totalGold=sports.reduce(getTotalGold,0)
console.log(totalGold);



// tab UI F8

const $= document.querySelector.bind(document);
const $$= document.querySelectorAll.bind(document);

var tabs=$$('.tab-item');
var pans=$$('.tab-pane');
let tabActive= $('.tab-item.active');
let line= $('.tabs .line ');

line.style.width=tabActive.offsetWidth+'px';
line.style.left=line.offsetLeft+'px';
 tabs.forEach((tab,index) => {
    var pan=pans[index];
    console.log(tab)
    tab.onclick=function(){
       
     
        $('.tab-item.active').classList.remove('active');
        $('.tab-pane.active').classList.remove('active');

        line.style.width=this.offsetWidth+'px';
        line.style.left=this.offsetLeft+'px';
        
        this.classList.add('active');
        pan.classList.add('active');
       
    }
 });
