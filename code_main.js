var container = document.getElementById("container")
var lim = 1000
var select = 1000
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
} 
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
        if(e.buttons==1)
        {
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
        if(e.buttons==2)
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
        if(e.buttons==4)
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
        if(type==1) document.getElementById("_"+x+"_"+y).innerHTML = "<p class='nd'>"+(map[x][y].get_f()).toFixed(1)+"</p>"
        if(type==2) document.getElementById("_"+x+"_"+y).innerHTML = "<p class='nd'>"+(map[x][y].get_g()).toFixed(1)+"</p>"
        if(type==3) document.getElementById("_"+x+"_"+y).innerHTML = "<p class='nd'>"+(map[x][y].get_h()).toFixed(1)+"</p>"
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
    ctx = draw.getContext("2d")
    ctx.beginPath()
    let x = node.e.offsetLeft+(node.e.offsetWidth/2)-2
    let y = node.e.offsetTop+(node.e.offsetWidth/2)-2
    ctx.moveTo(x, y)
    while(true)
    {
        let x1 = node.e.offsetLeft+(node.e.offsetWidth/2+0.5)-2
        let y1 = node.e.offsetTop+(node.e.offsetWidth/2+0.5)-2
        ctx.lineTo(x1, y1)
        ctx.lineWidth = 5;
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
    clearrun()
    clearInterval(RunB)
    open.push(node_from)
    s = 0;
    RunK = setInterval(e=>{
       try{
        let nodenow = nodemin()
        addnode(nodenow)
        if( nodenow.e == node_to.e)
        {
            clearInterval(RunK)
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
        }else
        {
            s+=100;
        }
        time.innerText = parseInt(s/100);
        color()
       }
       catch{

       }
    },100)
}
function RunView_B()
{
    open = new Array()
    close = new Array()
    clearrun()
    clearInterval(RunK)
    open.push(node_from)
    RunB = setInterval(()=>{
        if(from==false&&to==false)
        {
           try{
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
                }
                else{
                    s+=100;
                }
            }
            time.innerText = parseInt(s/100);
            color()  
           }catch{}       
        } 
    },0)
}
function newrun()
{
    clearInterval(RunK)
    clearInterval(RunB)
    clearrun()
}
function makenew()
{
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
//setText("3,,,,,,,,,,,,,,1,,1,,1,1,1,1,1,1,1,1,,1,,,,1,,,,,,,,,,,1,,1,,1,,1,1,1,,1,,,,1,1,,,,1,,1,,1,,,,1,,1,,1,,,1,,1,,1,1,1,,1,,1,,,,,1,,1,,,,,,1,,1,1,1,,,,,,,1,,1,1,1,,1,,,,,,,1,1,1,,1,,,,1,,1,1,,1,,1,,,,,,1,,1,,1,,,1,,1,,,1,1,1,1,,,,1,,,1,,1,,,,,,,,,,,,,1,,,,1,1,1,,1,1,1,,1,1,,1,1,1,1,,,1,,1,,,,1,,,,,,,,,,,1,,1,,,2,")
//setText("3,,,,,,,,,,,1,,,,,,,,,1,,1,1,,,,,,1,,1,,,,,,,,,1,,2,,,,,,,1,,,,,,,,1,1,,,,,,,,,,,,,,,,,,,,,,,")
setText(",,,,,,,,,,,,,,,,,,,,3,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2,,,,,,,,,,,,,,,,,,,,,")

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
function select()
{
    
}