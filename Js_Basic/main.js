
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


// var sports = [
//     {
//         name: 'Bơi lội',
//         gold: 11
//     },
//     {
//         name: 'Boxing',
//         gold: 3
//     },
//     {
//         name: 'Đạp xe',
//         gold: 4
//     },
//     {
//         name: 'Đấu kiếm',
//         gold: 5
//     },
// ]

// function getTotalGold(preValue,currentValue ){
//     //console.log( preValue+currentValue.gold)
//     return preValue+currentValue.gold;
// }
// var totalGold=sports.reduce(getTotalGold,0)
// console.log(totalGold)

// -----------------------------
// callback
// xây dựng phương thức map2()

var courses=[
    "HTML","CSS","JS"
]
//thực hành tạo phương thức tương tự như map()
Array.prototype.map2=function(callback){
    // this ở đây sẽ bằng mảng courses vì khi map2 được gọi là courses đã gọi đến map2
    var output=[], arrLength=this.length;
    for(let i=0; i<arrLength;i++){
       let result=callback(this[i],i);
       output.push(result);
    }
    return output;
}

var htmls=courses.map2(function(item){
   return `<h2>${item}</h2>`;
})
console.log(htmls.join(''));
console.log('------');



Array.prototype.myMap = function(cb) {
    let arr=[];
    for(let i=0; i<this.length;i++){
         let result=cb(this[i],i);       
         arr.push(result);
    }
    return arr;
    
}

// Expected results
const numbers = [1, 2, 3];

console.log(numbers.myMap(function (number) {
    return number * 2;
})) // Output: [2, 4, 6]

console.log(numbers.myMap(function (number, index) {
    return number * index;
})) // Output: [0, 2, 6]



//MyForeach 
//thực hành tạo phương thức tương tự như Foreach
Array.prototype.forEach2=function(callback){    
    for(let i in this){
        if(this.hasOwnProperty(i)){
            //kiểm tra để tách phần tử tự định nghĩa bởi vì for-in nó sẽ lặp qua tất cả các phần tử kể cả phần tử tự định nghĩa VD forEach2()
            callback(this[i],i,this);       
        }       
   }   
}

numbers.forEach2(function (number, index,arr) {
    //console.log(number * index);
    console.log(number, index,arr);
}) // Output: [0, 2, 6]



///thực hành tạo phương thức tương tự như filter
Array.prototype.myfilter=function(callback){
    let output=[];
    for(let i in this){
        if(this.hasOwnProperty(i)){
            let result=callback(this[i],i,this);  
            if(result){
                output.push(this[i]);
            }
            
        }
    }
    console.log(output);
    return output;
}
console.log('------------------');

numbers.myfilter(function(value,index,arr){
   return value>1;
})
let check=numbers.filter(function(i){
    return i>1;
})
console.log(check);

console.log('--------some2()----------');

Array.prototype.some2=function(callback){   
    for(let item in this){
        if(this.hasOwnProperty(item)){
            let result=callback(this[item],item,this);
            if(result){
                return true;               
            }
        }
    }
    return false;
}

console.log(numbers.some2(function(num){
    return num>7;
}))//trả về giá trị boolean nếu có ít nhất một phần tử hợp lệ=>true  ngược lại

console.log('--------every2()----------');
Array.prototype.every2=function(callback){
    
    for(let item in this){
        if(this.hasOwnProperty(item)){
            if(!callback(this[item],item,this)){
                return false;
            }
        }
    }
    return true;
}
console.log(numbers.every2(function(num){
    return num>0;
}))//trả về giá trị boolean=true nếu tất cả các phần tử cùng thỏa mãn điều kiện & ngược lại


/**
 * Sử dụng các biến đã cho sẵn dưới đây
 */
var productsListElement = document.querySelectorAll(".products-list")[0];

var firstProductElement =document.getElementsByClassName('product')[0];
var buttonElements =document.getElementsByTagName('button');
console.log(productsListElement,firstProductElement,buttonElements);


var courses = ['HTML & CSS', 'Javascript', 'PHP', 'Java']

function render(courses) {
    var html=courses.map(function(cours){
        return `<li>${cours}</li>`
    });
    return document.querySelector('ul').innerHTML=html.join('');
}

render(courses)

var h1Element=document.querySelectorAll('h1');
for(var i=0;i<h1Element.length;i++){
    h1Element[i].onclick()=function(event){
        console.log(event);
        console.log(event.target);//target tương ứng với giá trị h1Element
    }
}

// preventDefault() and stopPropagation()
//thẻ ngăn chặn sự kiện mặc định của trình duyệt VD: ấn chuột xuống,giữ chuột, ấn nút,...
//và ngăn chặn sự kiện nổi bọt diễn ra khi sử dụng DOM attribute event
//  **preventDefault

var aElement=document.links;
for(let i=0;i<aElement.length;i++){
    aElement[i].onclick=function(e){
        if(!e.target.href.startsWith('https://google.com')){

        //khi người dùng click vào thẻ a, nếu thẻ a có href là google.com thì cho chuyển trang, nếu khác thì khong cho chuyển bằng sự kiện dưới
            e.preventDefault();
        }
    }
}
// console.log('callback hell')
// setTimeout(function(){
//     console.log(1);
//     setTimeout(function(){
        
//         console.log(2); 
//         setTimeout(function(){
         
//             console.log(3);
//             setTimeout(function(){
               
//                 console.log(4); 
//             },1000)
//         },1000)
//     },1000)    
// },1000)
// console.log('end callback hell')



// -----------------------Promise-------------
//Promise là khái niệm sinh ra để xử lý các thao tác bất đồng bộ
// trước khi có promise thì chúng ta thường sử dụng callback. Nhưng khi sử dụng callback chúng ta sẽ gặp phải tình trạng là callback hell
//callback hell là tình trạng bị sâu vào, khó nhìn ,code bị rối=> dễ lỗi,khó hiểu,khó bảo trì=> Promise được sinh ra từ phiên bản ES6
//=> có thể sử dụng để khắc phục tình trạng callback hell=> dễ đọc, dễ hiểu
//Khai báo và sử dụng như bên dưới.
console.log('Promise');
//Các bước để tạo ra 1 promise
    // - New Promise
    // -tạo func excutor
var promise=new Promise(
    // excutor
    //function này sẽ được thực thi ngay lập tức khi promise được khởi tạo 
    function(resolve,reject){
        //Logic
        //trong khi xử lý Logic nếu 
            // -thành công thì gọi resolve()
            // -thất bại thì gọi reject()
        // Note: luôn luôn phải trả về một trong 2 thằng trên, nếu không trả về nó sẽ bị treo=> Memory leak: rò rỉ bộ nhớ=> lãng phí bộ nhớ
        resolve();

    }
)
promise
    .then(function(){
        console.log("Thành công");
        //nếu là resolve(thành công)=> sẽ nhảy vào đây
    })
    .catch(function(){
        console.log("Thất bại");
        //nếu là reject(thất bại )=> nhảy vào đây
    })
    .finally(function(){
        console.log("Hoàn thành");
        //nếu một trong 2 thằng kia được thực hiện thì sẽ nhảy vào đây
    })

    // ---------------------------------------------------------------
//trong promise có thể có nhiều .then()

promise
.then(function(){
    console.log("Promise có giá trị trả về")
return 1;
})
.then(function(data){
    console.log(data)//data ở đây sẽ là giá trị trả về của thằng .then() bên trên và bằng 1
    return 2;
})
.then(function(data){
    console.log(data)//data ở đây sẽ là giá trị trả về của thằng .then() bên trên và bằng 2
    return 3;
})
.catch(function(){

})
//----------------------------------------------------------------------------------------------
//Các thằng .then() ở phía sau sẽ nhận tham số truyền vào là kết quả return của thằng .then() trước đó
//nếu thằng .then trước đó không return gì thì thằng đăng sau nó sẽ nhận giá trị trả về là undifined 
//VD

promise
    .then(function(){
   //nó sẽ bỏ qua .then() này và chạy thẳng vào .then() sau
    })
    .then(function(data){
        console.log("Promise không có giá trị trả về")
        console.log(data)//data ở đây sẽ là undifined
        return 2;
    })
    .then(function(data){
        console.log(data)
        return 3;
    })
    .catch(function(){

    })
//nếu .then() nó không return ra một promise thì sẽ bỏ qua thằng .then() không trả về promise đó mà chạy thẳng vào thằng .then() sau.
//nếu .then() nó trả về một promise thì nó sẽ cần đợi thằng .then trả về promise xử lý xong trước rồi mới chạy thằng promise phía sau
// và thằng .then() phía sau sẽ là .then của thằng Promise được trả về  bên trong thằng .then() ban đầu 
VD:
promise
    .then(function(){
        return new Promise(function(resolve){
           
            setTimeout(function(){
                resolve([1,2,3]);
            },2000);
        });
    })
    .then(function(data){//thằng .then() này sẽ là .then() của thằng Promise được return ở  thằng .then() bên trên.
        console.log(data)
        return 3;
    })

//Các trạng thái của promise: 
// -Pendding: đang đợi trả về
// -Fulfilled: đã thành công (resolve)
// -rejected: đã thành công (reject)









