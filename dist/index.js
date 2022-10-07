"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Live2_name;
//---------------基本類型----------------
let str = "bruce";
let str1 = "bruce";
let str2;
str1 = "bruce2";
//不用:number也行
let num = 1000;
let bioo = true;
let n = null;
let un = undefined;
//any就變成原本js的樣子了
let test = true;
//---------------陣列----------------
let arr = ["a", "b"];
let arr2 = [["aa", "bb"]];
//--------------元組---------------
//就只是說裡面有可能會有這三個型別
let tuple = [1, "a", true];
//明確指出第一個類型是什麼，第二個是什麼...
let tuple1 = [1, "a", true];
let tuple2 = [
    ["a", "b"],
    ["1", "12"],
    ["a", "vv"],
];
//--------------Enum枚舉---------------
//開直播
//成功 ->0
//失敗 ->-1
//直播中 ->1
var LiveStatus;
(function (LiveStatus) {
    LiveStatus[LiveStatus["SUCCESS"] = 0] = "SUCCESS";
    LiveStatus[LiveStatus["FAIL"] = -1] = "FAIL";
    LiveStatus[LiveStatus["STREAMING"] = 1] = "STREAMING";
})(LiveStatus || (LiveStatus = {}));
//成功 ->0->成功的狀態
const staus = LiveStatus.FAIL;
console.log(staus);
//--------------Union---------------
//Union->可以是number或是string或是其他類別的
let aaa;
aaa = 1000;
aaa = "str";
let a1;
a1 = 999;
a1 = "str";
//a1=true->ERROR
let b1;
b1 = true;
const obj = {
    name: "jason",
    desc: "....",
    age: 12,
};
console.log(obj);
//funtion
//參數
//如果沒加type要用猜的
function hello(a, b) {
    return a + b;
}
//hello2有明確指出要return number，但return 是 string
function hello2(a, b) {
    console.log(a, b);
    return 123;
}
function hello3(a, b, c) {
    return 123;
}
//undefined
function test2(a) {
    console.log(a);
}
//必要參數(沒?)寫在選擇參數(有?)前面
//沒?要寫在的有?前面
function hello4(name, age, c) {
    let a;
    //這時typescript會提示a有可能會是undefined，會抱錯
    // a = age;//示範一
    if (age === undefined) {
        return -1;
    }
    test2(age);
    return;
}
//hello4("asd",12,79);
//->函式
const func = () => { };
const func1 = () => {
    return 1;
};
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = (yield res.json());
        console.log("datafetch", data);
        //test
        const h1 = document.getElementById("box");
        const h2 = document.querySelector("h2");
        if (h1 && h2) {
            h1.innerText = data.id.toString();
            h2.innerText = data.title;
        }
    });
}
getData();
//選from表單裡面的childen
// const form=document.querySelector<HTMLFormElement>(".app");
//--> const form=document.querySelector(".app") as HTMLFormElement;
// console.log(form?.children)
// if (h1) {
//     h1.innerText = data.id.toString;
// }
//下面這樣是固定的
const data1 = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
};
const beta = data1;
//但如果data1是動態的呢?
//先unknown(不知道是什模狀態的狀態)，再補上我們要的類型 Beta
const beta1 = data1;
//----------------class-----------------
//成員
//private 私有->只有原本OK
//public 公開
//protected 受保護->繼承->super
// roomName:string-->預設是public
// roomName與rooName1是不一樣的
class Live {
    constructor(rooName1, id1, name1) {
        console.log("建立直播中....");
        this.roomName = rooName1;
        this.id = id1;
        this.name = name1;
    }
    start() {
        this.id;
        //在原有class才呼叫的到id(private 私有)
    }
}
//對於class 是外面
const live = new Live("1號", "000001", "bruce");
//extends 繼承給CarLive
class CarLive extends Live {
    constructor(rooName1, id1, name1) {
        super(rooName1, id1, name1);
    }
    start() {
        super.name;
        //protected 受保護->可以在繼承之class中用super訪問到
        //但如果是private 私有->繼承之class也是super不到
    }
}
//console.log()live.id 一樣會出來
//只能防止在開發中不小心誤用的限制
//單單讀取live.id讀不出來
console.log("Live data", live);
//對於class 是外面
const carlive = new CarLive("car room", "000002", "bruce2");
//carlive.只能選到公開的
class Live2 {
    constructor(name) {
        //這是js自帶的私有變數寫法
        _Live2_name.set(this, void 0); //在js中#的意思是把變數(name)變成private私有的類型
        __classPrivateFieldSet(this, _Live2_name, name, "f");
    }
}
_Live2_name = new WeakMap();
const live2 = new Live2("live2");
//console.log(live.#name);->.#name會出錯
console.log("live2", live2);
// type CarProps = {
//     name: string;
//     age: number;
//     start: () => void; //一個不會回傳東西的funtion
// };
//透過implements，把某個interface實作出來
//implements->實作
//為何car會錯?->因為既然宣告了interface了，那interface裡面的變數就一定是要(public)公開，否則會報錯
class Car {
    constructor(name1, age1) {
        this.name = name1;
        this.age = age1;
    }
    start() { }
}
//-------------------泛型-------------------------
function print(data) {
    console.log("data", data);
}
print(999);
print("string");
print(true);
//<>裡面不一定要取名為T
class Print {
    constructor(d) {
        this.data = d;
    }
}
const p = new Print(999);
const p1 = new Print("jason");
console.log("p", p);
console.log("p1", p1);
//Record<key(CatName),value(CatInfo)>
const cats = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
    jason: { age: 16, breed: "British Shorthair" },
};
console.log("cats", cats);
//Record另一寫法
//假設只知道key可以用string,而value是布林值
const opb1 = {
    name: true,
    // age:123
};
const todo = {
    title: "Clean room",
    completed: false,
    // age:
};
const todo1 = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
    // description:
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsSUFBSSxHQUFHLEdBQVcsT0FBTyxDQUFDO0FBQzFCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUNuQixJQUFJLElBQVksQ0FBQztBQUNqQixJQUFJLEdBQUcsUUFBUSxDQUFDO0FBRWhCLGFBQWE7QUFDYixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7QUFDdkIsSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDO0FBQ3pCLElBQUksQ0FBQyxHQUFTLElBQUksQ0FBQztBQUNuQixJQUFJLEVBQUUsR0FBYyxTQUFTLENBQUM7QUFFOUIsZ0JBQWdCO0FBQ2hCLElBQUksSUFBSSxHQUFRLElBQUksQ0FBQztBQUVyQixtQ0FBbUM7QUFDbkMsSUFBSSxHQUFHLEdBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDL0IsSUFBSSxJQUFJLEdBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBRXRDLGlDQUFpQztBQUVqQyxrQkFBa0I7QUFDbEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTNCLHdCQUF3QjtBQUN4QixJQUFJLE1BQU0sR0FBOEIsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXZELElBQUksTUFBTSxHQUF1QjtJQUM3QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDVixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7SUFDWCxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7Q0FDZCxDQUFDO0FBRUYscUNBQXFDO0FBRXJDLEtBQUs7QUFDTCxRQUFRO0FBQ1IsU0FBUztBQUNULFNBQVM7QUFDVCxJQUFLLFVBSUo7QUFKRCxX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