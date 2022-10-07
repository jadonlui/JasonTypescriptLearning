//---------------基本類型----------------
let str: string = "bruce";
let str1 = "bruce";
let str2: string;
str1 = "bruce2";

//不用:number也行
let num: number = 1000;
let bioo: boolean = true;
let n: null = null;
let un: undefined = undefined;

//any就變成原本js的樣子了
let test: any = true;

//---------------陣列----------------
let arr: string[] = ["a", "b"];
let arr2: string[][] = [["aa", "bb"]];

//--------------元組---------------

//就只是說裡面有可能會有這三個型別
let tuple = [1, "a", true];

//明確指出第一個類型是什麼，第二個是什麼...
let tuple1: [number, string, boolean] = [1, "a", true];

let tuple2: [string, string][] = [
    ["a", "b"],
    ["1", "12"],
    ["a", "vv"],
];

//--------------Enum枚舉---------------

//開直播
//成功 ->0
//失敗 ->-1
//直播中 ->1
enum LiveStatus {
    SUCCESS = 0,
    FAIL = -1,
    STREAMING = 1,
}
//成功 ->0->成功的狀態
const staus = LiveStatus.FAIL;
console.log(staus);

//--------------Union---------------
//Union->可以是number或是string或是其他類別的
let aaa: number | string;
aaa = 1000;
aaa = "str";

//--------------type---------------
//type->自定義
type A = number | string;
type B = boolean | string;
let a1: A;
a1 = 999;
a1 = "str";
//a1=true->ERROR

let b1: B;
b1 = true;

//--------------interface---------------
//interface介面
interface User {
    name: string;
    age: number;
}

//object
//type不能擴充
type Card = {
    name: string;
    desc: string;
};

// type Card = {
//   age: number;
// };-->會報錯

//interface可以擴充
interface Card2 {
    name: string;
    desc: string;
}
//代表Card2現在加上age有三個變數
interface Card2 {
    age?: number; //可選擇
    //加?代表age也可以不用寫(下面obj裡面可以不用有age)
}

const obj: Card2 = {
    name: "jason",
    desc: "....",
    age: 12,
};
console.log(obj);
//funtion
//參數
//如果沒加type要用猜的
function hello(a: string, b: string) {
    return a + b;
}

//hello2有明確指出要return number，但return 是 string
function hello2(a: string, b: string): number {
    console.log(a, b);
    return 123;
}

function hello3(a: number, b: boolean, c: string) {
    return 123;
}

//undefined

function test2(a: number) {
    console.log(a);
}
//必要參數(沒?)寫在選擇參數(有?)前面
//沒?要寫在的有?前面
function hello4(name: string, age?: number, c?: number) {
    let a: number;
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
const func = () => {};
const func1 = () => {
    return 1;
};

//--------------斷言 as unknown---------------
//斷言unknown

type Data = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

async function getData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = (await res.json()) as Data;
    console.log("datafetch", data);
    //test
    const h1 = document.getElementById("box") as any;
    const h2 = document.querySelector("h2");
    if (h1&&h2) {
        h1.innerText = data.id;
        h2.innerText = data.title;
    }
}
getData();

//選from表單裡面的childen
// const form=document.querySelector<HTMLFormElement>(".app");
//--> const form=document.querySelector(".app") as HTMLFormElement;
// console.log(form?.children)

//下面這樣是固定的
const data1: Data = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
};

type Beta = {
    name: string;
};
const beta = data1;

//但如果data1是動態的呢?
//先unknown(不知道是什模狀態的狀態)，再補上我們要的類型 Beta
const beta1 = data1 as unknown as Beta;

//----------------class-----------------
//成員
//private 私有->只有原本OK
//public 公開
//protected 受保護->繼承->super

// roomName:string-->預設是public

// roomName與rooName1是不一樣的
class Live {
    roomName: string;
    private id: string;
    protected name: string;

    constructor(rooName1: string, id1: string, name1: string) {
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
    constructor(rooName1: string, id1: string, name1: string) {
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
    //這是js自帶的私有變數寫法
    #name; //在js中#的意思是把變數(name)變成private私有的類型
    constructor(name: string) {
        this.#name = name;
    }
}
const live2 = new Live2("live2");
//console.log(live.#name);->.#name會出錯
console.log("live2", live2);
//真正符合(private)私有變數的樣子，也顯示不出來
//上面class宣告的部分，則是在開發時讓開發者知道它是甚麼型態

interface CarProps {
    name: string;
    age: number;
    start: () => void; //一個不會回傳東西的funtion
}
// type CarProps = {
//     name: string;
//     age: number;
//     start: () => void; //一個不會回傳東西的funtion
// };

//透過implements，把某個interface實作出來
//implements->實作
//為何car會錯?->因為既然宣告了interface了，那interface裡面的變數就一定是要(public)公開，否則會報錯
class Car implements CarProps {
    // private name: string;->會錯
    name: string;
    age: number;

    constructor(name1: string, age1: number) {
        this.name = name1;
        this.age = age1;
    }
    start() {}
}

//-------------------泛型-------------------------
function print<T>(data: T) {
    console.log("data", data);
}
print<number>(999);
print<string>("string");
print<boolean>(true);

//<>裡面不一定要取名為T
class Print<T> {
    data: T;
    constructor(d: T) {
        this.data = d;
    }
}

const p = new Print<number>(999);
const p1 = new Print<string>("jason");
console.log("p", p);
console.log("p1", p1);

//-----------------utility --------------------
interface CatInfo {
    age: number;
    breed: string;
}

//定義你物件能不能有這個key，但定義一定要有
type CatName = "miffy" | "boris" | "mordred" | "jason";

//Record<key(CatName),value(CatInfo)>
const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
    jason: { age: 16, breed: "British Shorthair" },
};
console.log("cats", cats);

//Record另一寫法
//假設只知道key可以用string,而value是布林值
const opb1: Record<string, boolean> = {
    name: true,
    // age:123
};

//pick
//舊有interface -> Todo
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

//新type想用
type TodoPreview = Pick<Todo, "title" | "completed">;

interface tt {}
const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
    // age:
};

//Omit
interface Todo1 {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}
//篩選掉"description"後全新的type
type TodoPreview1 = Omit<Todo1, "description">;

const todo1: TodoPreview1 = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
    // description:
};
