var container = document.getElementById("container")
var select = 0
var left=0
var from = true;
var to = true;
var draw;
var setadd = true;
var cell_from = [-1,-1];
var cell_to = [-1,-1]
var time = document.getElementById("time")
document.getElementById("cheo").checked = false
document.addEventListener('contextmenu', event => event.preventDefault())
// biến quản lý so luong Ô
var Size = 20 // mặc định là 20px
var map = new Array()
class Node
{
    constructor(element)
    {
        this.back
        this.e = element
    } 
    get_g()
    {
        let tmp = this.e.id.split("_")
        let x = parseInt(tmp[1])
        let y = parseInt(tmp[2])
        let a = x-cell_from[0]
        let b = y-cell_from[1]
        return Math.sqrt(a*a+b*b)
    }
    get_h()
    {
        if(document.getElementById("astar").checked == true)
        {
            let tmp = this.e.id.split("_")
            let x = parseInt(tmp[1])
            let y = parseInt(tmp[2])
            let a = x-cell_to[0]
            let b = y-cell_to[1]
            return Math.sqrt(a*a+b*b)
        }
        else 
        {
            return 0
        }
    }
    get_f()
    {
        return this.get_h()+this.get_g()
    }
}
var node_from
var node_to
function create_map(size) //hàm tạo map
{
    
    Size = size;
    let sml = ""
    map = new Array();
    for(let y=0;y<size;y++)
    {
        map.push(new Array())
        for(let x=0;x<size;x++)
        {
            sml+='<div class="containCell" style="width: '+(100/Size)+'%;height: '+(100/Size)+'%;">'
            sml+=   '<div id="_'+x+'_'+y+'" class="Cell" ></div>'
            sml+='</div>'
            map[y].push(new Object())
        }
    }
    container.innerHTML = sml+'<canvas id="draw"></canvas>';
    for(y=0;y<size;y++)
    for(x=0;x<size;x++)
        map[x][y] = new Node(document.getElementById("_"+x+"_"+y))
    from=true;
    to=true;
    draw = document.getElementById("draw")
    draw.width = container.offsetHeight-10
    draw.height = draw.width
    document.getElementById("size").innerText = Size+"x"+Size
    newrun()
} 
document.addEventListener("keyup",(e)=>
{
    e.preventDefault()
    if(e.code=="KeyR")
    {
        RunView_A()
    }else
    if(e.code=="KeyS")
    {
        RunView_B()
    }else
    if(e.code=="KeyN")
    {
        newrun()
    }else
    if(e.code=="KeyU")
    {
        makenew()
    }else
    if(e.code=="KeyV")
    {
        random()
    }
    else
    if(e.code=="KeyH")
    {
        show(3)
    }
    else
    if(e.code=="KeyG")
    {
        show(2)
    }
    else
    if(e.code=="KeyF")
    {
        show(1)
    }
    else
    if(e.code=="KeyX")
    {
        document.getElementById("cheo").checked = !document.getElementById("cheo").checked
    }
    else
    if(e.code=="KeyD")
    {
        document.getElementById("Dijstra").checked = true
    }
})
document.addEventListener("mousedown",(e)=>
{
    e.preventDefault()
    left=e.buttons
    let cell = e.path[0]
    let data = cell.id.split("_")
    if(data.length==3)
    {
        let x = parseInt(data[1])
        let y = parseInt(data[2])
        if(left==1)
        {
            if(select==1)
            {
                left = 4
                select = 0
            }
            else
            if(select==2)
            {
                left = 2
                select = 0
            }
            else
            if(from==true)
            {
                left = 4
            }
            else
            if(to==true)
            {
                left = 2
            }else
            if(!cell.classList.contains("to")&&!cell.classList.contains("from"))
            {
                if(cell.classList.contains("light"))
                {
                    cell.classList.remove("light")
                }
                else
                {
                    cell.classList.add("light")
                }
            }
        }
        console.log(left);
        if(left==2)
        {
            if(!cell.classList.contains("light")&&!cell.classList.contains("from"))
            {
                if(cell.classList.contains("to"))
                {
                    cell.classList.remove("to")
                    to = true
                }
                else
                {
                    try{
                        document.getElementById("_"+cell_to[0]+"_"+cell_to[1]).classList.remove("to")
                    }catch{}
                    cell.classList.add("to")
                    cell_to = [x,y]
                    to = false
                    node_to = new Node(cell)
                }
            }
        }
        if(left==4)
        {
            if(!cell.classList.contains("light")&&!cell.classList.contains("to"))
            {
                if(cell.classList.contains("from"))
                {
                    cell.classList.remove("from")
                    from = false
                }
                else
                {
                    try{
                        document.getElementById("_"+cell_from[0]+"_"+cell_from[1]).classList.remove("from")
                    }catch{}
                    cell.classList.add("from")
                    cell_from = [x,y]
                    from = false
                    node_from = new Node(cell)
                }
            }
        }
    }  
})
function getText()
{
    s=""
    for(let y=0;y<Size;y++)
    for(let x=0;x<Size;x++)
    {
        let value = ''
        if(document.getElementById("_"+x+"_"+y).classList.contains("light"))
        value=1
        if(document.getElementById("_"+x+"_"+y).classList.contains("to"))
        value=2
        if(document.getElementById("_"+x+"_"+y).classList.contains("from"))
        value=3
        s += value+","
    }
    return s
}
function setText(str)
{
    s = str.split(",");
    sl=0
    Size = Math.sqrt(s.length-1)
    create_map(Size)
    for(let y=0;y<Size;y++)
    for(let x=0;x<Size;x++)
    {
        let data = s[sl++]       
        if(data=='1')
        {
            document.getElementById("_"+x+"_"+y).classList.add('light')
        }
        if(data=='2')
        {
            document.getElementById("_"+x+"_"+y).classList.add('to')
            to=false
            cell_to= [x,y]
            node_to = new Node(document.getElementById("_"+x+"_"+y))
        }
        if(data=='3')
        {
            document.getElementById("_"+x+"_"+y).classList.add('from')
            from=false
            cell_from = [x,y]
            node_from = new Node(document.getElementById("_"+x+"_"+y))
        }
    }
    
}

function show(type)
{
    for(let y=0;y<Size;y++)
    for(let x=0;x<Size;x++)
    {
        if(type==1) document.getElementById("_"+x+"_"+y).innerHTML = "<p class='nd' style='font-size:"+250/Size+"px ;'>"+(map[x][y].get_f()).toFixed(1)+"</p>"
        if(type==2) document.getElementById("_"+x+"_"+y).innerHTML = "<p class='nd' style='font-size:"+250/Size+"px ;'>"+(map[x][y].get_g()).toFixed(1)+"</p>"
        if(type==3) document.getElementById("_"+x+"_"+y).innerHTML = "<p class='nd' style='font-size:"+250/Size+"px ;'>"+(map[x][y].get_h()).toFixed(1)+"</p>"
    }
}
var open = new Array()
var close = new Array()
function nodemin()
{
    let min = open[0]
    let vt = 0
    let gt = node_to.get_h()
    for(i=1;i<open.length;i++)
    {
        if(Math.abs(gt-open[i].get_f())<Math.abs(gt-min.get_f()))
        {
            min = open[i]
            vt = i ;
        }
    }
    open.splice(vt,1)
    return min
}
function isexist(m,clo)
{
    if(document.getElementById("_"+m[0]+"_"+m[1]).classList.contains("light"))
        return true;
    for(i=0;i<clo.length;i++)
    {
        if(clo[i].e==document.getElementById("_"+m[0]+"_"+m[1]))
        {
            return true
        }
    }
    return false
}
function addnode(min)
{
    let tmp = min.e.id.split("_")
    let x = parseInt(tmp[1])
    let y = parseInt(tmp[2])
    close.push(min)
    if(x+1<Size)
    {
        if(!isexist([x+1,y],close)&&!isexist([x+1,y],open))
        {
            open.push(new Node(document.getElementById("_"+(x+1)+"_"+(y))))
            open[open.length-1].back = min
        }
    }
    if(y+1<Size)
    {
        if(!isexist([x,y+1],close)&&!isexist([x,y+1],open))
        {
            open.push(new Node(document.getElementById("_"+(x)+"_"+(y+1))))
            open[open.length-1].back = min
        }
    }
    if(x-1>=0)
    {
        if(!isexist([x-1,y],close)&&!isexist([x-1,y],open))
        {
            open.push(new Node(document.getElementById("_"+(x-1)+"_"+(y))))
            open[open.length-1].back = min
        }
    }
    if(y-1>=0)
    {
        if(!isexist([x,y-1],close)&&!isexist([x,y-1],open))
        {
            open.push(new Node(document.getElementById("_"+(x)+"_"+(y-1))))
            open[open.length-1].back = min
        }
    }
    if(document.getElementById("cheo").checked)
    {
        if(x-1>=0&&y-1>=0)
        {
            if(!isexist([x-1,y-1],close)&&!isexist([x-1,y-1],open))
            {
                open.push(new Node(document.getElementById("_"+(x-1)+"_"+(y-1))))
                open[open.length-1].back = min
            }
        }
        if(x+1<Size&&y+1<Size)
        {
            if(!isexist([x+1,y+1],close)&&!isexist([x+1,y+1],open))
            {
                open.push(new Node(document.getElementById("_"+(x+1)+"_"+(y+1))))
                open[open.length-1].back = min
            }
        }
        if(x+1<Size&&y-1>=0)
        {
            if(!isexist([x+1,y-1],close)&&!isexist([x+1,y-1],open))
            {
                open.push(new Node(document.getElementById("_"+(x+1)+"_"+(y-1))))
                open[open.length-1].back = min
            }
        }
        if(x-1>=0&&y+1<Size)
        {
            if(!isexist([x-1,y+1],close)&&!isexist([x-1,y+1],open))
            {
                open.push(new Node(document.getElementById("_"+(x-1)+"_"+(y+1))))
                open[open.length-1].back = min
            }
        }
    }
}
function color()
{
    document.getElementById("slopen").innerText = open.length
    document.getElementById("slclose").innerText = close.length
    open.forEach(item=>{
        item.e.classList.add("open")
    })
    close.forEach(item=>{
        item.e.classList.add("close")
    })
    
}
var ctx
function back(node)
{
    draw.style.width = (container.offsetHeight-10)+"px"
    draw.style.height = (container.offsetHeight-10)+"px"
    ctx = draw.getContext("2d")
    ctx.beginPath()
    let x = (node.e.offsetLeft-5)+(node.e.offsetWidth/2)
    let y = (node.e.offsetTop-5)+(node.e.offsetWidth/2)
    ctx.moveTo(x, y)
    while(true)
    {
        let x1 = (node.e.offsetLeft-5)+(node.e.offsetWidth/2)
        let y1 = (node.e.offsetTop-5)+(node.e.offsetWidth/2)
        ctx.lineTo(x1, y1)
        ctx.lineWidth = 50/Size;
        ctx.strokeStyle = "#c142e0"
        ctx.stroke()
        if(node.back==undefined)
        {
            break;
        }
        node = node.back
    }
    ctx.closePath()  
}

function clearrun()
{
    for(y=0;y<Size;y++)
        for(x=0;x<Size;x++)
        {
            if(map[x][y].e.classList.contains("open"))
                map[x][y].e.classList.remove("open")
            if(map[x][y].e.classList.contains("close"))
                map[x][y].e.classList.remove("close")
        }
    try{
        ctx.clearRect(0,0,draw.width,draw.height)
    }catch{}
   
}
var RunK
var RunB
function RunView_A()
{
    open = new Array()
    close = new Array()
    clearInterval(RunB)
    clearInterval(RunK)
    clearrun()
    open.push(node_from)
    s = 0;
    buoc = 1
    console.clear();
    RunK = setInterval(e=>{
       try{
        console.log("Bước "+(buoc++)+": F("+cell_from[0]+", "+cell_from[1]+"), T("+cell_to[0]+", "+cell_to[1]+") ")
        let nodenow = nodemin()
        tb=""
        if(nodenow.e == node_to.e) tb = " là điểm đích T("+cell_to[0]+", "+cell_to[1]+"):\n Đường đi được tìm thấy !"
        console.log("\tChọn P("+nodenow.e.id.split("_")[1]+", "+nodenow.e.id.split("_")[2]+")="+nodenow.get_f().toFixed(1)+tb);
        addnode(nodenow)
        if( nodenow.e == node_to.e)
        {
            clearInterval(RunK)
            clearInterval(RunB)
            back(nodenow)
            RunB = setInterval(()=>{
                try{
                    if(from==false&&to==false)
                    {
                        open = new Array()
                        close = new Array()
                        clearrun()
                        open.push(node_from)
                        s = 0;
                        while(true){
                            let nodenow = nodemin()
                            addnode(nodenow)
                            if( nodenow.e == node_to.e)
                            {
                                back(nodenow)
                                break;
                            }else
                            {
                                s+=100;
                            }
                        }
                        time.innerText = parseInt(s/100);
                        color()
                    } 
                }catch{}
            },0)
            return;
        }else
        {
            s+=100;
        }
        time.innerText = parseInt(s/100);
        log="\t Open: "
        open.forEach(item=>{
            item.e.classList.add("open")
            data = item.e.id.split("_")
            x = data[1]
            y = data[2]
            log+="P("+x+","+y+")="+item.get_f().toFixed(1)+", "
        })
        console.log(log);
        log="\t Close: "
        close.forEach(item=>{
            item.e.classList.add("close")
            data = item.e.id.split("_")
            x = data[1]
            y = data[2]
            log+="P("+x+","+y+")="+item.get_f().toFixed(1)+", "
        })
        console.log(log);
        color()
       }
       catch{
        console.clear()
        console.log("Không Tìm Thấy đường đi!");
       }
    },100)
}
function RunView_B()
{
    open = new Array()
    close = new Array()
    clearInterval(RunB)
    clearInterval(RunK)
    clearrun()
    open.push(node_from)
    RunB = setInterval(()=>{
        if(from==false&&to==false)
        {
           try{
               //bắt đầu thuật toán
            open = new Array()
            close = new Array()
            clearrun()
            open.push(node_from)// thêm node from vào open
            s = 0;
            while(true){
                let nodenow = nodemin()// lấy node nhỏ nhất trong open ra thêm vào close và loại bỏ khổi open
                addnode(nodenow)//thêm các node mà node đang xet có thể đi đến
                if( nodenow.e == node_to.e)// nếu node đang xét bằng node cần đến thì ngường vòng lập
                {
                    back(nodenow)// trả vè đường đi ngắn nhất
                    break;
                }
                else{
                    s+=100;
                }
            }
            time.innerText = parseInt(s/100);
            color()  // in open và close
           }catch{}       
        } 
    },0)
}
function newrun()
{
    clearInterval(RunK)
    clearInterval(RunB)
    RunK=undefined
    RunB = undefined
    clearrun()
}
function makenew()
{
    newrun()
    let x = prompt("Kích thước n (n < 60)","20")
    if(isNaN(parseInt(x)))
    {
        alert("Bạn phải nhập số")
    }
    else
    {
        create_map(parseInt(x))
    }
}
create_map(20)
function f_resize()
{
    container.style.width = container.offsetHeight+"px";
    draw.style.width = (container.offsetHeight-10)+"px"
    draw.style.height = (container.offsetHeight-10)+"px"
}
f_resize()
create_map(30)
function copyToClipboard() 
{
    text = getText()
    var input = document.body.appendChild(document.createElement("input"));
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
}
function hide()
{
    for(let y=0;y<Size;y++)
    for(let x=0;x<Size;x++)
    { 
        document.getElementById("_"+x+"_"+y).innerHTML = ""
    }
}
document.addEventListener("keyup",(e)=>
{
    e.preventDefault()
    if(e.code=="KeyR")
    {
        RunView_A()
    }else
    if(e.code=="KeyS")
    {
        RunView_B()
    }else
    if(e.code=="KeyN")
    {
        newrun()
    }else
    if(e.code=="KeyU")
    {
        makenew()
    }else
    if(e.code=="KeyC")
    {
        copyToClipboard()
    }else
    if(e.code=="KeyM")
    {
        selectmecung()
    }
    
})

function abc(text)
{
    s = text.split("\n");
    sl=0
    Size = parseInt(s[0])
    create_map(Size)
    for(i=1;i<s.length-1;i++)
    {
        data = s[i].split("-")
        if(data[2]=="100")
        {
            map[parseInt(data[0])][parseInt(data[1])].e.classList.add("light")
        }
    }
}
function random()
{
    Size = parseInt(Math.random()*55+5)
    create_map(Size)
    gt = Math.random()*0.5+0.2
    for(y=0;y<Size;y++)
    for(x=0;x<Size;x++)
    {
        if(Math.random()<gt)
        {
            map[x][y].e.classList.add("light");
        }
    }
}